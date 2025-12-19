package com.projectmanager.service;

import com.projectmanager.model.Subscriber;
import com.projectmanager.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriberService {

    @Autowired
    private SubscriberRepository subscriberRepository;

    public List<String> getAllSubscribers() {
        // Returning list of emails to match original API
        return subscriberRepository.findAll().stream()
                .map(s -> s.getEmail())
                .collect(Collectors.toList());
    }

    public void addSubscriber(String email) {
        subscriberRepository.save(new Subscriber(email));
    }
}
