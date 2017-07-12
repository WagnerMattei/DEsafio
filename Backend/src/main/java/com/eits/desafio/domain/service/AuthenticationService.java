package com.eits.desafio.domain.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eits.desafio.domain.entity.Usuario;
import com.eits.desafio.domain.repository.IUsuariosRepository;

@Service
public class AuthenticationService implements UserDetailsService 
{
	/**
	 * 
	 */
	
	@Autowired
	private IUsuariosRepository usuarioRepository;
	
	/**
	 * 
	 */
	public Usuario loadUserByUsername(String email)
	{
		try
		{
			return  usuarioRepository.findByEmailAndAtivo(email);
		} 
		catch (Exception e)
		{
			throw new UsernameNotFoundException("Usuário " + email + " não encontrado.");
		}
	}
}