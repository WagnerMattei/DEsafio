package com.eits.desafio.domain.entity;

import java.time.LocalDate;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.envers.Audited;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "transacao")
@DataTransferObject
@Audited
public class Transacao
{
	/**
	 * 
	 */
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	

	/**
	 * 
	 */
	
	//Conta de Origem da transacao
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "conta_origem", nullable = false)
	private Conta contaOrigem;
	
	/**
	 * 
	 */

	//Conta de destino da transacao
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "conta_destino", nullable = false)
	private Conta contaDestino;
	
	/**
	 * 
	 */
	
	//valor que sera debitado/creditado das contas
	@Column(nullable = false)
	private double valor;
	
	/**
	 * 
	 */
	
	
	 //data da venciimento definida pelo usuario, usada para Fazer a logica de transação efetivada com atraso
	@Column(name = "data_vencimento", nullable=false)
	private Calendar dataVencimento;  
	
	/**
	 * 
	 */
	
	//data em que uma transação nova é cadastrada

	@Column(name = "data_cadastro")	
	private LocalDate dataCadastro;
	
	/**
	 * 
	 */
	
	private String descricao;
	
	/**
	 * 
	 */
	
	//variavel booleana para saber se a transação ja foi efetivada
	@Column(nullable = false)
	private boolean efetivado;	
	
	/**
	 * 
	 */
	
	//data da ultima alteração da transação
	@Column(name = "data_alteracao")
	private LocalDate dataAlteracao;
	
	//Usuario que inseriu a transação na lista
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "criador_id")
	private Usuario criador;	
	
	/**
	 * 
	 */
	
	
	//Usuario que alterou a transação pela ultima vez

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "ultimo_alterador_id")
	private Usuario ultimoAlterador;
	
	/**
	 * 
	 */
	

	//usuario que efetivou a transação
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "efetivador_id")
	private Usuario efetivador;	
	
	/**
	 * 
	 */
	
	//data em que a transação foi efetivada
	@Column(name = "data_efetivacao")
	private LocalDate dataEfetivacao;	
	

	//Caminho do arquivo
	private String filePath;
	

	/**
	 * 
	 * constructor
	 */
	
	
	public Transacao()
	{
		
	}
	

	
	

	/**
	 * 
	 * setters e getters
	 */
	

	public String getFilePath() 
	{
		return filePath;
	}

	public void setFilePath(String filePath) 
	{
		this.filePath = filePath;
	}
	
	/**
	 * 
	 * @return
	 */
	

	@JsonIgnoreProperties(value={"cpf", "email", "endereco", "celular", "dataAlteracao", "ativo", "ultimoAlterador", "criador", "permissoes"})
	public Usuario getUltimoAlterador()
	{
		return ultimoAlterador;
	}
	public void setUltimoAlterador(Usuario ultimoAlterador)
	{
		this.ultimoAlterador = ultimoAlterador;
	}
	
	/**
	 * 
	 * 
	 */
	@JsonIgnoreProperties(value={"cpf", "email", "endereco", "celular", "dataAlteracao", "ativo", "ultimoAlterador", "criador", "permissoes"})
	public Usuario getCriador()
	{
		return criador;
	}
	public void setCriador(Usuario criador)
	{
		this.criador = criador;
	}
	
	/**
	 * 
	 * 
	 */
	@JsonIgnoreProperties(value={"cpf", "email", "endereco", "celular", "dataAlteracao", "ativo", "ultimoAlterador", "criador", "permissoes"})
	public Usuario getEfetivador()
	{
		return efetivador;
	}
	public void setEfetivador(Usuario efetivador)
	{
		this.efetivador = efetivador;
	}
	
	/**
	 * 
	 * 
	 */
	
	public long getId() 
	{
		return id;
	}
	public void setId(long id) 
	{
		this.id = id;
	}
	
	/**
	 * 
	 * 
	 */
	@JsonIgnoreProperties(value={"descricao", "dataCadastro", "dataAlteracao", "ultimoAlterador", "criador"})
	public Conta getContaOrigem()
	{
		return contaOrigem;
	}
	
	public void setContaOrigem(Conta contaOrigem) {
		this.contaOrigem = contaOrigem;
	}
	
	/**
	 * 
	 * 
	 */
	@JsonIgnoreProperties(value={"descricao", "dataCadastro", "dataAlteracao", "ultimoAlterador", "criador"})
	public Conta getContaDestino()
	{
		return contaDestino;
	}
	public void setContaDestino(Conta conta_destino) 
	{
		this.contaDestino = conta_destino;
	}
	
	/**
	 * 
	 * 
	 */
	
	public double getValor()
	{
		return valor;
	}
	public void setValor(double valor)
	{
		this.valor = valor;
	}
	
	/**
	 * 
	 * 
	 */
	
	public Calendar getDataVencimento()
	{
		return dataVencimento;
	}
	
	public void setDataVencimento(Calendar dataVencimento)
	{
		this.dataVencimento = dataVencimento;
	}
	
	/**
	 * 
	 * 
	 */
	@JsonIgnoreProperties(value={"month", "chronology", "dayOfWeek", "era", "dayOfYear", "leapYear", })
	@JsonProperty(access = Access.READ_ONLY)
	public LocalDate getDataCadastro() 
	{
		return dataCadastro;
	}
	
	@JsonProperty(access = Access.READ_ONLY)
	public void setDataCadastro(LocalDate dataCadastro)
	{
		this.dataCadastro = dataCadastro;
	}
	
	/**
	 * 
	 * 
	 */
	
	@JsonIgnoreProperties(value={"month", "chronology", "dayOfWeek", "era", "dayOfYear", "leapYear", })
	public LocalDate getDataEfetivacao() 
	{
		return dataEfetivacao;
	}
	@JsonProperty(access = Access.READ_ONLY)
	public void setDataEfetivacao(LocalDate dataEfetivacao)
	{
		this.dataEfetivacao = dataEfetivacao;
	}
	
	/**
	 * 
	 * 
	 */
	
	public String getDescricao()
	{
		return descricao;
	}
	public void setDescricao(String descricao) 
	{
		this.descricao = descricao;
	}
	
	/**
	 * 
	 * 
	 */
	
	public boolean isEfetivado() {
		return efetivado;
	}

	public void setEfetivado(boolean efetivado) {
		this.efetivado = efetivado;
	}
	
	/**
	 * 
	 * 
	 */

	@JsonIgnoreProperties(value={"month", "chronology", "dayOfWeek", "era", "dayOfYear", "leapYear", })
	@JsonProperty(access = Access.READ_ONLY)
	public LocalDate getDataAlteracao()
	{
		return dataAlteracao;
	}
	
	@JsonProperty(access = Access.READ_ONLY)
	public void setDataAlteracao(LocalDate dataAlteracao)
	{
		this.dataAlteracao = dataAlteracao;
	}
}
	
	
	
	
	
	
	