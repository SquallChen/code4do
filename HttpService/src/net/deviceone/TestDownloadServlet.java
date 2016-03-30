package net.deviceone;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import net.deviceone.helper.HttpHelper;

public class TestDownloadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public TestDownloadServlet() {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_OK);
		JSONObject obj = new JSONObject();

		JSONObject requestO = new JSONObject();
		JSONObject responseO = new JSONObject();
		try {
			requestO.put("header", HttpHelper.getRequestHeader(request));
			requestO.put("parameters", HttpHelper.getRequestParameters(request));
			requestO.put("body", HttpHelper.getRequestBody(request));
			obj.put("request", requestO);

			responseO.put("header", HttpHelper.getResponseHeader(response));
			responseO.put("data", "Download成功!!!");
			obj.put("response", responseO);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		response.getWriter().print(obj.toString());
	}
}