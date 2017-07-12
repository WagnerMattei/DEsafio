package com.eits.desafio.application.restful;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.eits.desafio.domain.entity.Usuario;
import com.eits.desafio.domain.service.UsuarioService;


@RestController
@RequestMapping("usuario")
public class UsuariosController 
{
	@Autowired
	private UsuarioService usuarioService;
	
	/**
	 * 
	 * @param usuario
	 * @return
	 * INSERT
	 */
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public ResponseEntity<String> insert(@RequestBody Usuario usuario)
	{
		return usuarioService.insert(usuario);
	}
	
	/*
	 * 
	 * UPDATE
	 */
	
	@CrossOrigin
	@RequestMapping(value = "/edit", method = RequestMethod.PUT)
	public ResponseEntity<String> update(@RequestBody Usuario usuario)
	{
		return usuarioService.update(usuario);
	}
	
	
	/**
	 * 
	 * @param page
	 * @param size
	 * @return
	 *  LIST
	 */
	
	@RequestMapping(value = "/pag/{page}/{size}", method = RequestMethod.GET)
	public Page<Usuario> list(@PathVariable int page, @PathVariable int size)
	{
		String property = "nome";
		Page<Usuario> usuario = usuarioService.list(page, size, property);
		return usuario;
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 * FIND BY ID
	 */
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Usuario findById(@PathVariable("id") Long id)
	{	
		return usuarioService.findById(id);
	}
	
	/**
	 * 
	 * @return
	 * GET CURRENT
	 */
	
	@CrossOrigin
	@RequestMapping(value = "/getCurrentUser", method = RequestMethod.GET)
	public Usuario getCurrent()
	{
		return usuarioService.getCurrent();
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 * UPDATE USUARIOTO STATUS
	 */
	@CrossOrigin
	@RequestMapping(value = "/alterarstatus/{id}", method = RequestMethod.PATCH)
	public ResponseEntity<String> updateUsuarioToStatus(@PathVariable Long id)
	{
		return usuarioService.updateUsuarioToStatus(usuarioService.findById(id));
	}
	
	/**
	 * 
	 * @param filter
	 * @param page
	 * @param size
	 * @return
	 * LIST USUARIOS BY FILTERS
	 */
	
	@RequestMapping(value = "/filter/{filter}/{page}/{size}", method = RequestMethod.GET)
	public Page<Usuario> listUsuariosByFilters(@PathVariable("filter") String filter,
											   @PathVariable("page") int page,
											   @PathVariable("size") int size)
	{
		String property = "nome";
		String order = "ASC";
		Page<Usuario> usuario = usuarioService.listUsuariosByFilters(filter, page, size, property, order);
		return usuario;
	}
	
	/**
	 * 
	 * @param usuario
	 * UPDATE USUARIO TO SENHA
	 */
	
	@CrossOrigin
	@RequestMapping(value = "/updateSenha", method = RequestMethod.PATCH)
	public void updateUserToPassword(@RequestBody Usuario usuario)
	{
		usuarioService.updateUsuarioToSenha(usuario);
	}
}

