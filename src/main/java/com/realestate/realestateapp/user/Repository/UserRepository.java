package com.realestate.realestateapp.user.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.realestate.realestateapp.user.Entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
