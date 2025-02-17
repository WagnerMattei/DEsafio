package com.eits.desafio.application.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.eits.desafio.domain.service.AuthenticationService;

@EnableWebSecurity
@ComponentScan(basePackageClasses = AuthenticationService.class)
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
	
	@Autowired
	private AuthenticationService authentication;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception 
	{
		/*http.csrf().disable()
		.authorizeRequests()
			.antMatchers("/**").permitAll();*/
		

		/**
		*
		*/
		http.csrf().disable().sessionManagement().maximumSessions(1).expiredUrl("/login");
		http.headers().frameOptions().disable();

		
		//form
		
		http
		.authorizeRequests()
		.anyRequest()
		.authenticated()
		.and()
		.formLogin()
		.loginPage( "/login" )
		.loginProcessingUrl( "/authenticate" )
		.usernameParameter( "email" )
		.passwordParameter( "senha" )
//		.successHandler( authenticationSuccessHandler )
		.permitAll()
		.and()
		.logout()
		.logoutUrl( "/logout" );
		
		
		//basic auth
		http
        .authorizeRequests()
        .antMatchers( "/api/**" )
            .authenticated()
            .and()
                .httpBasic();
	}
	


	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception 
	{
		auth.userDetailsService(authentication).passwordEncoder(new BCryptPasswordEncoder());
	}
	
}
