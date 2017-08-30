package fi.vm.yti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"fi.vm.yti"})
public class RhpMain {

    public static void main(String[] args) {
        SpringApplication.run(RhpMain.class, args);
    }
}
