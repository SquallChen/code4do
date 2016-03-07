<%@ WebHandler Language="C#" Class="feedback" %>

using System;
using System.Web;

public class feedback : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "application/json";
        context.Response.Write(@"{""result"":""1""}");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}