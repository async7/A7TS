namespace A7.Routing {
   export class Route {
        constructor (url: string, action: (...args: any[]) => void ) {
            this.Url = url;
            this.Action = action;
        }
        Url: string;
        Action: (...args: any[]) => void;
    }
}