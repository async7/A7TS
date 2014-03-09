/// <reference path="../../declarations/crossroads.d.ts" />

module A7 {
   export class Route {
        constructor (url: string, action: (...arguments: any[]) => void ) {
            this.Url = url;
            this.Action = action;
        }
        Url: string;
        Action: (...arguments: any[]) => void;
    }
}