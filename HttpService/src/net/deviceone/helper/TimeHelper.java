package net.deviceone.helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeHelper {
	private static DateFormat systimeFormate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	private static DateFormat todayFormate = new SimpleDateFormat("yyyy-MM-dd");
	private static DateFormat thismonthFormate = new SimpleDateFormat("yyyy-MM");

	public static long now() {
		return new Date().getTime();
	}

	public static String getSTime(long time) {
		return systimeFormate.format(new Date(time));
	}

	public static String today() {
		return todayFormate.format(new Date());
	}

	public static String month() {
		return thismonthFormate.format(new Date());
	}

	public static String getUniqueString() {
		DateFormat format = new java.text.SimpleDateFormat("yyyyMMddHHmmssSSS");
		String currentTime = format.format(new Date()) + (int) (Math.random() * 9000 + 1000);
		return currentTime;
	}
}
