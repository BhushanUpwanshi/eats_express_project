package com.app.dtos;

import java.util.Set;

import com.app.entites.Product;
import com.app.entites.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavDto {

	private Long favId;

	private User user;

	private Set<Product> product;

}
