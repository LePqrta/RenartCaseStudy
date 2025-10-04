package com.mrvalevictorian.backend.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {
    private String name;
    private double popularityScore;
    private double weight;
    private double price;
    private Images images;
    private double popularityScoreOutOfFive;
}
