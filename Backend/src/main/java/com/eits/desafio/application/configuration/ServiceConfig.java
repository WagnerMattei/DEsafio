package com.eits.desafio.application.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.eits.desafio.domain.service.UsuarioService;

@Configuration
@ComponentScan(basePackageClasses = UsuarioService.class)
public class ServiceConfig 
{

}
