package com.opendesign.core.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.UUID;

@Entity
public class Screen {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID projectId;
    private String versionTag;
    private String imageUrl;
    private double x;
    private double y;
    private double scale;

    // Getters and Setters omitted for brevity
}
