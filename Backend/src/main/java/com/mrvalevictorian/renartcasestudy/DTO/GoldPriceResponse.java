// src/main/java/com/mrvalevictorian/renartcasestudy/DTO/GoldPriceResponse.java
package com.mrvalevictorian.renartcasestudy.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GoldPriceResponse {
    private LocalDateTime date;
    private long timestamp;
    private String metal;
    private String exchange;
    private String currency;
    private double price;
    private double prev_close_price;
    private double ch;
    private double chp;
    private double price_gram_24k;
    private double price_gram_22k;
    private double price_gram_21k;
    private double price_gram_20k;
    private double price_gram_18k;
    private double price_gram_16k;
    private double price_gram_14k;
    private double price_gram_10k;
}