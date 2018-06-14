package com.ticketstore.server.services;

import com.ticketstore.server.entities.Category;
import com.ticketstore.server.entities.Event;
import com.ticketstore.server.models.Category.view.CategoryViewModel;
import com.ticketstore.server.models.Event.binding.EventAddModel;
import com.ticketstore.server.models.Event.view.EventViewModel;
import com.ticketstore.server.repositories.CategoryRepository;
import com.ticketstore.server.repositories.EventRepository;
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

    @Autowired
    public EventServiceImpl(EventRepository eventRepository, CategoryRepository categoryRepository) {
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<EventViewModel> getAllEvents() {

        List<Event> events = eventRepository.findAll();
        List<EventViewModel> eventModels = new ArrayList<>(events.size());
        EventViewModel model;

        for (Event event : events) {

            model = new EventViewModel();
            model.setId(event.getId());
            model.setTitle(event.getTitle());
            model.setLocation(event.getLocation());
            model.setDescription(event.getDescription());

            CategoryViewModel categoryModel = convertCategoryEntityToModel(event.getCategory());
            model.setCategory(categoryModel);

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

    private CategoryViewModel convertCategoryEntityToModel(Category category) {

        CategoryViewModel categoryViewModel = new CategoryViewModel();
        categoryViewModel.setId(category.getId());
        categoryViewModel.setName(category.getName());

        return categoryViewModel;
    }
}
