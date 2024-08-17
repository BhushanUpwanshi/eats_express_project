package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Cart;
import com.app.entites.User;

public interface CartRepo extends JpaRepository<Cart, Long> {

	Cart findByUser(User user);



}
