package sk.kasv.app.entity;

import java.util.ArrayList;
import java.util.List;

public class Pigeon {
    private int id;
    private int motherId;
    private int fatherId;
    private List<Integer> kidsId;
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

    public int getMotherId() {
        return motherId;
    }

    public void setMotherId(int motherId) {
        this.motherId = motherId;
    }

    public int getFatherId() {
        return fatherId;
    }

    public void setFatherId(int fatherId) {
        this.fatherId = fatherId;
    }

    public List<Integer> getKidsId() {
        return kidsId;
    }

    public void setKidsId(List<Integer> kidsId) {
        this.kidsId = kidsId;
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

    public Pigeon(int id, String name, List<Integer> kidsId, String color, Integer fatherId, String breed, int ownerId) {
        this(id, null, name, kidsId, color, fatherId, breed, ownerId);
    }
    public Pigeon(int id, String name, String color, Integer fatherId, String breed, int ownerId) {
        this(id, null, name, null, color, fatherId, breed, ownerId);
    }
    public Pigeon(int id, String name, String color, String breed, int ownerId) {
        this(id, null, name, null, color, null, breed, ownerId);
    }
    public Pigeon(int id, Integer motherId, String name, String color, String breed, int ownerId) {
        this(id, motherId, name, null, color, null, breed, ownerId);
    }
    public Pigeon(int id, Integer motherId, String name, List<Integer> kidsId, String color, String breed, int ownerId) {
        this(id, motherId, name, kidsId, color, null, breed, ownerId);
    }
    public Pigeon(int id, Integer motherId, String name, String color, Integer fatherId, String breed, int ownerId) {
        this(id, motherId, name, null, color, fatherId, breed, ownerId);
    }
    public Pigeon(int id, String name, List<Integer> kidsId, String color, String breed, int ownerId) {
        this(id, null, name, kidsId, color, null, breed, ownerId);
    }

    public Pigeon(int id, Integer motherId, String name, List<Integer> kidsId, String color, Integer fatherId, String breed, int ownerId) {
        this.id = id;
        this.motherId = motherId;
        this.fatherId = fatherId;
        this.kidsId = kidsId;
        this.name = name;
        this.color = color;
        this.breed = breed;
        this.ownerId = ownerId;
    }
}
