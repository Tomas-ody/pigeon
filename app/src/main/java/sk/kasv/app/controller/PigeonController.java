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
    public JSONArray getAllPigeons() {
        return ConverterToJson.createListOfPigeons(pigeonService.getAllPigeons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JSONObject> getPigeonById(@PathVariable int id) {
        return ResponseEntity.ok(ConverterToJson.createPigeonJson(pigeonService.getPigeonById(id)));
    }

    @PostMapping
    public boolean addPigeon(@RequestBody JSONObject request, @AuthenticationPrincipal User currentUser) {
        Pigeon pigeon = new Pigeon();
        pigeon.setName(ConverterFromJson.getString(request, "name"));
        pigeon.setColor(ConverterFromJson.getString(request, "color"));
        pigeon.setBreed(ConverterFromJson.getString(request, "breed"));
        pigeon.setOwnerId(currentUser.getId());
        return pigeonService.addPigeon(pigeon) != null;
    }

    @PutMapping("/{id}")
    public boolean updatePigeon(
            @PathVariable int id,
            @RequestBody JSONObject request,
            @AuthenticationPrincipal User currentUser) {
        Pigeon updatedPigeon = new Pigeon();
        updatedPigeon.setName(ConverterFromJson.getString(request, "name"));
        updatedPigeon.setColor(ConverterFromJson.getString(request, "color"));
        updatedPigeon.setBreed(ConverterFromJson.getString(request, "breed"));
        return pigeonService.updatePigeon(id, updatedPigeon, currentUser) != null;
    }

    @DeleteMapping("/{id}")
    public void deletePigeon(@PathVariable int id, @AuthenticationPrincipal User currentUser) {
        pigeonService.deletePigeon(id, currentUser);
    }
}
