package com.ticketstore.server.controllers;

import com.ticketstore.server.models.Event.binding.EventAddModel;
import com.ticketstore.server.models.Event.view.EventViewModel;
import com.ticketstore.server.services.interfaces.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/allEvents")
    public ResponseEntity<List<EventViewModel>> getCategories() {

        List<EventViewModel> events = eventService.getAllEvents();
System.err.println(events.size());
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping("addEvent")
    public ResponseEntity addEvent(@RequestBody EventAddModel eventModel) {

        eventService.addEvent(eventModel);

        return new ResponseEntity(HttpStatus.OK);
    }
}
