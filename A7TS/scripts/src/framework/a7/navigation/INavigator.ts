namespace A7.Navigation {
    export abstract class INavigator {
        To: (url: string, urlParams?: {}, title?: string, data?: {}) => void;
        RedirectTo: (url: string, urlParams?: {}, title?: string, data?: {}) => void;
        Replace: (url: string, urlParams?: {}, title?: string, data?: {}) => void;
        Back: () => void;
        Forward: () => void;
        Go: (position: number) => void;
        GetState: () => INavigateState;
        OnNavigate: (fnHandler: (navigateState: INavigateState) => void) => void;
    }

    export interface INavigateState {
        Url: string;
        Title: string;
        Data: {};
    }
}