package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Event.binding.EventAddModel;
import com.ticketstore.server.models.Event.view.EventViewModel;

import java.util.List;

public interface EventService {

    List<EventViewModel> getAllEvents();

    void addEvent(EventAddModel eventModel);
}
