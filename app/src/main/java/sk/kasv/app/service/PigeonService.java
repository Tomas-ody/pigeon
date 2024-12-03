package sk.kasv.app.service;

import org.springframework.stereotype.Service;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PigeonService {
    private final Map<Integer, Pigeon> pigeonStorage = new HashMap<>();
    private int pigeonIdCounter = 5;

    public List<Pigeon> getAllPigeons() {
        return new ArrayList<>(pigeonStorage.values());
    }

    public Pigeon getPigeonById(int id) {
        return pigeonStorage.get(id);
    }

    public List<Pigeon> getPigeonsByOwner(int ownerId) {
        List<Pigeon> pigeons = new ArrayList<>();
        for (Pigeon pigeon : pigeonStorage.values()) {
            if (pigeon.getOwnerId() == ownerId) {
                pigeons.add(pigeon);
            }
        }
        return pigeons;
    }

    public Pigeon addPigeon(Pigeon pigeon) {
        pigeon.setId(++pigeonIdCounter);
        pigeonStorage.put(pigeon.getId(), pigeon);
        return pigeon;
    }

    public Pigeon updatePigeon(int id, Pigeon updatedPigeon, User currentUser) {
        Pigeon existingPigeon = pigeonStorage.get(id);
        if (existingPigeon == null) {
            throw new RuntimeException("Pigeon not found");
        }

        // Check permissions
        if (!(existingPigeon.getOwnerId() == (currentUser.getId())) && !currentUser.isAdmin()) {
            throw new RuntimeException("You do not have permission to update this pigeon.");
        }

        existingPigeon.setName(updatedPigeon.getName());
        existingPigeon.setColor(updatedPigeon.getColor());
        existingPigeon.setBreed(updatedPigeon.getBreed());
        pigeonStorage.put(id, existingPigeon);

        return existingPigeon;
    }

    public void deletePigeon(int id, User currentUser) {
        Pigeon existingPigeon = pigeonStorage.get(id);
        if (existingPigeon == null) {
            throw new RuntimeException("Pigeon not found");
        }

        // Check permissions
        if (!(Objects.equals(existingPigeon.getOwnerId(), currentUser.getId())) && !currentUser.isAdmin()) {
            throw new RuntimeException("You do not have permission to delete this pigeon.");
        }

        pigeonStorage.remove(id);
    }
}