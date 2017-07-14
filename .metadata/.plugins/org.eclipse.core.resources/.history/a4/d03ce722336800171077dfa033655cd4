package domain.service;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.jdbc.Sql;

import com.eits.desafio.domain.entity.Usuario;
import com.eits.desafio.domain.repository.IUsuariosRepository;
import com.eits.desafio.domain.service.UsuarioService;

import application.config.IntegrationTests;

@Sql("dataset/usuarios.sql")
public class UsuarioServiceTest extends IntegrationTests
{
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private IUsuariosRepository usuarios;
	
	@WithUserDetails("wagner.mattei@eits.com.br")
	@Test
	@Sql({
		"dataset/usuarios.sql"
	})
	public void insertUsuarioMustPass() 
	{
		Usuario user = new Usuario();
		user.setNome("teste");
		user.setCpf("00032112396");
		user.setEmail("sdfasdf@dfdasfasd.com");
		user.setSenha("1234");
		user.setConfirmSenha("1234");
		usuarioService.insert(user);
		
		usuarios.delete(new Long (1));
		
		Usuario usuario = usuarioService.findById(new Long(1));
		
		Assert.assertTrue( usuario == null );
		
		/*Assert.assertNotNull( user );
		Assert.assertNotNull( user.getName() );
		Assert.assertNotNull( user.getLastName() );
		Assert.assertNotNull( user.isActive() );
		Assert.assertNotNull( user.getPermission() );
		Assert.assertNotNull( user.getSex() );*/
		
		Page<Usuario> users = usuarioService.listUsuariosByFilters("shdfsadhf", 0, 5, "nome", "ASC");
		Assert.assertEquals(users.getContent().get(0).getNome(), "shdfsadhf");
		
	}
}
