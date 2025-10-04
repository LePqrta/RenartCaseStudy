package com.mrvalevictorian.backend.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.mrvalevictorian.backend.DTO.GoldPriceResponse;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class GoldPriceService {
    @Value("${API_KEY}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public GoldPriceResponse getLiveGoldPrice() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String apiUrl = "https://www.goldapi.io/api/XAU/USD/"+yesterday.format(formatter);
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-access-token", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<GoldPriceResponse> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                entity,
                GoldPriceResponse.class
        );

        return response.getBody();
    }
}
