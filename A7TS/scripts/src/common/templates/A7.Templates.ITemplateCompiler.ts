/// <reference path="A7.Templates.ITemplateRenderer.ts" />
/// <reference path="../../../declarations/jquery.d.ts" />

module A7 {
    export module Templates {
        export interface ITemplateCompiler {
            CompileHtmlTemplate(html: string): ITemplateRenderer;
            CompileAjaxTemplate(url: string): JQueryPromise<ITemplateRenderer>;
        }
    }
}