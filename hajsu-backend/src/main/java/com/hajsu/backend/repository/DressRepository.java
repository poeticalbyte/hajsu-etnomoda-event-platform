package com.hajsu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hajsu.backend.entity.Dress;

public interface DressRepository extends JpaRepository<Dress, Long> {

}
