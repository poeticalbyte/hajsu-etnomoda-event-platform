package com.hajsu.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hajsu.backend.entity.Dress;
import com.hajsu.backend.repository.DressRepository;


@RestController
@RequestMapping("/api/dresses")
public class DressController {

    private final DressRepository dressRepository;

    public DressController(DressRepository dressRepository) {
        this.dressRepository = dressRepository;
    }

    @GetMapping
    public List<Dress> getAllDresses() {
        return dressRepository.findAll();
    }

    @GetMapping("/{id}")
    public Dress getDressById(@PathVariable Long id) {
        return dressRepository.findById(id).orElse(null);
    }
}
