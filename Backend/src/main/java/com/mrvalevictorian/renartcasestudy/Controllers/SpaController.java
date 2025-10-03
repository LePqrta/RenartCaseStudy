package com.mrvalevictorian.renartcasestudy.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping("/**")
    public String forward(HttpServletRequest request) {
        String path = request.getRequestURI();
        // If the request is for a static file or an API endpoint, don't forward
        if (path.startsWith("/api") || path.contains(".")) {
            return null;
        }
        return "forward:/index.html";
    }
}