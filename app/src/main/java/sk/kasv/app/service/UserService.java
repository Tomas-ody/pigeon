package sk.kasv.app.service;

import org.springframework.stereotype.Service;
import sk.kasv.app.entity.User;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {
    private final Map<Integer, User> userStorage = new HashMap<>();
    private int userIdCounter = 2;

    public List<User> getAllUsers() {
        return new ArrayList<>(userStorage.values());
    }

    public UserService() {
        // Add a default admin and user for testing
        userStorage.put(1, new User(1, "admin", "admin", true));
        userStorage.put(2, new User(2, "user", "user", false));
    }

    public Optional<User> findByUsername(String username) {
        return userStorage.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }

    public User addUser(String username, String password, boolean role) {
        int userId = ++userIdCounter;
        User user = new User(userId, username, password, role);
        userStorage.put(userId, user);
        return user;
    }
}