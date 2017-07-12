package com.eits.desafio.application.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eits.desafio.domain.entity.Usuario;

@Controller
public class LoginController 
{

	@RequestMapping("/Login")
	public String index(@AuthenticationPrincipal Usuario usuario){
		return "index";	
	}
}