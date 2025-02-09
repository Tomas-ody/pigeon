package sk.kasv.app.entity;

public class User {

    private int id;
    private String username;
    private String password;
    private boolean admin;
    private String email;
    private String phone;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User() {

    }

    public User(int id, String username, String password, boolean admin, String email, String phone) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.email = email;
        this.phone = phone;
    }
}
