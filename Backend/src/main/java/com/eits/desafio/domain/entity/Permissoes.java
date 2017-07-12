package com.eits.desafio.domain.entity;

import org.directwebremoting.annotations.DataTransferObject;
import org.springframework.security.core.GrantedAuthority;

@DataTransferObject(type = "enum")
public enum Permissoes implements GrantedAuthority
{
	/**
	 * 
	 */
	
	ADMINISTRADOR("Administrador"),
	COLABORADOR("Colaborador");
	
	private String descricao;
	
	Permissoes(String descricao)
	{
		this.descricao = descricao;
	}
	
	public String getDescricao()
	{
		return descricao;
	}
	
	@Override
	public String getAuthority()
	{
		return this.name();
	}

}
