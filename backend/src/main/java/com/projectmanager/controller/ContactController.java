package com.projectmanager.controller;

import com.projectmanager.model.Contact;
import com.projectmanager.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<Contact> getContacts() {
        return contactService.getAllContacts();
    }

    @PostMapping
    public Contact submitContact(@RequestBody Contact contact) {
        return contactService.saveContact(contact);
    }
}
