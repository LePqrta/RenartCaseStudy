package com.mrvalevictorian.backend.services;

import com.mrvalevictorian.backend.models.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@Service
@RequiredArgsConstructor
// Since there is no database, service layer is used to get the data from the json file
public class ProductService {
    private final GoldPriceService goldPriceService;
    private Double cachedGoldPricePerGram = null;
    private java.time.LocalDate cachedGoldPriceDate = null;
    public List<Product> getProductList() {
        String fileName = "data/products.json";
        ClassLoader classLoader = getClass().getClassLoader();
        try (java.io.InputStream is = classLoader.getResourceAsStream(fileName)) {
            if (is == null) {
                throw new IllegalArgumentException("file not found! " + fileName);
            }
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(is, new TypeReference<>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
            return java.util.Collections.emptyList();
        }
    }
    // With this API call, I can not get the current days gold price, so I am using the previous day's price
    public List<Product> setPricesAndReturnProductList(Double minPrice, Double maxPrice,
                                                       Double minPopularity, Double maxPopularity) {
        List<Product> productList = getProductList();
        double goldPricePerGram;
        java.time.LocalDate today = java.time.LocalDate.now();

        //Caching the gold price for the day to avoid multiple API calls
        if(cachedGoldPricePerGram==null||cachedGoldPriceDate==null||!cachedGoldPriceDate.equals(today)){
            goldPricePerGram = goldPriceService.getLiveGoldPrice().getPrice_gram_18k();
            cachedGoldPricePerGram=goldPricePerGram;
            cachedGoldPriceDate=today;
        } else {
            goldPricePerGram=cachedGoldPricePerGram;
        }
        // Price calculation and rounding to the nearest integer
        for (Product product : productList) {
            double price = product.getWeight() * goldPricePerGram * (1 + product.getPopularityScore());
            product.setPrice(Math.round(price)); // Rounding to the nearest integer
        }
        //Popularity score out of 5 calculation
        for (Product product : productList) {
            double price = product.getWeight() * goldPricePerGram * (1 + product.getPopularityScore());
            product.setPrice(Math.round(price));
            double scoreOutOf5 = Math.round(product.getPopularityScore() * 5 * 10) / 10.0;
            product.setPopularityScoreOutOfFive(scoreOutOf5);
        }
        return productList.stream()
                .filter(p -> minPrice == null || p.getPrice() >= minPrice)
                .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                .filter(p -> minPopularity == null || p.getPopularityScoreOutOfFive() >= minPopularity)
                .filter(p -> maxPopularity == null || p.getPopularityScoreOutOfFive() <= maxPopularity)
                .toList();
    }
}
