package sk.kasv.app.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import sk.kasv.app.dto.ConverterFromJson;
import sk.kasv.app.dto.ConverterToJson;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;
import sk.kasv.app.service.PigeonService;

import java.util.List;

@RestController
@RequestMapping("/pigeons")
public class PigeonController {

    @Autowired
    private PigeonService pigeonService;

    @GetMapping
    public ResponseEntity<JSONArray> getAllPigeons() {
        return ResponseEntity.status(200).body(ConverterToJson.createListOfPigeons(pigeonService.getAllPigeons()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JSONObject> getPigeonById(@PathVariable int id) {
        if (pigeonService.getPigeonById(id) != null)
            return ResponseEntity.status(200).body(ConverterToJson.createPigeonJson(pigeonService.getPigeonById(id)));
        return ResponseEntity.status(404).body(null);
    }

    @PostMapping
    public ResponseEntity<Boolean> addPigeon(@RequestBody JSONObject request, @AuthenticationPrincipal User currentUser) {
        Pigeon pigeon = new Pigeon();
        pigeon.setName(ConverterFromJson.getString(request, "name"));
        pigeon.setColor(ConverterFromJson.getString(request, "color"));
        pigeon.setBreed(ConverterFromJson.getString(request, "breed"));
        pigeon.setOwnerId(currentUser.getId());
        if (pigeonService.addPigeon(pigeon) != null)
            return ResponseEntity.status(201).body(true);
        return ResponseEntity.status(400).body(false);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updatePigeon(
            @PathVariable int id,
            @RequestBody JSONObject request,
            @AuthenticationPrincipal User currentUser) {
        Pigeon updatedPigeon = new Pigeon();
        updatedPigeon.setName(ConverterFromJson.getString(request, "name"));
        updatedPigeon.setColor(ConverterFromJson.getString(request, "color"));
        updatedPigeon.setBreed(ConverterFromJson.getString(request, "breed"));

        if (pigeonService.updatePigeon(id, updatedPigeon, currentUser) != null)
            return ResponseEntity.status(200).body(true);
        return ResponseEntity.status(400).body(false);
    }

    @DeleteMapping("/{id}")
    public void deletePigeon(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        pigeonService.deletePigeon(id, currentUser);
    }
}
