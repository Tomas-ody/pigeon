package sk.kasv.app.controller;

import jakarta.persistence.PostUpdate;
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
import sk.kasv.app.security.UserDetailsImpl;
import sk.kasv.app.service.PigeonService;

@RestController
@RequestMapping("/pigeons")
public class PigeonController {

    @Autowired
    private PigeonService pigeonService;

    @CrossOrigin
    @GetMapping("/list")
    public ResponseEntity<JSONObject> getAllPigeons() {
        System.out.println("WEB zavolal holuby");
        return ResponseEntity.status(200).body(ConverterToJson.createListOfPigeons(pigeonService.getAllPigeons()));
    }

    @CrossOrigin
    @GetMapping("/owner")
    public ResponseEntity<JSONObject> getAllPigeonsOfOwner(@AuthenticationPrincipal UserDetailsImpl currentUser, @RequestHeader("Authorization") String token) {
        return ResponseEntity.status(200).body(ConverterToJson.createListOfPigeons(pigeonService.getPigeonsByOwner(currentUser.getId())));
    }

    @CrossOrigin
    @GetMapping("/owner/{id}")
    public ResponseEntity<JSONObject> getAllPigeonsOfUser(@PathVariable int id, @AuthenticationPrincipal UserDetailsImpl currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(200).body(ConverterToJson.jsonMessage("You have to be registered."));
        }
        return ResponseEntity.status(200).body(ConverterToJson.createListOfPigeons(pigeonService.getPigeonsByOwner(id)));
    }

    @CrossOrigin
    @GetMapping("/pigeon/{id}")
    public ResponseEntity<JSONObject> getPigeonById(@PathVariable int id) {
        if (pigeonService.getPigeonById(id) != null)
            return ResponseEntity.status(200).body(ConverterToJson.createPigeonJson(pigeonService.getPigeonById(id)));
        return ResponseEntity.status(404).body(null);
    }

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<Boolean> addPigeon(@RequestBody JSONObject request, @AuthenticationPrincipal UserDetailsImpl currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(400).body(false);
        }

        System.out.println("addPigeon");
        Pigeon pigeon = new Pigeon();
        pigeon.setId(ConverterFromJson.getInt(request, "id"));
        pigeon.setName(ConverterFromJson.getString(request, "name"));
        pigeon.setFatherId(ConverterFromJson.getInt(request, "fatherId"));
        pigeon.setMotherId(ConverterFromJson.getInt(request, "motherId"));
        pigeon.setKidsId(ConverterFromJson.getList(request, "kidsId"));
        pigeon.setColor(ConverterFromJson.getString(request, "color"));
        pigeon.setBreed(ConverterFromJson.getString(request, "breed"));
        pigeon.setOwnerId(currentUser.getId());
        if (pigeonService.addPigeon(pigeon) != null)
            return ResponseEntity.status(201).body(true);
        return ResponseEntity.status(400).body(false);
    }

    @CrossOrigin
    @PostMapping("/update")
    public ResponseEntity<Boolean> updatePigeon(@RequestBody JSONObject request, @AuthenticationPrincipal UserDetailsImpl currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(400).body(false);
        }

        System.out.println("updatujem holuba");
        Pigeon updatedPigeon = new Pigeon();
        updatedPigeon.setName(ConverterFromJson.getString(request, "name"));
        updatedPigeon.setColor(ConverterFromJson.getString(request, "color"));
        updatedPigeon.setBreed(ConverterFromJson.getString(request, "breed"));
        updatedPigeon.setMotherId(ConverterFromJson.getInt(request, "motherId"));
        updatedPigeon.setFatherId(ConverterFromJson.getInt(request, "fatherId"));
        updatedPigeon.setKidsId(ConverterFromJson.getList(request, "kidsId"));
        updatedPigeon.setId(ConverterFromJson.getInt(request, "id"));


        if (pigeonService.updatePigeon(updatedPigeon) != null) {
            System.out.println("úspešný update");
            return ResponseEntity.status(200).body(true);

        }
        System.out.println("neúspešný update");
        return ResponseEntity.status(400).body(false);
    }

    @CrossOrigin
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Boolean> deletePigeon(@PathVariable int id, @AuthenticationPrincipal UserDetailsImpl currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(400).body(false);
        }

        System.out.println("deletePigeon");
        pigeonService.deletePigeon(id);
        return ResponseEntity.status(200).body(true);
    }

    @CrossOrigin
    @GetMapping("/id")
    public ResponseEntity<JSONObject> getPigeonsId() {
        return ResponseEntity.status(200).body(ConverterToJson.pigeonsIdList(pigeonService.idOfPigeons()));
    }
}
