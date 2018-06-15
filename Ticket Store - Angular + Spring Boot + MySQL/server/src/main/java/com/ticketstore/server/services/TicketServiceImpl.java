package com.ticketstore.server.services;

import com.ticketstore.server.entities.Ticket;
import com.ticketstore.server.models.Ticket.binding.TicketAddModel;
import com.ticketstore.server.models.Ticket.view.TicketListModel;
import com.ticketstore.server.repositories.TicketRepository;
import com.ticketstore.server.services.interfaces.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public List<TicketListModel> getAllTicketsForEvent(Long eventId) {

        List<Ticket> tickets = ticketRepository.getAllTicketsForEvent(eventId);
        List<TicketListModel> ticketModels = new ArrayList<>(tickets.size());
        TicketListModel ticketListModel;

        for (Ticket ticket : tickets) {

            ticketListModel = new TicketListModel();
            ticketListModel.setId(ticket.getId());
            ticketListModel.setPrice(ticket.getPrice());
            ticketListModel.setTicketsCount(ticket.getCount());
            ticketListModel.setPriceCategory(ticket.getPriceCategory());
            ticketListModel.setEventId(ticket.getEventId());

            ticketModels.add(ticketListModel);
        }

        return ticketModels;
    }
}
