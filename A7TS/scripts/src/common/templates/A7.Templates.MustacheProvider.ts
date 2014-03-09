/// <reference path="../A7.AJAX.ts" />
/// <reference path="A7.Templates.ITemplateCompiler.ts" />
/// <reference path="A7.Templates.ITemplateRenderer.ts" />
/// <reference path="../../../declarations/mustache.d.ts" />


module A7 {

    export module Templates {
        
        export class MustacheProvider implements ITemplateCompiler, ITemplateRenderer {                      

            private _compiledTemplate: MustacheWriter;

            CompileHtmlTemplate(html: string): MustacheProvider {
                this._compiledTemplate = Mustache.compile(html);
                return this;
            }

            CompileAjaxTemplate(url: string): JQueryPromise<ITemplateRenderer> {
                var dfd = $.Deferred<MustacheProvider>();

                A7.AJAX.GetHtml(url).then(html => {
                    dfd.resolve(this.CompileHtmlTemplate(html));
                });

                return dfd.promise();
            }

            Render(data: {}): string {
                return this._compiledTemplate(data);
            }
            
            RenderAndPrepend(data: {}, selector: string) {
                $(selector).prepend(this.Render(data));
            }

            RenderAndAppend(data: {}, selector: string) {
                $(selector).append(this.Render(data));
            }

            RenderAndReplace(data: {}, selector: string) {
                $(selector).empty().html(this.Render(data));
            }

        }
    
    }

}