package com.hajsu.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hajsu.backend.entity.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    List<Attendee> findAllByOrderByRegistrationDateDesc(Pageable pageable);
}
