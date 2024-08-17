package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Payment;

public interface PaymentRepo extends JpaRepository<Payment, Long> {

}
