package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entites.FavouriteProducts;
import com.app.entites.Product;
import com.app.entites.User;
import com.app.repository.FavRepo;
import com.app.repository.ProductRepo;
import com.app.repository.UserRepo;
import com.app.response.ApiResponse;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepo ProductRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private FavRepo favRepo;
	@Override
	public ApiResponse addProduct(Product Product) {
		ProductRepo.save(Product);
		return new ApiResponse("Product Inserted");
	}
	@Override
	public List<Product> getProducts() {
		
		return ProductRepo.findAll();
	}
	@Override
	public ApiResponse delProduct(Long bid) {
		ProductRepo.deleteById(bid);
		return new ApiResponse("Product Deleted");
	}
	@Override
	public Product getProduct(Long bid) {
		Product Product = ProductRepo.findById(bid).get();
		return Product;
	}
	@Override
	public ApiResponse addToFav(Long bid, Long uid) {
		User user = userRepo.findById(uid).orElseThrow(() -> new RuntimeException("User not found"));
        Product Product = ProductRepo.findById(bid).orElseThrow(() -> new RuntimeException("Product not found"));

        FavouriteProducts favoriteProduct = new FavouriteProducts();
        favoriteProduct.setUser(user);
        favoriteProduct.setProduct(Product);
        favRepo.save(favoriteProduct);
    		
		return new ApiResponse("Added to fav");
	}
	@Override
	public Product getProductName(String bname) {
		Product Product = ProductRepo.findProductsByProductName(bname);
		return Product;
	}

}
