package application.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

public class DataSourceConfigTest 
{
	@Autowired
	private Environment env;
	
	@Bean
	@Profile("test")
	public DataSource dataSource()
	{
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setUsername("postgres");
		dataSource.setPassword("eits");
		dataSource.setUrl("jdbc:postgresql://localhost:5432/banco_teste");
		dataSource.setDriverClassName("org.postgresql.Driver");
		
		return dataSource;
	}
}
