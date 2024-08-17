package com.app.service;

import java.util.List;

import com.app.dtos.OrderDTO;
import com.app.entites.Order;
import com.app.response.ApiResponse;

public interface OrderService {

	OrderDTO placeOrder(String emailId, Long cartId, String paymentMethod);
	
	List<OrderDTO> getAllOrders();
//	ApiResponse placeOrder(String emailId, Double total, String status);

}
