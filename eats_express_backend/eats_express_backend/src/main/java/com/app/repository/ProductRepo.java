package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

	Product findProductsByProductName(String bname);

}
