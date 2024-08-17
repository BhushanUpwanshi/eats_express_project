package com.app.service;

import java.util.List;

import com.app.entites.Category;
import com.app.response.ApiResponse;

public interface CatService {

	ApiResponse addCat(Category cat);
	List<Category> getCat();
	ApiResponse delCat(Long cid);
	Category getById(Long cateId);


}
