package com.hajsu.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeRepository.findAllByOrderByRegistrationDateDesc();
    }

    @GetMapping("/count")
    public long getAttendeeCount() {
        return attendeeRepository.count();
    }

    @GetMapping("/recent")
    public List<Attendee> getRecentAttendees(@RequestParam(defaultValue = "5") int limit) {
        return attendeeRepository.findAllByOrderByRegistrationDateDesc(PageRequest.of(0, limit));
    }

    @PostMapping
    public Attendee registerAttendee(@RequestBody Attendee attendee) {

        attendee.setRegistrationDate(LocalDateTime.now());
        return attendeeRepository.save(attendee);
    }
}
