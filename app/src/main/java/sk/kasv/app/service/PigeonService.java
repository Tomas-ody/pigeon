package sk.kasv.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PigeonService {
    private final Map<Integer, Pigeon> pigeonStorage = new HashMap<>();
    private int pigeonIdCounter = 7;

    public PigeonService() {
        List<Integer> list1 = new ArrayList<>();
        list1.add(2);
        pigeonStorage.put(1, new Pigeon(1, "Miloš", list1, "red", "kuracie", 2));
        List<Integer> list2 = new ArrayList<>();
        list2.add(3);
        pigeonStorage.put(2, new Pigeon(2, "Tereza", list2, "biela", 1, "laň", 2));
        pigeonStorage.put(3, new Pigeon(3, 2, "HUfnagel", "black", "labuť", 3));
        pigeonStorage.put(4, new Pigeon(4, "ratatui", "grey", "frost", 1));
        pigeonStorage.put(5, new Pigeon(5, "Yogi", "brown", "speedy", 3));
        List<Integer> list3 = new ArrayList<>();
        list3.add(4);
        list3.add(5);
        pigeonStorage.put(6, new Pigeon(6, 2,"Milan", list3,  "White", 1, "Marchello", 1));
        pigeonStorage.put(7, new Pigeon(7, 2, "Anastázia", "purple", 1, "formula", 1));
    }

    public List<Pigeon> getAllPigeons() {
        return new ArrayList<>(pigeonStorage.values());
    }

    public Pigeon getPigeonById(int id) {
        return pigeonStorage.values().stream().filter(p -> p.getId() == id).findFirst().get();
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
        //pigeon.setId(++pigeonIdCounter);
        pigeonStorage.put(++pigeonIdCounter, pigeon);
        return pigeon;
    }

    public Pigeon updatePigeon(Pigeon updatedPigeon) {

        int pigeonIndex = 0;

        for (Map.Entry<Integer, Pigeon> entry : pigeonStorage.entrySet()) {
            if (entry.getValue().getId() == updatedPigeon.getId()) {
                pigeonIndex = entry.getKey();
            }
        }

        Pigeon existingPigeon = pigeonStorage.values().stream()
                .filter(p -> p.getId() == updatedPigeon.getId())
                        .findFirst().get();

        if (existingPigeon == null) {
            throw new RuntimeException("Pigeon not found");
        }

        existingPigeon.setName(updatedPigeon.getName());
        existingPigeon.setColor(updatedPigeon.getColor());
        existingPigeon.setBreed(updatedPigeon.getBreed());
        existingPigeon.setMotherId(updatedPigeon.getMotherId());
        existingPigeon.setFatherId(updatedPigeon.getFatherId());
        existingPigeon.setKidsId(updatedPigeon.getKidsId());

        pigeonStorage.put(pigeonIndex, existingPigeon);

        return updatedPigeon;
    }

    public void deletePigeon(int id) {
        Pigeon existingPigeon = pigeonStorage.values().stream().filter(p -> p.getId() == id).findFirst().get();
        if (existingPigeon == null) {
            throw new RuntimeException("Pigeon not found");
        }

        int pigeonIndex = 0;

        for (Map.Entry<Integer, Pigeon> entry : pigeonStorage.entrySet()) {
            if (entry.getValue().getId() == id) {
                pigeonIndex = entry.getKey();
            }
        }

        pigeonStorage.remove(pigeonIndex);
    }

    public List<Integer> idOfPigeons() {
        List<Integer> list = new ArrayList<>();

        for (Map.Entry<Integer, Pigeon> entry : pigeonStorage.entrySet()) {
            list.add(entry.getValue().getId());
        }

        return list;
    }
}