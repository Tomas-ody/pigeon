package sk.kasv.app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sk.kasv.app.entity.User;
import sk.kasv.app.service.UserService;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Component
public class JwtTokenProvider {
    private final String SECRET_KEY = "mySecretKey";
    private final long VALIDITY = 3600000; // 1 hour
    @Autowired
    private UserService userService;

    public String createToken(String username, boolean admin, Integer id) {
        return Jwts.builder()
                .setSubject(username)
                .claim("admin", admin)//.claim("id", id)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + VALIDITY))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }

    public Boolean getRole(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().get("admin", Boolean.class);
    }
    public int getId(String token) {
        List<User> list = userService.getAllUsers();
        for (User user : list) {
            if (Objects.equals(user.getUsername(), getUsername(token))) {
                System.out.println("ID je " + user.getId());
                return user.getId();
            }
        }
        System.out.println("nie je ID");
        return 0;
    }

    public boolean validateToken(String token) {
        try {
            System.out.println("validateToken: " + token);
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
