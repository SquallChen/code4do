<%@ WebHandler Language="C#" Class="newsShow" %>

using System;
using System.Web;

public class newsShow : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "application/json";
        context.Response.Write(DemoData.Instance.getNewsShow());
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}