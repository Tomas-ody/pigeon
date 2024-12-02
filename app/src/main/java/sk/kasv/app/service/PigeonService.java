package sk.kasv.app.service;

import org.springframework.stereotype.Service;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PigeonService {
    private final Map<Integer, Pigeon> pigeonStorage = new HashMap<>();
    private final AtomicLong pigeonIdCounter = new AtomicLong(1);

    public List<Pigeon> getAllPigeons() {
        return new ArrayList<>(pigeonStorage.values());
    }

    public Pigeon getPigeonById(int id) {
        return pigeonStorage.get(id);
    }

    public List<Pigeon> getPigeonsByOwner(int ownerId) {
        List<Pigeon> pigeons = new ArrayList<>();
        for (Pigeon pigeon : pigeonStorage.values()) {
            if (pigeon.getOwnerId() == (ownerId)) {
                pigeons.add(pigeon);
            }
        }
        return pigeons;
    }

    public Pigeon addPigeon(Pigeon pigeon) {
        pigeon.setId(pigeonIdCounter.getAndIncrement());
        pigeonStorage.put(pigeon.getId(), pigeon);
        return pigeon;
    }

    public Pigeon updatePigeon(Long id, Pigeon updatedPigeon, User currentUser) {
        Pigeon existingPigeon = pigeonStorage.get(id);
        if (existingPigeon == null) {
            throw new RuntimeException("Pigeon not found");
        }

        // Check permissions
        if (!existingPigeon.getOwnerId().equals(currentUser.getId()) && !"ADMIN".equals(currentUser.getRole())) {
            throw new RuntimeException("You do not have permission to update this pigeon.");
        }

        existingPigeon.setName(updatedPigeon.getName());
        existingPigeon.setColor(updatedPigeon.getColor());
        existingPigeon.setBreed(updatedPigeon.getBreed());
        pigeonStorage.put(id, existingPigeon);

        return existingPigeon;
    }

    public void deletePigeon(Long id, User currentUser) {
        Pigeon existingPigeon = pigeonStorage.get(id);
        if (existingPigeon == null) {
            throw new RuntimeException("Pigeon not found");
        }

        // Check permissions
        if (!(existingPigeon.getOwnerId() == (currentUser.getId())) && !"ADMIN".equals(currentUser.getRole())) {
            throw new RuntimeException("You do not have permission to delete this pigeon.");
        }

        pigeonStorage.remove(id);
    }
}