package com.hajsu.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "dresses")
@Data
public class Dress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private String imageUrl;

    @Column(length = 500)
    private String shortDescription;

    @Column(length = 500)
    private String culturalStory;

    private String artist;

    private String materials;

    private String elaborationTime;

    private Boolean visible;
}
