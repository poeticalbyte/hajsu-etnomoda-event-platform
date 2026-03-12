package com.hajsu.backend.controller;

import com.hajsu.backend.entity.*;
import com.hajsu.backend.repository.*;

import java.util.Objects;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingController {

    private final RatingRepository ratingRepository;
    private final DressRepository dressRepository;
    private final AttendeeRepository attendeeRepository;

    public RatingController(
            RatingRepository ratingRepository,
            DressRepository dressRepository,
            AttendeeRepository attendeeRepository) {

        this.ratingRepository = ratingRepository;
        this.dressRepository = dressRepository;
        this.attendeeRepository = attendeeRepository;
    }

    @PostMapping
    public Rating rateDress(
            @RequestParam Long dressId,
            @RequestParam Long attendeeId,
            @RequestParam Integer score) {

        Dress dress = dressRepository.findById(Objects.requireNonNull(dressId)).orElseThrow();
        Attendee attendee = attendeeRepository.findById(Objects.requireNonNull(attendeeId)).orElseThrow();

        Rating rating = new Rating();
        rating.setDress(dress);
        rating.setAttendee(attendee);
        rating.setScore(score);

        return ratingRepository.save(rating);
    }
}