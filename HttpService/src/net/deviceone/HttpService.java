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
  
        server.start();  
        server.join();  
	}
}
