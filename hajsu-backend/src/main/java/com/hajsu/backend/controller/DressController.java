package com.hajsu.backend.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hajsu.backend.entity.Dress;
import com.hajsu.backend.repository.DressRepository;

@RestController
@RequestMapping("/api/dresses")
@CrossOrigin(origins = "*")
public class DressController {

    private final DressRepository dressRepository;

    public DressController(DressRepository dressRepository) {
        this.dressRepository = dressRepository;
    }

    @GetMapping
    public List<Dress> getAllDresses() {
        return dressRepository.findAll();
    }

    @GetMapping("/visible")
    public List<Dress> getVisibleDresses() {
        return dressRepository.findByVisibleTrue();
    }

    @GetMapping("/count")
    public long getActiveCount() {
        return dressRepository.countByVisibleTrue();
    }

    @GetMapping("/{id}")
    public Dress getDressById(@PathVariable Long id) {
        return dressRepository.findById(Objects.requireNonNull(id)).orElse(null);
    }

    @PostMapping
    public Dress createDress(@RequestBody Dress dress) {
        return dressRepository.save(dress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dress> updateDress(@PathVariable Long id, @RequestBody Dress dress) {
        return dressRepository.findById(id)
                .map(existing -> {
                    existing.setName(dress.getName());
                    existing.setPrice(dress.getPrice());
                    existing.setImageUrl(dress.getImageUrl());
                    existing.setShortDescription(dress.getShortDescription());
                    existing.setCulturalStory(dress.getCulturalStory());
                    existing.setArtist(dress.getArtist());
                    existing.setMaterials(dress.getMaterials());
                    existing.setElaborationTime(dress.getElaborationTime());
                    existing.setVisible(dress.getVisible());
                    return ResponseEntity.ok(dressRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
