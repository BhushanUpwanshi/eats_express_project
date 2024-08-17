package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {

}
