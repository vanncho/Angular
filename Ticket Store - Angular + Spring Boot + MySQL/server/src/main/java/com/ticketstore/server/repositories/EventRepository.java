package com.ticketstore.server.repositories;

import com.ticketstore.server.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> getAllByTitleIsStartingWithOrderByTitle(@Param("eventTitle") String eventTitle);
}
