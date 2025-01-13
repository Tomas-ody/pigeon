package sk.kasv.app.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import sk.kasv.app.entity.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {
    private String username;
    private boolean isAdmin;
    private int id;
    private String email;
    private String phone;

    public UserDetailsImpl(String username, boolean isAdmin, int id) {
        this.username = username;
        this.isAdmin = isAdmin;
        this.id = id;
    }

    public UserDetailsImpl(String username, boolean isAdmin, int id, String email, String phone) {
        this.username = username;
        this.isAdmin = isAdmin;
        this.id = id;
        this.email = email;
        this.phone = phone;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (isAdmin) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        return authorities;
    }

    public String getAuthority() {
        String authority = "";
        if (isAdmin) {
            authority = "ROLE_ADMIN";
        } else {
            authority = "ROLE_USER";
        }
        return authority;
    }

    @Override
    public String getPassword() {
        return null; // Not needed for this example
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public int getId() { return  id; }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
