package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Event.binding.EventAddModel;
import com.ticketstore.server.models.Event.binding.EventEditModel;
import com.ticketstore.server.models.Event.view.EventViewModel;

import java.util.List;

public interface EventService {

    List<EventViewModel> getAllEvents();

    void addEvent(EventAddModel eventModel);

    void deleteEvent(Long eventId);

    EventEditModel getEventById(Long eventId);

    void editEvent(EventEditModel event);

    List<EventViewModel> searchEventByName(String eventName);
}
