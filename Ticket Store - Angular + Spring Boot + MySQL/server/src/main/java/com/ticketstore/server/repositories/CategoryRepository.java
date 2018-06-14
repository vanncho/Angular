package com.ticketstore.server.repositories;

import com.ticketstore.server.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT c FROM Category AS c ORDER BY c.name")
    List<Category> getAllOrderedByName();

    List<Category> getAllByNameIsStartingWithOrderByName(@Param("categoryName") String categoryName);
}
