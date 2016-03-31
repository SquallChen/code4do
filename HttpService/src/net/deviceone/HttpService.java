package net.deviceone;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class HttpService {

	public static void main(String[] args) throws Exception {
		Server server = new Server(8080);

		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");
		server.setHandler(context);

		// http://localhost:8080/testget
		context.addServlet(new ServletHolder(new TestGetServlet()), "/testget");

		// http://localhost:8080/testpost
		context.addServlet(new ServletHolder(new TestPostServlet()), "/testpost");

		// http://localhost:8080/testupload
		context.addServlet(new ServletHolder(new TestUploadServlet()), "/testupload");

		// http://localhost:8080/testform
		context.addServlet(new ServletHolder(new TestFormServlet()), "/testform");

		// http://localhost:8080/testdownload
		context.addServlet(new ServletHolder(new TestDownloadServlet()), "/testdownload");
		server.start(); 
		server.join();
	}
}
