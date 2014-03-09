/// <reference path="utililties/A7.Utilities.ObjectUtility.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
/// <reference path="A7.INavigator.ts" />

module A7 {

    export class Navigator implements A7.Interfaces.INavigator {

        STATE_CHANGE_EVENT: string = 'statechange';
        _history: any;

        constructor () {
            this._history = (<any>window).History;

            //if history.js compatible with browser bind window statechange event
            if (this._history.enabled) {
                this._history.Adapter.bind(window, 'statechange', () => {
                    var state = this._history.getState(); //State.data, State.title, State.url
                    $(this).trigger(this.STATE_CHANGE_EVENT, [{ Url: state.url, Title: state.title, Data: (state.data || {}) }]);
                });
            }

        }

       handleStateChange(state: A7.Interfaces.INavigateState, fnHandler: (state: A7.Interfaces.INavigateState) => void ): void {
            var currentState = this._history.getState();

            //Validate new state request is different than current state prior to pushing new state               
            if (!A7.Utilities.ObjectUtility.ObjectsEqual(state.Data, currentState.data) || state.Url != currentState.url) {
                fnHandler(state);
            }

        }

        //Pushes a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
        To(url: string, urlParams: { } = null, title: string = '', data: { } = {}): void {
            var baseUrl = window.location.protocol + '//' + window.location.host;

            url += urlParams ? $.param(urlParams) : '';

            if (url.slice(0, baseUrl.length) != baseUrl) url = baseUrl + (url.slice(0, 1) == '/' ? url : url += '/');

            this.handleStateChange({ Url: url, Title: title, Data: data }, (state: A7.Interfaces.INavigateState) => {
                this._history.pushState(data, title, url);
            });
        }

        RedirectTo(url: string): void {
            window.location.href = url;
        }

        //Replaces the existing state with a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
        Replace(url: string, urlParams: { } = null, title: string = '', data: { } = {}): void {
            url += urlParams ? $.param(urlParams) : '';
            this.handleStateChange({ Url: url, Title: title, Data: data }, (state: A7.Interfaces.INavigateState) => {
                this._history.replaceState(data, title, url);
            });
        }

        //Go back once through the history (same as hitting the browser's back button)
        Back(): void { this._history.back();  }

        //Go forward once through the history (same as hitting the browser's forward button)
        Forward(): void { this._history.forward(); }

        //If position is negative go back through history position times, if position is positive go forwards through history X times
        Go(position: number): void { this._history.go(position); }

        //Gets the current state of the browser, returns an object with data, title and url
        GetState(): A7.Interfaces.INavigateState { 
            var state = this._history.getState();
            return { Url: state.url, Title: state.title, Data: state.Data } 
        }

        OnNavigate(fnHandler: (navigateState: A7.Interfaces.INavigateState) => void ): void {
            $(this).on(this.STATE_CHANGE_EVENT, function (event: JQueryEventObject, navigateState: any) {
                fnHandler.call(this, navigateState);
            });
        }

    }

}