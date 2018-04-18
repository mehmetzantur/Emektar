using Emektar.Core.Domain;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Emektar.Website.Helper
{
    public class AccountAuthorize : FilterAttribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var Session = context.HttpContext.Session;
            User user = (User)Session["User"];
            

            HttpContextWrapper wrapper = new HttpContextWrapper(HttpContext.Current);
            if (user == null)
            {
                context.Result = new RedirectToRouteResult(
                new RouteValueDictionary { { "Controller", "Account" }, { "Action", "Index" } });
            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }
    }
}