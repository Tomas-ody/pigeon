package sk.kasv.app.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("zavolalo doFilterInternal");
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Našlo Bearer ");
            if (jwtTokenProvider.validateToken(token)) {
                System.out.println("token je validný");
                String username = jwtTokenProvider.getUsername(token);
                boolean isAdmin = jwtTokenProvider.getRole(token);
                int id = jwtTokenProvider.getId(token);
                String email = jwtTokenProvider.getEmail(token);
                String phone = jwtTokenProvider.getPhone(token);

                UserDetailsImpl userDetails = new UserDetailsImpl(username, isAdmin, id, email, phone);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Add attributes to request for controllers
                request.setAttribute("username", username);
                request.setAttribute("isAdmin", isAdmin);
                //request.setAttribute("id", id);
            }
        }

        filterChain.doFilter(request, response);
    }
}