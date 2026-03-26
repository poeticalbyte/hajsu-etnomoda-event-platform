package com.hajsu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hajsu.backend.entity.Dress;

public interface DressRepository extends JpaRepository<Dress, Long> {

    List<Dress> findByVisibleTrue();

    long countByVisibleTrue();
}
