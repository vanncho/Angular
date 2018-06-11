package com.ticketstore.server.services;

import com.ticketstore.server.entities.Category;
import com.ticketstore.server.models.Category.binding.CategoryAddModel;
import com.ticketstore.server.models.Category.binding.CategoryEditModel;
import com.ticketstore.server.models.Category.view.CategoryViewModel;
import com.ticketstore.server.repositories.CategoryRepository;
import com.ticketstore.server.services.interfaces.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void addCategory(CategoryAddModel categoryModel) {

        Category category = new Category(categoryModel.getName());

        categoryRepository.save(category);
    }

    @Override
    public List<CategoryViewModel> getAllCategories() {

        List<Category> categories = categoryRepository.findAll();
        List<CategoryViewModel> categoryModels = new ArrayList<>(categories.size());
        CategoryViewModel viewModel;

        for(Category category : categories) {

            viewModel = convertCategoryEntityToModel(category);

            categoryModels.add(viewModel);
        }

        return categoryModels;
    }

    @Override
    public CategoryViewModel getCategoryById(Long categoryId) {

        Category category = this.categoryRepository.getOne(categoryId);

        if (category == null) {
            // TODO: category exception handle
        }

        CategoryViewModel categoryViewModel = new CategoryViewModel();
        categoryViewModel.setId(category.getId());
        categoryViewModel.setName(category.getName());

        return categoryViewModel;
    }

    @Override
    public void editCategory(CategoryEditModel categoryModel) {

        Category category = categoryRepository.getOne(categoryModel.getId());
        category.setName(categoryModel.getName());

        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long categoryId) {

        categoryRepository.deleteById(categoryId);
    }

    @Override
    public List<CategoryViewModel> searchCategoryByName(String categoryName) {

        List<Category> categories = categoryRepository.getAllByNameIsStartingWith(categoryName);
        List<CategoryViewModel> categoryModels = new ArrayList<>(categories.size());
        CategoryViewModel categoryViewModel;

        for (Category category : categories) {

            categoryViewModel = convertCategoryEntityToModel(category);

            categoryModels.add(categoryViewModel);
        }

        return categoryModels;
    }

    private CategoryViewModel convertCategoryEntityToModel(Category category) {

        CategoryViewModel categoryViewModel = new CategoryViewModel();
        categoryViewModel.setId(category.getId());
        categoryViewModel.setName(category.getName());

        return categoryViewModel;
    }
}
