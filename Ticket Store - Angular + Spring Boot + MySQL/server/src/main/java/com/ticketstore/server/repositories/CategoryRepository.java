package com.ticketstore.server.repositories;

import com.ticketstore.server.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> getAllByNameIsStartingWith(@Param("categoryName") String categoryName);
}
