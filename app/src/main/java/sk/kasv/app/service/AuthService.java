package sk.kasv.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.kasv.app.entity.User;
import sk.kasv.app.security.JwtTokenProvider;
import sk.kasv.app.dto.AuthResponse;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(String username, String password) {
        Optional<User> user = userService.findByUsername(username);

        if (user.isEmpty() || !user.get().getPassword().equals(password)) {
            return null;
        }
        System.out.println("Id of user is: " + user.get().getId());
        String token = jwtTokenProvider.createToken(user.get().getUsername(), user.get().isAdmin()
        );
        return new AuthResponse(token);
    }
}
