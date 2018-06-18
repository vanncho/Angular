package com.ticketstore.server.controllers;

import com.ticketstore.server.models.Ticket.binding.TicketAddModel;
import com.ticketstore.server.models.Ticket.binding.TicketEditModel;
import com.ticketstore.server.models.Ticket.view.TicketListModel;
import com.ticketstore.server.services.interfaces.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // TODO: REMOVE functionality
//    @GetMapping("/allTickets/{eventId}")
//    public ResponseEntity<List<TicketListModel>> getTicketsForEvent(@PathVariable("eventId") Long eventId) {
//
//        List<TicketListModel> tickets = ticketService.getAllTicketsForEvent(eventId);
//
//        return new ResponseEntity<>(tickets, HttpStatus.OK);
//    }

    @PostMapping("addTicket")
    public ResponseEntity addTicket(@RequestBody TicketAddModel ticketModel) {

        ticketService.addTicket(ticketModel);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("getTicket/{ticketId}")
    public ResponseEntity<TicketEditModel> getTicketById(@PathVariable Long ticketId) {

        TicketEditModel ticket = ticketService.getTicketById(ticketId);

        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    @PostMapping("editTicket")
    public ResponseEntity editTicket(@RequestBody TicketEditModel ticketModel) {

        ticketService.editTicket(ticketModel);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("deleteTicket/{ticketId}")
    public ResponseEntity deleteCategory(@PathVariable Long ticketId) {

        ticketService.deleteTicket(ticketId);

        return new ResponseEntity(HttpStatus.OK);

    }

}
