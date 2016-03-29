package net.deviceone.helper;

public interface ILog {
	public void info(String message);

	public void debug(String message);

	public void error(Exception ex);
	
	public void h(String message);
}
