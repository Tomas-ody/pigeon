package sk.kasv.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.kasv.app.entity.User;
import sk.kasv.app.security.JwtTokenProvider;
import sk.kasv.app.dto.AuthResponse;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(String username, String password) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid username or password");
        }

        String token = jwtTokenProvider.createToken(user.getUsername(), user.isAdmin()
        );
        return new AuthResponse(token);
    }
}
