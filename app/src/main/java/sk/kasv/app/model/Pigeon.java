package sk.kasv.app.model;

public class Pigeon {
    private int id;
    private String name;
    private String color;
    private String breed;
    private int addedByUserId;

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

    public int getAddedByUserId() {
        return addedByUserId;
    }

    public void setAddedByUserId(int addedByUserId) {
        this.addedByUserId = addedByUserId;
    }

    public Pigeon() {

    }

    public Pigeon(int id, String name, String color, String breed, int addedByUserId) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.breed = breed;
        this.addedByUserId = addedByUserId;
    }
}
