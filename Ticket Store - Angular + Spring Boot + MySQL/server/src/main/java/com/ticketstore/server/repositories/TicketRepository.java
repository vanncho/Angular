package com.ticketstore.server.repositories;

import com.ticketstore.server.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query(value = "SELECT t FROM Ticket AS t WHERE t.eventId = :eventId")
    List<Ticket> getAllTicketsForEvent(@Param("eventId") Long eventId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Ticket AS t WHERE t.eventId = :eventId")
    void deleteAllTicketsForEvent(@Param("eventId") Long eventId);
}
