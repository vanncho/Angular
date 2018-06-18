package com.ticketstore.server.controllers;

import com.ticketstore.server.models.Event.binding.EventAddModel;
import com.ticketstore.server.models.Event.binding.EventEditModel;
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

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping("addEvent")
    public ResponseEntity addEvent(@RequestBody EventAddModel eventModel) {

        eventService.addEvent(eventModel);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("getEvent/{eventId}")
    public ResponseEntity<EventEditModel> getCategoryById(@PathVariable Long eventId) {

        EventEditModel event = eventService.getEventById(eventId);

        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PostMapping("editEvent")
    public ResponseEntity editEvent(@RequestBody EventEditModel event) {

        eventService.editEvent(event);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("deleteEvent/{eventId}")
    public ResponseEntity deleteCategory(@PathVariable Long eventId) {

        eventService.deleteEvent(eventId);

        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping("/searchEvent")
    public ResponseEntity<List<EventViewModel>> searchEventByName(@RequestBody String eventTitle) {

        List<EventViewModel> events = eventService.searchEventByName(eventTitle);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }
}
