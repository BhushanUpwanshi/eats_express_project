package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entites.Category;
import com.app.repository.CatRepo;
import com.app.response.ApiResponse;

@Service
@Transactional
public class CatServiceImpl implements CatService {

	@Autowired
	private CatRepo catRepo;
	@Override
	public ApiResponse addCat(Category cat) {
		catRepo.save(cat);
		return new ApiResponse("Category Inserted");
	}
	@Override
	public List<Category> getCat() {
		
		return catRepo.findAll();
	}
	@Override
	public ApiResponse delCat(Long cid) {
		catRepo.deleteById(cid);
		return new ApiResponse("Category Deleted");
	}
	@Override
	public Category getById(Long cateId) {
		
		return catRepo.findById(cateId).get();
	}
	

}
