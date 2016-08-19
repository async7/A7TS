using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace A7TS.api
{
    public class WidgetsController : ApiController
    {
        
        public Widget GetById(int id)
        {
            return new Widget()
            {
                Id = 1,
                Name = "Tool"
            };
        }

    }
    public class Widget
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
