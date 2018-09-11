package fi.vm.yti.groupmanagement.config;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

@Component
@Path("configuration")
@Api(tags = {"Admin"}, description = "Get configuration")
public class Config {

    @Autowired
    Config() {
    }

    @Context ServletContext context;
    @GET
    @ApiOperation(value = "Returns API config", notes = "Returns API config")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK")
    })
    public Response json() {

        return config();
    }

    public Response config() {
        return Response.status(200).entity(new Object()).build();
    }
}