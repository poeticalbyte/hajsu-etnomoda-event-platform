package com.hajsu.backend.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hajsu.backend.entity.Attendee;
import com.hajsu.backend.repository.AttendeeRepository;

@RestController
@RequestMapping("/api/attendees")
@CrossOrigin(origins = "*")
public class AttendeeController {

    private final AttendeeRepository attendeeRepository;

    public AttendeeController(AttendeeRepository attendeeRepository) {
        this.attendeeRepository = attendeeRepository;
    }

    @GetMapping("/count")
    public long getAttendeeCount() {
        return attendeeRepository.count();
    }

    @PostMapping
    public Attendee registerAttendee(@RequestBody Attendee attendee) {

        attendee.setRegistrationDate(LocalDateTime.now());
        return attendeeRepository.save(attendee);
    }
}
