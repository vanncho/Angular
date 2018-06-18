package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Ticket.binding.TicketAddModel;
import com.ticketstore.server.models.Ticket.binding.TicketEditModel;

public interface TicketService {

    void addTicket(TicketAddModel ticketModel);

    void deleteTicket(Long ticketId);

    TicketEditModel getTicketById(Long ticketId);

    void editTicket(TicketEditModel ticketModel);
}
