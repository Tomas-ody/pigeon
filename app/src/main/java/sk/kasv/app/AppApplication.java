package sk.kasv.app;

import org.apache.catalina.connector.Response;
import org.springframework.boot.SpringApplication;
import org.json.simple.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.net.http.HttpResponse;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@CrossOrigin
	@PostMapping(value = "/login")
	public Response loginUser(@RequestBody JSONObject userLoginData) {

		if (userLoginData.get("username") == null) {
			return Response.
		}


	}

}
