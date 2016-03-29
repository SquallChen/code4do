package net.deviceone.helper;

import org.json.JSONObject;

public class JSONHelper {
	public static JSONObject parseFile(String file, ILog log) throws Exception {
		String json = FileHelper.getUTF8FileContent(file, log);
		LogHelper.info(log, "parse file:" + file + ",return content:" + json);
		JSONObject obj = new JSONObject(json.trim());
		return obj;
	}

	/**
	 * 判断json字段值是否存在。
	 * 
	 * @param obj
	 * @param field
	 * @return
	 */
	public static String getSValue(JSONObject obj, String field) throws Exception {
		if (obj.has(field)) {
			return obj.getString(field);
		}
		throw new Exception("json object has not field:" + field);
	}

	public static boolean getBValue(JSONObject obj, String field, boolean defaultV) throws Exception {
		if (obj.has(field)) {
			return obj.getBoolean(field);
		}
		return defaultV;
	}
}
