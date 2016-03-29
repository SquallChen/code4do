package net.deviceone.helper;

public class LogHelper {
	public static void info(ILog log, String message) {
		if (log != null)
			log.info(message);
		else
			System.out.println(TimeHelper.getSTime(TimeHelper.now()) + " info:" + message);
	}

	public static void debug(ILog log, String message) {
		if (log != null)
			log.debug(message);
		else
			System.out.println(TimeHelper.getSTime(TimeHelper.now()) + " debug:" + message);
	}

	public static void error(ILog log, Exception ex) {
		if (log != null)
			log.error(ex);
		else
			ex.printStackTrace();
	}
}
