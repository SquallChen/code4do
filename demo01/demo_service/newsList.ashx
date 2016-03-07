<%@ WebHandler Language="C#" Class="newsList" %>

using System;
using System.Web;

public class newsList : IHttpHandler
{    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "application/json";
        context.Response.Write(DemoData.Instance.getNewList(""));
    }
     
    public bool IsReusable {
        get {
            return false;
        }
    }

}