package sk.kasv.app.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import sk.kasv.app.dto.ConverterToJson;
import sk.kasv.app.entity.User;
import sk.kasv.app.security.UserDetailsImpl;
import sk.kasv.app.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to fetch all users (Admin only)
    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<JSONObject> getAllUsers(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        if (!currentUser.isAdmin()) {
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.status(200).body(ConverterToJson.createListOfUsers(userService.getAllUsers(currentUser.getId())));
    }

    // Endpoint to fetch the current user's details
    @CrossOrigin
    @GetMapping("/me")
    public ResponseEntity<JSONObject> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl currentUser, @RequestHeader("Authorization") String token) {
        System.out.println("Token: " + token);

        if (currentUser != null) {
            System.out.println(currentUser.getUsername() + " " + currentUser.getPassword());
            System.out.println("úspešne som dostal usera na FE");
            return ResponseEntity.status(200).body(ConverterToJson.createUserJson(currentUser));
        }
        return ResponseEntity.status(400).body(ConverterToJson.jsonMessage("Not registered"));
    }

    // Endpoint to fetch a user by ID (Admin only)
    @CrossOrigin
    @GetMapping("/user/{id}")
    public ResponseEntity<JSONObject> getUserById(@PathVariable int id) {
        return ResponseEntity.status(200).body(ConverterToJson.createUserJson(userService.getUserById(id)));
    }
/*
    // Endpoint to register a new user
    @CrossOrigin
    @PostMapping("/register")
    public User registerUser(@RequestBody User newUser) {
        return userService.addUser(newUser.getUsername(), newUser.getPassword(), false);
    }
*/
    // Endpoint to delete a user by ID (Admin only)
    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<JSONObject> deleteUser(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        if (!currentUser.isAdmin()) {
            return ResponseEntity.status(401).body(ConverterToJson.jsonMessage("Access denies: Only admins can delete users"));
        }
        if (userService.deleteUserById(id)) {
            return ResponseEntity.status(200).body(ConverterToJson.jsonMessage("User deleted successfully"));
        }
        return ResponseEntity.status(400).body(ConverterToJson.jsonMessage("User not found"));
    }
}
