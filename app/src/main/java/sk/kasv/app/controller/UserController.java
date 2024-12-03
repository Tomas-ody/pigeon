package sk.kasv.app.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import sk.kasv.app.dto.ConverterToJson;
import sk.kasv.app.entity.User;
import sk.kasv.app.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to fetch all users (Admin only)
    @GetMapping
    public ResponseEntity<JSONArray> getAllUsers(@AuthenticationPrincipal User currentUser) {
        if (!currentUser.isAdmin()) {
            return ResponseEntity.status(401).body(null);
        }
        return ResponseEntity.status(200).body(ConverterToJson.createListOfUsers(userService.getAllUsers()));
    }

    // Endpoint to fetch the current user's details
    @GetMapping("/me")
    public ResponseEntity<JSONObject> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.status(200).body(ConverterToJson.createUserJson(currentUser));
    }

    // Endpoint to fetch a user by ID (Admin only)
    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        if (!currentUser.isAdmin()) {
            throw new RuntimeException("Access denied: Only admins can fetch other users' details.");
        }
        return userService.getUserById(id);
    }

    // Endpoint to register a new user
    @PostMapping("/register")
    public User registerUser(@RequestBody User newUser) {
        return userService.addUser(newUser.getUsername(), newUser.getPassword(), false);
    }

    // Endpoint to delete a user by ID (Admin only)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        if (!currentUser.isAdmin()) {
            throw new RuntimeException("Access denied: Only admins can delete users.");
        }
        userService.deleteUserById(id);
    }
}
