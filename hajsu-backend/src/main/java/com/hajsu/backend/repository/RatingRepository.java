package com.hajsu.backend.repository;

import com.hajsu.backend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("SELECT AVG(r.score) FROM Rating r WHERE r.dress.id = :dressId")
    Double findAverageScoreByDressId(@Param("dressId") Long dressId);
}