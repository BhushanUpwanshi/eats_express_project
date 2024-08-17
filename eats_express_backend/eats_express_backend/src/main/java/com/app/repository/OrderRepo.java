package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

}
