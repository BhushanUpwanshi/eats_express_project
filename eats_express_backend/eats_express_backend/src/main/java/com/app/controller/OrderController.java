package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.OrderDTO;
import com.app.response.ApiResponse;
import com.app.service.OrderService;

@CrossOrigin
@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	public OrderService orderService;
	
	@GetMapping
	public ResponseEntity<?> getAllOrders(){
		try {
		return ResponseEntity.ok(orderService.getAllOrders());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/users/{emailId}/carts/{cartId}/payments/{paymentMethod}")
	public ResponseEntity<?> orderProducts(@PathVariable String emailId, @PathVariable Long cartId, @PathVariable String paymentMethod) {
		try {
		OrderDTO order = orderService.placeOrder(emailId, cartId, paymentMethod);
		
		return new ResponseEntity<OrderDTO>(order, HttpStatus.CREATED);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

//	@GetMapping("/admin/orders")
//	public ResponseEntity<OrderResponse> getAllOrders(
//			@RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
//			@RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
//			@RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_ORDERS_BY, required = false) String sortBy,
//			@RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
//		
//		OrderResponse orderResponse = orderService.getAllOrders(pageNumber, pageSize, sortBy, sortOrder);
//
//		return new ResponseEntity<OrderResponse>(orderResponse, HttpStatus.FOUND);
//	}
//	
//	@GetMapping("public/users/{emailId}/orders")
//	public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable String emailId) {
//		List<OrderDTO> orders = orderService.getOrdersByUser(emailId);
//		
//		return new ResponseEntity<List<OrderDTO>>(orders, HttpStatus.FOUND);
//	}
//	
//	@GetMapping("public/users/{emailId}/orders/{orderId}")
//	public ResponseEntity<OrderDTO> getOrderByUser(@PathVariable String emailId, @PathVariable Long orderId) {
//		OrderDTO order = orderService.getOrder(emailId, orderId);
//		
//		return new ResponseEntity<OrderDTO>(order, HttpStatus.FOUND);
//	}
//	
//	@PutMapping("admin/users/{emailId}/orders/{orderId}/orderStatus/{orderStatus}")
//	public ResponseEntity<OrderDTO> updateOrderByUser(@PathVariable String emailId, @PathVariable Long orderId, @PathVariable String orderStatus) {
//		OrderDTO order = orderService.updateOrder(emailId, orderId, orderStatus);
//		
//		return new ResponseEntity<OrderDTO>(order, HttpStatus.OK);
//	}

}
