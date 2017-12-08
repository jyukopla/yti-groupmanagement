package fi.vm.yti.groupmanagement.config;

import fi.vm.yti.groupmanagement.controller.SchedulerController;
import fi.vm.yti.groupmanagement.service.FrontendService;
import fi.vm.yti.groupmanagement.service.SchedulerService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class SchedulerConfig {

    @Bean
    public SchedulerController scheduler(FrontendService frontendService, SchedulerService schedulerService) {
        return new SchedulerController(frontendService, schedulerService);
    }
}
