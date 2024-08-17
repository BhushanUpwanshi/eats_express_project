package com.app.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class productDTO2 {
	@JsonProperty(access = Access.READ_ONLY)
	private Long productId;

	private String productName;
	private String vendorName;
	private String description;
	private String imgUrl;

	private Integer quantity;

	private double price;

}
