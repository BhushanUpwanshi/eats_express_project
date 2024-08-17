package com.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
	
	private Long cartItemId;
//	private CartDTO cart;
	private productDTO2 product;
	private Integer quantity;
	private double productPrice;
}
