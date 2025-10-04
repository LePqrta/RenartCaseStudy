package com.mrvalevictorian.backend.controllers;

import com.mrvalevictorian.backend.models.Product;
import com.mrvalevictorian.backend.services.GoldPriceService;
import com.mrvalevictorian.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final ProductService productService;
    private final GoldPriceService goldPriceService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>>  getProducts(
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minPopularity,
            @RequestParam(required = false) Double maxPopularity) {

        // Validate individual parameters
        if (minPrice != null && minPrice < 0) return ResponseEntity.badRequest().build();
        if (maxPrice != null && maxPrice < 0) return ResponseEntity.badRequest().build();
        if (minPopularity != null && (minPopularity < 0 || minPopularity > 5)) return ResponseEntity.badRequest().build();
        if (maxPopularity != null && (maxPopularity < 0 || maxPopularity > 5)) return ResponseEntity.badRequest().build();

        // Validate ranges
        if (minPrice != null && maxPrice != null && minPrice > maxPrice) return ResponseEntity.badRequest().build();
        if (minPopularity != null && maxPopularity != null && minPopularity > maxPopularity) return ResponseEntity.badRequest().build();

        try {
            return ResponseEntity.ok().body(productService.setPricesAndReturnProductList(minPrice,
                    maxPrice, minPopularity, maxPopularity));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
