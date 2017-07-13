package application.config;

import org.junit.runner.RunWith;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.eits.desafio.application.configuration.JPAConfig;
import com.eits.desafio.application.configuration.WebConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@ContextConfiguration(classes = {JPAConfig.class, WebConfig.class, DataSourceConfigTest.class})
@WebAppConfiguration
public abstract class IntegrationTests {
	
	
}
