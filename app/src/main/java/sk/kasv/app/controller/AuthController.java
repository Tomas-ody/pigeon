package sk.kasv.app.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.kasv.app.dto.AuthRequest;
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
    public ResponseEntity<JSONObject> login(@RequestBody JSONObject authRequest) {
        AuthResponse response = authService.login(
                ConverterFromJson.getString(authRequest, "username"),
                ConverterFromJson.getString(authRequest, "password")
        );

        if (response == null) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.status(200).body(ConverterToJson.createSingleJson(response.getToken()));
    }
}