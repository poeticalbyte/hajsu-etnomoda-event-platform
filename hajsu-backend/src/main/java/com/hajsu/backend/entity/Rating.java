package com.hajsu.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    @ManyToOne
    @JoinColumn(name = "dress_id")
    private Dress dress;

    @ManyToOne
    @JoinColumn(name = "attendee_id")
    private Attendee attendee;

    public Rating() {}

    public Long getId() { return id; }

    public Integer getScore() { return score; }

    public void setScore(Integer score) { this.score = score; }

    public Dress getDress() { return dress; }

    public void setDress(Dress dress) { this.dress = dress; }

    public Attendee getAttendee() { return attendee; }

    public void setAttendee(Attendee attendee) { this.attendee = attendee; }
}