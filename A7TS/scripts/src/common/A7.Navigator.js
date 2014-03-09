/// <reference path="utililties/A7.Utilities.ObjectUtility.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
/// <reference path="A7.INavigator.ts" />
var A7;
(function (A7) {
    var Navigator = (function () {
        function Navigator() {
            var _this = this;
            this.STATE_CHANGE_EVENT = 'statechange';
            this._history = window.History;

            //if history.js compatible with browser bind window statechange event
            if (this._history.enabled) {
                this._history.Adapter.bind(window, 'statechange', function () {
                    var state = _this._history.getState();
                    $(_this).trigger(_this.STATE_CHANGE_EVENT, [{ Url: state.url, Title: state.title, Data: (state.data || {}) }]);
                });
            }
        }
        Navigator.prototype.handleStateChange = function (state, fnHandler) {
            var currentState = this._history.getState();

            //Validate new state request is different than current state prior to pushing new state
            if (!A7.Utilities.ObjectUtility.ObjectsEqual(state.Data, currentState.data) || state.Url != currentState.url) {
                fnHandler(state);
            }
        };

        //Pushes a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
        Navigator.prototype.To = function (url, urlParams, title, data) {
            var _this = this;
            if (typeof urlParams === "undefined") { urlParams = null; }
            if (typeof title === "undefined") { title = ''; }
            if (typeof data === "undefined") { data = {}; }
            var baseUrl = window.location.protocol + '//' + window.location.host;

            url += urlParams ? $.param(urlParams) : '';

            if (url.slice(0, baseUrl.length) != baseUrl)
                url = baseUrl + (url.slice(0, 1) == '/' ? url : url += '/');

            this.handleStateChange({ Url: url, Title: title, Data: data }, function (state) {
                _this._history.pushState(data, title, url);
            });
        };

        Navigator.prototype.RedirectTo = function (url) {
            window.location.href = url;
        };

        //Replaces the existing state with a new state to the browser; data can be null or an object, title can be null or a string, url must be a string
        Navigator.prototype.Replace = function (url, urlParams, title, data) {
            var _this = this;
            if (typeof urlParams === "undefined") { urlParams = null; }
            if (typeof title === "undefined") { title = ''; }
            if (typeof data === "undefined") { data = {}; }
            url += urlParams ? $.param(urlParams) : '';
            this.handleStateChange({ Url: url, Title: title, Data: data }, function (state) {
                _this._history.replaceState(data, title, url);
            });
        };

        //Go back once through the history (same as hitting the browser's back button)
        Navigator.prototype.Back = function () {
            this._history.back();
        };

        //Go forward once through the history (same as hitting the browser's forward button)
        Navigator.prototype.Forward = function () {
            this._history.forward();
        };

        //If position is negative go back through history position times, if position is positive go forwards through history X times
        Navigator.prototype.Go = function (position) {
            this._history.go(position);
        };

        //Gets the current state of the browser, returns an object with data, title and url
        Navigator.prototype.GetState = function () {
            var state = this._history.getState();
            return { Url: state.url, Title: state.title, Data: state.Data };
        };

        Navigator.prototype.OnNavigate = function (fnHandler) {
            $(this).on(this.STATE_CHANGE_EVENT, function (event, navigateState) {
                fnHandler.call(this, navigateState);
            });
        };
        return Navigator;
    })();
    A7.Navigator = Navigator;
})(A7 || (A7 = {}));
