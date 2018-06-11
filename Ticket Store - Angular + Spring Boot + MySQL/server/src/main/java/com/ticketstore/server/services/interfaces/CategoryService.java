package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Category.binding.CategoryAddModel;
import com.ticketstore.server.models.Category.binding.CategoryEditModel;
import com.ticketstore.server.models.Category.view.CategoryViewModel;

import java.util.List;

public interface CategoryService {

    void addCategory(CategoryAddModel categoryModel);

    List<CategoryViewModel> getAllCategories();

    CategoryViewModel getCategoryById(Long categoryId);

    void editCategory(CategoryEditModel categoryModel);

    void deleteCategory(Long categoryId);

    List<CategoryViewModel> searchCategoryByName(String categoryName);
}
