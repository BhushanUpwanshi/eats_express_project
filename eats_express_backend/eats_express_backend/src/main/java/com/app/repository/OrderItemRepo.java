package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {

}
