/// <reference path="../../../declarations/jquery.d.ts" />

module A7 {
    export module Templates {
        export interface ITemplateRenderer {
            Render(data: {}): string;
            RenderAndPrepend(data: {}, selector: string);
            RenderAndAppend(data: {}, selector: string);
            RenderAndReplace(data: {}, selector: string);
        }
    }
}