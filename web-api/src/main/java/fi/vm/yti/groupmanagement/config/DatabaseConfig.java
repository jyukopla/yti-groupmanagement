package fi.vm.yti.groupmanagement.config;

import org.dalesbred.Database;
import org.dalesbred.conversion.TypeConversionRegistry;
import org.dalesbred.integration.spring.SpringTransactionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
class DatabaseConfig {

    private final DataSource dataSource;

    @Autowired
    DatabaseConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    Database database() {
        Database database = new Database(new SpringTransactionManager(dataSource, transactionManager()));
        registerTypeConversions(database.getTypeConversionRegistry());
        return database;
    }

    private void registerTypeConversions(TypeConversionRegistry registry) {
    }

    @Bean
    PlatformTransactionManager transactionManager() {
      return new DataSourceTransactionManager(dataSource);
    }
}