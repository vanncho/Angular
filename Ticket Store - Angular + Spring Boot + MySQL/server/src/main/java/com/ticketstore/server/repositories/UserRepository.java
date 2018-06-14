package com.ticketstore.server.repositories;

import com.ticketstore.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByUsername(String username);

    @Query(value = "SELECT COUNT(1) FROM users", nativeQuery = true)
    int getUsersCount();

    @Query(value = "SELECT u FROM User AS u ORDER BY u.username")
    List<User> getAllOrderByUsername();

    @Query(value = "SELECT u FROM User AS u JOIN u.authorities AS r WHERE r.authority = :role ORDER BY u.username")
    List<User> getAllUsersWithGivenRole(@Param("role") String role);

    List<User> getAllByUsernameIsStartingWithOrderByUsername(@Param("username") String username);
}
