package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dtos.productDTO2;
import com.app.dtos.CartDTO;
import com.app.dtos.CartItemDTO;
import com.app.entites.Product;
import com.app.entites.Cart;
import com.app.entites.CartItem;
import com.app.entites.User;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.ProductRepo;
import com.app.repository.CartItemRepo;
import com.app.repository.CartRepo;
import com.app.repository.UserRepo;
import com.app.response.ApiResponse;

@Service
@Transactional
public class CartServiceImpl implements CartService {

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private ProductRepo productRepo;
	@Autowired
	private CartRepo cartRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CartItemRepo cartItemRepo;

	@Override
	public void addCart(Cart cart) {
		cartRepo.save(cart);
	}

	@Override
	public CartDTO addProductToCart(Long cartId, Long productId, Integer quantity) {
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
		System.out.println("------------Product FOund-----------------");

		CartItem cartItem = cartItemRepo.findCartItemByCartAndProduct(cart,product);
		if (cartItem != null) {
//			throw new APIException("Product " + product.getProductName() + " already exists in the cart");

			
			cartItem.setQuantity(cartItem.getQuantity() +quantity);
			

			cartItemRepo.save(cartItem);

			product.setQuantity(product.getQuantity() - quantity);

			cart.setTotalPrice((cart.getTotalPrice() + cartItem.getProductPrice()) * quantity);
			cartRepo.save(cart);

			CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

			List<productDTO2> productDTOs = cart.getCartItems().stream()
					.map(p -> modelMapper.map(p.getProduct(), productDTO2.class)).collect(Collectors.toList());

			cartDTO.setProducts(productDTOs);

			return cartDTO;
			
			
		}else {
			
		

		CartItem newCartItem = new CartItem();
		newCartItem.setCart(cart);
		System.out.println("--------------Cartitem Found-----------------");

		
		if (product.getQuantity() == 0) {
			throw new APIException(product.getProductName() + " is not available");
		}

		if (product.getQuantity() < quantity) {
			throw new APIException("Please, make an order of the " + product.getProductName()
					+ " less than or equal to the quantity " + product.getQuantity() + ".");
		}

//		CartItem newCartItem = new CartItem();

		newCartItem.setProduct(product);
		newCartItem.setCart(cart);
		newCartItem.setQuantity(quantity);
		newCartItem.setProductPrice(product.getPrice());

		cartItemRepo.save(newCartItem);

		product.setQuantity(product.getQuantity() - quantity);

		cart.setTotalPrice((cart.getTotalPrice() + newCartItem.getProductPrice()) * quantity);
		cartRepo.save(cart);

		CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

		List<productDTO2> productDTOs = cart.getCartItems().stream()
				.map(p -> modelMapper.map(p.getProduct(), productDTO2.class)).collect(Collectors.toList());

		cartDTO.setProducts(productDTOs);

		return cartDTO;
		}
	}

	@Override
	public List<CartDTO> getAllCarts() {
		List<Cart> carts = cartRepo.findAll();

		if (carts.size() == 0) {
			throw new APIException("No cart exists");
		}

		List<CartDTO> cartDTOs = carts.stream().map(cart -> {
			CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

			List<productDTO2> products = cart.getCartItems().stream()
					.map(p -> modelMapper.map(p.getProduct(), productDTO2.class)).collect(Collectors.toList());

			cartDTO.setProducts(products);

			return cartDTO;

		}).collect(Collectors.toList());

		return cartDTOs;

	}

	@Override
	public String deleteProductFromCart(Long cartId, Long productId) {
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));
		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Products", "ProductId", productId));
		

		CartItem cartItem = cartItemRepo.findByProductAndCart(product, cart);
		
		
		if (cartItem == null) {
			throw new ResourceNotFoundException("Product", "productId", productId);
		}

		cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity()));

		cartRepo.save(cart);
		Product product1 = cartItem.getProduct();
		product1.setQuantity(product1.getQuantity() + cartItem.getQuantity());
		productRepo.save(product1);
		cartItemRepo.deleteCartItemByProductAndCart(product1,cart);
	

		return "Product " + cartItem.getProduct().getProductName() + " removed from the cart !!!";
	}

	@Override
	public CartDTO getCart(String emailId) {
			
		User user = userRepo.findByEmail(emailId);
		Cart cart = cartRepo.findByUser(user);

		if (cart == null) {
			throw new ResourceNotFoundException("User", "emailId", emailId);
		}

		CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
		
		List<productDTO2> products = cart.getCartItems().stream()
				.map(p -> modelMapper.map(p.getProduct(), productDTO2.class)).collect(Collectors.toList());

		cartDTO.setProducts(products);

		return cartDTO;
	
	}

	@Override
	public CartDTO getCartById(Long cartId) {
		Cart cart = cartRepo.findById(cartId).get();
		CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
		List<productDTO2> products = cart.getCartItems().stream()
				.map(p -> modelMapper.map(p.getProduct(), productDTO2.class)).collect(Collectors.toList());

		cartDTO.setProducts(products);
		return cartDTO;
	}

	@Override
	public List<CartItemDTO> getCartItemsById(Long cartId) {
		Cart cart = cartRepo.findById(cartId).get();
		List<CartItem> list = cart.getCartItems();
		
		List<CartItemDTO> cartItems = list.stream()
				.map(p -> {
					CartItemDTO cdtos = modelMapper.map(p, CartItemDTO.class);
					
					productDTO2 products = modelMapper.map(p.getProduct(), productDTO2.class);

					cdtos.setProduct(products);

					return cdtos;
				
				}).collect(Collectors.toList());

		
		return cartItems;
	}

	@Override
	public ApiResponse updateItems(Long cartItemId, Long productid, Integer quant) {
		Product product = productRepo.findById(productid).get();
		CartItem item = cartItemRepo.findByCartItemIdAndProduct(cartItemId,product);
		item.setQuantity(item.getQuantity()+quant);
		product.setQuantity(product.getQuantity() + quant);
		productRepo.save(product);
		Cart cart = item.getCart();
		cart.setTotalPrice(cart.getTotalPrice() + (product.getPrice()*quant));
		cartRepo.save(cart);
		cartItemRepo.save(item);
		return new ApiResponse("Product Quantity Updated");
	}

	
}
