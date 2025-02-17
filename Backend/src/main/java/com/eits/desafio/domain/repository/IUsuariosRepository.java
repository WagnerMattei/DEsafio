package com.eits.desafio.domain.repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.eits.desafio.domain.entity.Usuario;

@Repository
@Transactional
public interface IUsuariosRepository extends JpaRepository<Usuario, Long> 
{
	/**
	 * 
	 * @param email
	 * @return
	 */
	
	public Usuario findByEmail(String email);

	
	/**
	 * 
	 * @param nome
	 * @return
	 */
	public Usuario findByNome(String nome);
	
	
	/**
	 * 
	 * @param email
	 * @return
	 */
	@Query("select u from Usuario u where u.email = :email and ativo=true")
	public Usuario findByEmailAndAtivo(@Param("email") String email);
	
	/**
	 * 
	 */

	
	/**
	 * 
	 * @param cpf
	 * @return
	 */
	@Query("select u from Usuario u where u.cpf = :cpf")
	public Usuario findByCpf(@Param("cpf") String cpf);
	
	/**
	 * 
	 * @param filter
	 * @param pageable
	 * @return
	 */

	@Query("select u from Usuario u where u.nome like %:pFilter% or u.email like %:pFilter% ")
	public Page<Usuario> listUsuariosByFilters(@Param("pFilter") String filter, Pageable pageable);
	
	
	

}