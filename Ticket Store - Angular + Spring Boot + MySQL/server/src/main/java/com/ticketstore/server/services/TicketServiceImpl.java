package com.ticketstore.server.services;

import com.ticketstore.server.entities.Ticket;
import com.ticketstore.server.models.Ticket.binding.TicketAddModel;
import com.ticketstore.server.models.Ticket.binding.TicketEditModel;
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
        ticket.setCount(ticketModel.getTicketsCount());
        ticket.setPrice(ticketModel.getPrice());
        ticket.setPriceCategory(ticketModel.getPriceCategory());
        ticket.setEventId(ticketModel.getEventId());

        ticketRepository.save(ticket);
    }

    @Override
    public void deleteTicket(Long ticketId) {

        ticketRepository.deleteById(ticketId);
    }

    @Override
    public TicketEditModel getTicketById(Long ticketId) {

        Ticket ticket = ticketRepository.getOne(ticketId);
        TicketEditModel ticketEditModel = new TicketEditModel();

        ticketEditModel.setId(ticket.getId());
        ticketEditModel.setPrice(ticket.getPrice());
        ticketEditModel.setPriceCategory(ticket.getPriceCategory());
        ticketEditModel.setTicketsCount(ticket.getCount());

        return ticketEditModel;
    }

    @Override
    public void editTicket(TicketEditModel ticketModel) {

        Ticket ticket = ticketRepository.getOne(ticketModel.getId());

        ticket.setPrice(ticketModel.getPrice());
        ticket.setPriceCategory(ticketModel.getPriceCategory());
        ticket.setCount(ticketModel.getTicketsCount());

        ticketRepository.save(ticket);
    }

}
