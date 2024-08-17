package com.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
	private Long orderItemId;
	private productDTO2 product;
	private Integer quantity;
	
	private double orderedProductPrice;

}
