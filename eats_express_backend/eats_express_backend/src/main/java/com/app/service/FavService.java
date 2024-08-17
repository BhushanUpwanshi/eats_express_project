package com.app.service;

import java.util.List;

import com.app.entites.Product;

public interface FavService {

	List<Product> getFavoriteProductsByUser(Long userId);

}
