package com.ticketstore.server.services;

import com.ticketstore.server.entities.Ticket;
import com.ticketstore.server.models.Ticket.TicketAddModel;
import com.ticketstore.server.repositories.TicketRepository;
import com.ticketstore.server.services.interfaces.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void addTicket(TicketAddModel ticketModel) {

        Ticket ticket = new Ticket();
        ticket.setCount(ticketModel.getCount());
        ticket.setPrice(ticketModel.getPrice());
        ticket.setPriceCategory(ticketModel.getPriceCategory());

        ticketRepository.save(ticket);
    }
}
