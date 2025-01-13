package sk.kasv.app.service;

import org.springframework.stereotype.Service;
import sk.kasv.app.entity.User;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {
    private final Map<Integer, User> userStorage = new HashMap<>();
    private int userIdCounter = 3;

    public List<User> getAllUsers() {
        return new ArrayList<>(userStorage.values());
    }

    public UserService() {
        // Add a default admin and user for testing
        userStorage.put(1, new User(1, "admin", "admin", true, "admin@pigeon.sk", "+421545878966"));
        userStorage.put(2, new User(2, "user1", "user1", false, "user1@gmail.com", "+421554887996"));
        userStorage.put(3, new User(3, "user2", "user2", false, "user2@gmail.com", "+421754214888"));
    }

    public Optional<User> findByUsername(String username) {
        return userStorage.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }

    public User getUserById(int id) {
        return userStorage.get(id);
    }

    public boolean deleteUserById(int id) {
        if (getUserById(id) != null) {
            userStorage.remove(id);
            return true;
        }
        return false;

    }
/*
    public User addUser(String username, String password, boolean role) {
        int userId = ++userIdCounter;
        User user = new User(userId, username, password, role);
        userStorage.put(userId, user);
        return user;
    }*/
}