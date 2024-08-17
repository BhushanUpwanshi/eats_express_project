package com.app.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class CatDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long categoryId;
	private String categoryName;
}
