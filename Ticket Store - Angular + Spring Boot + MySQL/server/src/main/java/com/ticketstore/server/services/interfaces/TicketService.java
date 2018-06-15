package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Ticket.binding.TicketAddModel;
import com.ticketstore.server.models.Ticket.view.TicketListModel;

import java.util.List;

public interface TicketService {

    void addTicket(TicketAddModel ticketModel);

    void deleteTicket(Long ticketId);

    List<TicketListModel> getAllTicketsForEvent(Long eventId);
}
