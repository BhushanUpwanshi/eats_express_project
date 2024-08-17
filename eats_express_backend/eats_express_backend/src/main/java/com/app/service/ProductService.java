package com.app.service;

import java.util.List;

import com.app.entites.Product;
import com.app.response.ApiResponse;

public interface ProductService {

	ApiResponse addProduct(Product Product);

	List<Product> getProducts();

	ApiResponse delProduct(Long bid);

	Product getProduct(Long bid);

	ApiResponse addToFav(Long bid, Long uid);

	Product getProductName(String bname);
	
}
