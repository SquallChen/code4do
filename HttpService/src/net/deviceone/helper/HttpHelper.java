package net.deviceone.helper;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

public class HttpHelper {
	private static Scanner scanner;

	public static JSONObject getRequestHeader(HttpServletRequest request) throws JSONException {
		JSONObject obj = new JSONObject();
		Enumeration<String> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			obj.put(headerName, request.getHeader(headerName));
		}
		return obj;
	}

	public static JSONObject getResponseHeader(HttpServletResponse response) throws JSONException {
		JSONObject obj = new JSONObject();
		Iterator<String> headerNames = response.getHeaderNames().iterator();
		while (headerNames.hasNext()) {
			String headerName = (String) headerNames.next();
			obj.put(headerName, response.getHeader(headerName));
		}
		return obj;
	}

	public static JSONObject getRequestParameters(HttpServletRequest request) throws JSONException {
		JSONObject obj = new JSONObject();
		Enumeration<String> params = request.getParameterNames();
		while (params.hasMoreElements()) {
			String paramName = params.nextElement();
			obj.put(paramName, request.getParameter(paramName));
		}
		return obj;
	}

	public static String getRequestBody(HttpServletRequest request) {
		if ("POST".equalsIgnoreCase(request.getMethod())) {
			Scanner s = null;
			try {
				scanner = new Scanner(request.getInputStream(), "UTF-8");
				s = scanner.useDelimiter("\\A");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return s.hasNext() ? s.next() : "";
		}
		return "";
	}
}
