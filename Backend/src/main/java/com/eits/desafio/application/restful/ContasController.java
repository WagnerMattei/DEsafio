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

import com.eits.desafio.domain.entity.Conta;
import com.eits.desafio.domain.service.ContaService;


@RestController
@RequestMapping("conta")
public class ContasController 
{
	@Autowired
	private ContaService contaService;
	
	/**
	 * 
	 * @param conta
	 * @return 
	 * INSERT
	 */
	
	@RequestMapping(value = "/new", method = RequestMethod.POST)
	public ResponseEntity<String> insert(@RequestBody Conta conta)
	{
		return contaService.insert(conta);
	}
	
	/**
	 * 
	 * @param conta
	 * @return 
	 * UPDATE
	 */
	
	@CrossOrigin
	@RequestMapping(value = "/edit", method = RequestMethod.PUT)
	public ResponseEntity<String> update(@RequestBody Conta conta)
	{
		return contaService.update(conta);
	}
	
	/**
	 * 
	 * @param page
	 * @param size
	 * @return
	 * LIST
	 */
	@RequestMapping(value = "/pag/{page}/{size}", method = RequestMethod.GET)
	public Page<Conta> list(@PathVariable int page, @PathVariable int size)
	{
		String property = "nome";
		String order = "ASC";
		Page<Conta> conta = contaService.list(page, size, property, order);
		return conta;
	}
	
	/**
	 * 
	 * @param filter
	 * @param page
	 * @param size
	 * @return
	 * LIST CONTAS BY FILTERS
	 */
	
	//LIST USUARIOS BY FILTERS//
	//Metodo para filtrar contas
	@RequestMapping(value = "/filter/{filter}/{page}/{size}", method = RequestMethod.GET)
	public Page<Conta> listContasByFilters(@PathVariable("filter") String filter,
											   @PathVariable("page") int page,
											   @PathVariable("size") int size)
	{
		String property = "nome";
		String order = "ASC";
		Page<Conta> conta = contaService.listContasByFilters(filter, page, size, property, order);
		return conta;
	}
	
	/**
	 * 
	 * @param numero
	 * @return
	 * FIND BY NUMERO
	 */
	
	@RequestMapping(value = "/{numero}", method = RequestMethod.GET)
	@ResponseBody
	public Conta findByNumero(@PathVariable("numero") long numero)
	{	
		return contaService.findByNumero(numero);
	}
	
	/**
	 * 
	 * @param numero
	 * REMOVE
	 */
	
	@CrossOrigin
	@RequestMapping(value = "/delete/{numero}", method = RequestMethod.DELETE)
	public ResponseEntity<String> remove(@PathVariable("numero") Long numero)
	{
		return contaService.remove(numero);
	}
	
	
	
	


}