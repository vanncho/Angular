package com.ticketstore.server.models.Event.view;

import com.ticketstore.server.models.Category.view.CategoryViewModel;
import com.ticketstore.server.models.Ticket.view.TicketListModel;

import java.util.ArrayList;
import java.util.List;

public class EventViewModel {

    private Long id;

    private String title;

    private String location;

    private String description;

    private CategoryViewModel category;

    private List<TicketListModel> tickets;

    public EventViewModel() {
        this.tickets = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CategoryViewModel getCategory() {
        return category;
    }

    public void setCategory(CategoryViewModel category) {
        this.category = category;
    }

    public List<TicketListModel> getTickets() {
        return tickets;
    }

    public void setTickets(List<TicketListModel> tickets) {
        this.tickets = tickets;
    }
}
