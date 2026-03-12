package com.hajsu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hajsu.backend.entity.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {
    
}
