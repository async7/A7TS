using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace A7TS
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            A7TSGenerator.TsGenerator.Options = new A7TSGenerator.TsGeneratorOptions(GlobalConfiguration.Configuration)
            {
                NestedModelsDepthLimit = 5,
                ModelsToSkipNestedModels = new string[] { "HttpResponseMessage" }
            };
        }
    }
}