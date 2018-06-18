package com.ticketstore.server.services;

import com.ticketstore.server.entities.Category;
import com.ticketstore.server.entities.Event;
import com.ticketstore.server.entities.Ticket;
import com.ticketstore.server.models.Category.view.CategoryViewModel;
import com.ticketstore.server.models.Event.binding.EventAddModel;
import com.ticketstore.server.models.Event.binding.EventEditModel;
import com.ticketstore.server.models.Event.view.EventViewModel;
import com.ticketstore.server.models.Ticket.view.TicketListModel;
import com.ticketstore.server.repositories.CategoryRepository;
import com.ticketstore.server.repositories.EventRepository;
import com.ticketstore.server.repositories.TicketRepository;
import com.ticketstore.server.services.interfaces.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    private final CategoryRepository categoryRepository;

    private final TicketRepository ticketRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, CategoryRepository categoryRepository, TicketRepository ticketRepository) {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public List<EventViewModel> getAllEvents() {

        List<Event> events = eventRepository.findAll();
        List<EventViewModel> eventModels = new ArrayList<>(events.size());
        EventViewModel model;

        for (Event event : events) {

            model = convertEventEntityToModel(event);

            eventModels.add(model);
        }

        return eventModels;
    }

    @Override
    public void addEvent(EventAddModel eventModel) {

        Event event = new Event();
        event.setTitle(eventModel.getTitle());
        event.setUrl(eventModel.getUrl());
        event.setLocation(eventModel.getLocation());

        LocalDate date = LocalDate.parse(eventModel.getDate());
        event.setDate(date);

        LocalTime time = LocalTime.parse(eventModel.getTime());
        event.setTime(time);

        event.setTown(eventModel.getTown());
        event.setDescription(eventModel.getDescription());

        Category category = categoryRepository.getOne(eventModel.getCategoryId());
        event.setCategory(category);

        eventRepository.save(event);
    }

    @Override
    public void deleteEvent(Long eventId) {

        eventRepository.deleteById(eventId);

        ticketRepository.deleteAllTicketsForEvent(eventId);
    }

    @Override
    public EventEditModel getEventById(Long eventId) {

        Event event = eventRepository.getOne(eventId);
        EventEditModel viewModel = new EventEditModel();

        viewModel.setId(event.getId());
        viewModel.setCategoryId(event.getCategory().getId());
        viewModel.setDate(event.getDate().toString());
        viewModel.setTime(event.getTime().toString());
        viewModel.setDescription(event.getDescription());
        viewModel.setLocation(event.getLocation());
        viewModel.setTitle(event.getTitle());
        viewModel.setTown(event.getTown());
        viewModel.setUrl(event.getUrl());

        return viewModel;
    }

    @Override
    public void editEvent(EventEditModel eventModel) {

        Event event = eventRepository.getOne(eventModel.getId());

        Category category = categoryRepository.getOne(eventModel.getCategoryId());
        event.setCategory(category);

        event.setDescription(eventModel.getDescription());
        event.setTown(eventModel.getTown());

        LocalDate date = LocalDate.parse(eventModel.getDate());
        event.setDate(date);

        LocalTime time = LocalTime.parse(eventModel.getTime());
        event.setTime(time);

        event.setLocation(eventModel.getLocation());
        event.setUrl(eventModel.getUrl());
        event.setTitle(eventModel.getTitle());
        event.setTown(eventModel.getTown());

        eventRepository.save(event);
    }

    @Override
    public List<EventViewModel> searchEventByName(String eventTitle) {

        List<Event> events = eventRepository.getAllByTitleIsStartingWithOrderByTitle(eventTitle);
        List<EventViewModel> eventModels = new ArrayList<>(events.size());
        EventViewModel model;

        for (Event event : events) {

            model = convertEventEntityToModel(event);

            eventModels.add(model);
        }

        return eventModels;
    }

    private EventViewModel convertEventEntityToModel(Event event) {

        EventViewModel model = new EventViewModel();
        List<TicketListModel> ticketModels;

        model.setId(event.getId());
        model.setTitle(event.getTitle());
        model.setLocation(event.getLocation());
        model.setDescription(event.getDescription());

        CategoryViewModel categoryModel = convertCategoryEntityToModel(event.getCategory());
        model.setCategory(categoryModel);

        ticketModels = getAllTicketsForEvent(event.getId());
        model.setTickets(ticketModels);

        return model;
    }

    private CategoryViewModel convertCategoryEntityToModel(Category category) {

        CategoryViewModel categoryViewModel = new CategoryViewModel();
        categoryViewModel.setId(category.getId());
        categoryViewModel.setName(category.getName());

        return categoryViewModel;
    }

    private List<TicketListModel> getAllTicketsForEvent(Long eventId) {

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
