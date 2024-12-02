package sk.kasv.app.entity;

public class Pigeon {
    private int id;
    private String name;
    private String color;
    private String breed;
    private int ownerId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public Pigeon() {

    }

    public Pigeon(int id, String name, String color, String breed, int ownerId) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.breed = breed;
        this.ownerId = ownerId;
    }
}
