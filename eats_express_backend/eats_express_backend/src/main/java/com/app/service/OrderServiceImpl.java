package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dtos.OrderDTO;
import com.app.dtos.OrderItemDTO;
import com.app.entites.Product;
import com.app.entites.Cart;
import com.app.entites.CartItem;
import com.app.entites.Order;
import com.app.entites.OrderItem;
import com.app.entites.Payment;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.CartItemRepo;
import com.app.repository.CartRepo;
import com.app.repository.OrderItemRepo;
import com.app.repository.OrderRepo;
import com.app.repository.PaymentRepo;
import com.app.repository.UserRepo;
import com.app.response.ApiResponse;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired
	public UserRepo userRepo;

	@Autowired
	public CartRepo cartRepo;

	@Autowired
	public OrderRepo orderRepo;

	@Autowired
	private PaymentRepo paymentRepo;

	@Autowired
	public OrderItemRepo orderItemRepo;

	@Autowired
	public CartItemRepo cartItemRepo;

	@Autowired
	public UserService userService;

	@Autowired
	public CartService cartService;

	@Autowired
	public ModelMapper modelMapper;
	
	@Override
	public List<OrderDTO> getAllOrders() {
		return orderRepo.findAll().stream()
				.map(order->modelMapper.map(order, OrderDTO.class))
				.collect(Collectors.toList());
	}	
	
	@Override
	public OrderDTO placeOrder(String emailId, Long cartId, String paymentMethod) {
		
			Cart cart = cartRepo.findById(cartId).get();
			if (cart == null) {
				System.out.println("----------cat null-----------");
				throw new ResourceNotFoundException("Cart", "cartId", cartId);
			}
			
			Order order = new Order();

			order.setEmail(emailId);
			order.setOrderDate(LocalDate.now());
			order.setTotalAmount(cart.getTotalPrice());
			
			Payment payment = new Payment();
			payment.setOrder(order);
			payment.setPaymentMethod(paymentMethod);		
			payment= paymentRepo.save(payment);
			System.out.println("----------payment saved-----------");
			
			order.setPayment(payment);
			Order savedOrder = orderRepo.save(order);
//			return modelMapper.map(savedOrder, OrderDTO.class);
			List<CartItem> cartItems = cart.getCartItems();
			
			if (cartItems.size() == 0) {
				System.out.println("----------cat Items 0-----------");
				throw new APIException("Cart is empty");
			}

			List<OrderItem> orderItems = new ArrayList<>();

			for (CartItem cartItem : cartItems) {
				System.out.println("----------for each cart Item-----------");
				OrderItem orderItem = new OrderItem();

				orderItem.setProduct(cartItem.getProduct());
				orderItem.setQuantity(cartItem.getQuantity());

				orderItem.setProductPrice(cartItem.getProductPrice());
				orderItem.setOrder(savedOrder);

				orderItems.add(orderItem);
			}
			System.out.println("--------------outsde carts for------------");
//			orderItems = orderItemRepo.saveAllAndFlush(orderItems);
			
			for(OrderItem o:orderItems) {
				orderItemRepo.save(o);
				
				System.out.println("-------------orderItems for----------");
			}
			for(CartItem c: cartItems) {
				System.out.println(c.getCartItemId());
				cartItemRepo.deleteById(c.getCartItemId());
				System.out.println("-------------cartItems for----------");
			}
			return modelMapper.map(savedOrder, OrderDTO.class);
//			System.out.println("-----------------------------------------");
//			cart.getCartItems().forEach(item -> {
//				int quantity = item.getQuantity();
//				Product product = item.getProduct();
//				System.out.println("--------------product before deliting from cart ----------------");
//				cartService.deleteProductFromCart(cartId, item.getProduct().getProductId());
//				System.out.println("--------------product after deliting ----------------");
//				product.setQuantity(product.getQuantity() - quantity);
//				System.out.println("--------------product after setQuantity ----------------");
//			});
//			System.out.println("---------------------before orderDTO-------------------");
//			OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
//			System.out.println(orderDTO);
//			System.out.println("=========================================");
//			orderItems.forEach(item -> orderDTO.getOrderItems().add(modelMapper.map(item, OrderItemDTO.class)));
//			return orderDTO;
		}




	
	}

