module A7 {
    export module Interfaces {
        export interface INavigator {
            To(url: string, urlParams?: { }, title?: string, data?: { }): void;
            RedirectTo(url: string, urlParams?: {}, title?: string, data?: {}): void;
            Replace(url: string, urlParams?: { }, title?: string, data?: { }): void;
            Back(): void;
            Forward(): void;
            Go(position: number): void;
            GetState(): INavigateState;
            OnNavigate(fnHandler: (navigateState: A7.Interfaces.INavigateState) => void ): void;
        }

        export interface INavigateState {
            Url: string;
            Title: string;
            Data: { };
        }
    }

}