package sk.kasv.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;

@RestController
@RequestMapping("/pigeons")
public class PigeonController {

    @Autowired
    private PigeonService pigeonService;

    @GetMapping
    public List<PigeonResponse> getAllPigeons() {
        return pigeonService.getAllPigeons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PigeonResponse> getPigeonById(@PathVariable long id) {
        return ResponseEntity.ok(pigeonService.getPigeonById(id));
    }

    @PostMapping
    public Pigeon addPigeon(@RequestBody PigeonRequest request, @AuthenticationPrincipal User currentUser) {
        Pigeon pigeon = new Pigeon();
        pigeon.setName(request.getName());
        pigeon.setColor(request.getColor());
        pigeon.setBreed(request.getBreed());
        pigeon.setOwnerId(currentUser.getId());
        return pigeonService.addPigeon(pigeon);
    }

    @PutMapping("/{id}")
    public Pigeon updatePigeon(
            @PathVariable Long id,
            @RequestBody PigeonRequest request,
            @AuthenticationPrincipal User currentUser) {
        Pigeon updatedPigeon = new Pigeon();
        updatedPigeon.setName(request.getName());
        updatedPigeon.setColor(request.getColor());
        updatedPigeon.setBreed((request.getBreed()));
        return pigeonService.updatePigeon(id, updatedPigeon, currentUser);
    }

    @DeleteMapping("/{id}")
    public void deletePigeon(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {
        pigeonService.deletePigeon(id, currentUser);
    }
}
