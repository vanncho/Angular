package com.gamestore.repositories;

import com.gamestore.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query(value = "SELECT c FROM Cart AS c WHERE user_id = :userId")
    Cart getCartByUserId(@Param("userId") Long userId);
}
