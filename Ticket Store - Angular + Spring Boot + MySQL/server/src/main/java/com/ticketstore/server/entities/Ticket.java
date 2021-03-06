package com.ticketstore.server.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tickets")
public class Ticket implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double price;

    private Integer count;

    private String priceCategory;

    private Long eventId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getPriceCategory() {
        return priceCategory;
    }

    public void setPriceCategory(String priceCategory) {
        this.priceCategory = priceCategory;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}
