package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.CatDTO;
import com.app.entites.Category;
import com.app.response.ApiResponse;
import com.app.service.CatService;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private CatService catService;
	@Autowired
	private ModelMapper modelMapper;
	
	@PostMapping
	private ResponseEntity<?> addCat(@RequestBody CatDTO catDTO) {
		Category cat = modelMapper.map(catDTO, Category.class);
		return ResponseEntity.ok(catService.addCat(cat));
	}
	@GetMapping
	private ResponseEntity<?> getCat() { 
		List<Category> list = catService.getCat();
		List<CatDTO> collect = list.stream().map(category -> modelMapper.map(category, CatDTO.class)).collect(Collectors.toList());	
		return ResponseEntity.ok(collect) ;
	}
	@GetMapping("/{catid}")
	private ResponseEntity<CatDTO> getCatById(@PathVariable Long catid){
		Category cat = catService.getById(catid);
		CatDTO dto = modelMapper.map(cat, CatDTO.class); 
		return ResponseEntity.ok(dto);
	}
	@DeleteMapping("/{cid}")
	private ResponseEntity<ApiResponse> delCat(@PathVariable Long cid){
		return ResponseEntity.ok(catService.delCat(cid));
	}
	
	
}
