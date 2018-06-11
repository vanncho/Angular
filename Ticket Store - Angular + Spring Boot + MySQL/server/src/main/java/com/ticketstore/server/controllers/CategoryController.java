package com.ticketstore.server.controllers;

import com.ticketstore.server.models.Category.binding.CategoryAddModel;
import com.ticketstore.server.models.Category.binding.CategoryEditModel;
import com.ticketstore.server.models.Category.view.CategoryViewModel;
import com.ticketstore.server.services.interfaces.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/allCategories")
    public ResponseEntity<List<CategoryViewModel>> getCategories() {

    List<CategoryViewModel> categories = categoryService.getAllCategories();

    return new ResponseEntity<>(categories, HttpStatus.OK);
}

    @PostMapping("addCategory")
    public ResponseEntity addCategory(@RequestBody CategoryAddModel categoryModel) {

        categoryService.addCategory(categoryModel);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("getCategory/{categoryId}")
    public ResponseEntity<CategoryViewModel> getCategoryById(@PathVariable Long categoryId) {

        CategoryViewModel category = categoryService.getCategoryById(categoryId);

        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("editCategory")
    public ResponseEntity addCategory(@RequestBody CategoryEditModel categoryModel) {

        categoryService.editCategory(categoryModel);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("deleteCategory/{categoryId}")
    public ResponseEntity deleteCategory(@PathVariable Long categoryId) {

        categoryService.deleteCategory(categoryId);

        return new ResponseEntity(HttpStatus.OK);

    }

    @PostMapping("/searchCategory")
    public ResponseEntity<List<CategoryViewModel>> searchCategoryByName(@RequestBody String categoryName) {

        List<CategoryViewModel> categories = categoryService.searchCategoryByName(categoryName);

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
