package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
		try {
		Category cat = modelMapper.map(catDTO, Category.class);
		return ResponseEntity.ok(catService.addCat(cat));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping
	private ResponseEntity<?> getCat() { 
		try {
		List<Category> list = catService.getCat();
		List<CatDTO> collect = list.stream().map(category -> modelMapper.map(category, CatDTO.class)).collect(Collectors.toList());	
		return ResponseEntity.ok(collect) ;
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/{catid}")
	private ResponseEntity<?> getCatById(@PathVariable Long catid){
		try {
		Category cat = catService.getById(catid);
		CatDTO dto = modelMapper.map(cat, CatDTO.class); 
		return ResponseEntity.ok(dto);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@DeleteMapping("/{cid}")
	private ResponseEntity<?> delCat(@PathVariable Long cid){
		try {
		return ResponseEntity.ok(catService.delCat(cid));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
}
