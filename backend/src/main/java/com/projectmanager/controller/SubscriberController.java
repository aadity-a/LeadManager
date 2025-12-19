package com.projectmanager.controller;

import com.projectmanager.service.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscribe")
public class SubscriberController {

    @Autowired
    private SubscriberService subscriberService;

    @GetMapping
    public List<String> getSubscribers() {
        return subscriberService.getAllSubscribers();
    }

    @PostMapping
    public void subscribe(@RequestBody String email) {
        subscriberService.addSubscriber(email);
    }
}
