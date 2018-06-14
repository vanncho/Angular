package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Ticket.TicketAddModel;

public interface TicketService {

    void addTicket(TicketAddModel ticketModel);

}
