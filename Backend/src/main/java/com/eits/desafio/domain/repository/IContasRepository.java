package com.eits.desafio.domain.repository;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.eits.desafio.domain.entity.Conta;

@Repository
@Transactional
public interface IContasRepository extends JpaRepository<Conta, Long>
{
	/**
	 * 
	 */

	
	/**
	 * 
	 * @param filter
	 * @param pageable
	 * @return
	 */
	@Query("select u from Conta u where u.nome like %:pFilter%")
	public Page<Conta> listContasByFilters(@Param("pFilter") String filter, Pageable pageable);
	/**
	 * 
	 * @param nome
	 * @return
	 */
	public Conta findByNome(String nome);
}
