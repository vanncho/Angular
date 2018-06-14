package com.ticketstore.server.controllers;

import com.ticketstore.server.models.Category.binding.CategoryAddModel;
import com.ticketstore.server.models.Category.binding.CategoryEditModel;
import com.ticketstore.server.models.Category.view.CategoryViewModel;
import com.ticketstore.server.models.Ticket.TicketAddModel;
import com.ticketstore.server.services.interfaces.CategoryService;
import com.ticketstore.server.services.interfaces.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

//    @GetMapping("/allCategories")
//    public ResponseEntity<List<CategoryViewModel>> getCategories() {
//
//        List<CategoryViewModel> categories = categoryService.getAllCategories();
//
//        return new ResponseEntity<>(categories, HttpStatus.OK);
//    }

    @PostMapping("addTicket")
    public ResponseEntity addTicket(@RequestBody TicketAddModel ticketModel) {

        ticketService.addTicket(ticketModel);

        return new ResponseEntity(HttpStatus.OK);
    }

//    @GetMapping("getCategory/{categoryId}")
//    public ResponseEntity<CategoryViewModel> getCategoryById(@PathVariable Long categoryId) {
//
//        CategoryViewModel category = categoryService.getCategoryById(categoryId);
//
//        return new ResponseEntity<>(category, HttpStatus.OK);
//    }
//
//    @PostMapping("editCategory")
//    public ResponseEntity addCategory(@RequestBody CategoryEditModel categoryModel) {
//
//        categoryService.editCategory(categoryModel);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @DeleteMapping("deleteCategory/{categoryId}")
//    public ResponseEntity deleteCategory(@PathVariable Long categoryId) {
//
//        categoryService.deleteCategory(categoryId);
//
//        return new ResponseEntity(HttpStatus.OK);
//
//    }

}
