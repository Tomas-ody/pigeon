package sk.kasv.app.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.kasv.app.dto.AuthResponse;
import sk.kasv.app.dto.ConverterFromJson;
import sk.kasv.app.dto.ConverterToJson;
import sk.kasv.app.service.AuthService;
import sk.kasv.app.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<JSONObject> login(@RequestBody JSONObject authRequest) {

        AuthResponse response = authService.login(
                ConverterFromJson.getString(authRequest, "username"),
                ConverterFromJson.getString(authRequest, "password")
        );

        if (response == null) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200)
                .header("Authorization", "Bearer " + response.getToken())
                .body(ConverterToJson.createSingleJson(response.getToken()));
    }
}