/// <reference path="../A7.AJAX.ts" />
/// <reference path="A7.Templates.ITemplateCompiler.ts" />
/// <reference path="A7.Templates.ITemplateRenderer.ts" />
/// <reference path="../../../declarations/mustache.d.ts" />
var A7;
(function (A7) {
    (function (Templates) {
        var MustacheProvider = (function () {
            function MustacheProvider() {
            }
            MustacheProvider.prototype.CompileHtmlTemplate = function (html) {
                this._compiledTemplate = Mustache.compile(html);
                return this;
            };

            MustacheProvider.prototype.CompileAjaxTemplate = function (url) {
                var _this = this;
                var dfd = $.Deferred();

                A7.AJAX.GetHtml(url).then(function (html) {
                    dfd.resolve(_this.CompileHtmlTemplate(html));
                });

                return dfd.promise();
            };

            MustacheProvider.prototype.Render = function (data) {
                return this._compiledTemplate(data);
            };

            MustacheProvider.prototype.RenderAndPrepend = function (data, selector) {
                $(selector).prepend(this.Render(data));
            };

            MustacheProvider.prototype.RenderAndAppend = function (data, selector) {
                $(selector).append(this.Render(data));
            };

            MustacheProvider.prototype.RenderAndReplace = function (data, selector) {
                $(selector).empty().html(this.Render(data));
            };
            return MustacheProvider;
        })();
        Templates.MustacheProvider = MustacheProvider;
    })(A7.Templates || (A7.Templates = {}));
    var Templates = A7.Templates;
})(A7 || (A7 = {}));
