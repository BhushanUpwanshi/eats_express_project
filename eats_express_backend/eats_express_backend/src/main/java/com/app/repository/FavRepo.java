package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.FavouriteProducts;

public interface FavRepo extends JpaRepository<FavouriteProducts, Long> {

	

}
