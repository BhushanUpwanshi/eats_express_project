package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Product;
import com.app.entites.Cart;
import com.app.entites.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long>{

	CartItem findCartItemByCart(Long cartId);
//	CartItem findCartItemByBookIdAndCart( Long bookId,Long cartId);


	CartItem findByProductAndCart(Product product, Cart cart);


	void deleteCartItemByProductAndCart(Product product, Cart cart);


//	CartItem findCartItemByCart(Cart cart);


	CartItem findCartItemByCartAndProduct (Cart cart, Product product);


//	CartItem findByIdAndBook (Long cartItemId, Books book);
	
	CartItem findByCartItemIdAndProduct(Long cartItemId, Product book);


	CartItem findByProduct (Product book);



	
	

	
}
