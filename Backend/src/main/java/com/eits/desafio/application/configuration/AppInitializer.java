package com.eits.desafio.application.configuration;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;;

public class AppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer
{

	@Override
	protected Class<?>[] getRootConfigClasses() 
	{	
		return new Class<?>[] {MailConfig.class,JPAConfig.class,WebConfig.class, ServiceConfig.class, SecurityConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() 
	{
		return new Class<?>[] {}; 
	}

	@Override
	protected String[] getServletMappings() 
	{
		
		return new String[] {"/"};
	}
	
	@Override
    protected Filter[] getServletFilters() 
	{
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        return new Filter[] {encodingFilter};
	}
	
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException
	{
		super.onStartup(servletContext);
		servletContext.addListener(RequestContextListener.class); 
		servletContext.setInitParameter("spring.profiles.active", "dev"); 
	}
	

	@Override
	protected void customizeRegistration(Dynamic registration) 
	{
		registration.setMultipartConfig(new MultipartConfigElement(""));
	}
	
	
	
}