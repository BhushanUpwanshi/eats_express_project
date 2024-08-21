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

import com.app.dtos.CategoryIdDto;
import com.app.dtos.ProductDTO;
import com.app.dtos.UserIdDto;
import com.app.dtos.productDTO2;
import com.app.entites.Category;
import com.app.entites.FavouriteProducts;
import com.app.entites.Product;
import com.app.entites.User;
import com.app.repository.FavRepo;
import com.app.response.ApiResponse;
import com.app.service.CatService;
import com.app.service.FavService;
import com.app.service.ProductService;
import com.app.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService ProductService;
	@Autowired
	private CatService catService;
	@Autowired
	private FavRepo favRepo;
	@Autowired
	private FavService favServ;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private UserService userService;

	@PostMapping("/add")
	private ResponseEntity<?> addProduct(@RequestBody ProductDTO ProductDto) {
		try {
		Product Product = mapToEntity(ProductDto);
		return ResponseEntity.ok(ProductService.addProduct(Product));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping
	private ResponseEntity<?> getProducts() {
		try {
		List<Product> list2 = ProductService.getProducts();
		List<ProductDTO> list = list2.stream().map(this::convertToDTO).collect(Collectors.toList());
		return ResponseEntity.ok(list);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/getfavs/{userId}")
	public ResponseEntity<?> getFavoriteProductsByUser(@PathVariable Long userId) {
		try {
		List<Product> list2 = favServ.getFavoriteProductsByUser(userId);
		List<ProductDTO> list = list2.stream().map(this::convertToDTO).collect(Collectors.toList());
		return ResponseEntity.ok(list);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/{pid}")
	private ResponseEntity<?> getProduct(@PathVariable Long pid) {
		try {
		Product Product1 = ProductService.getProduct(pid);
		productDTO2 Product = mapper.map(Product1, productDTO2.class);
		return ResponseEntity.ok(Product);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/productname/{productName}")
	private ResponseEntity<?> getProduct(@PathVariable String productName) {
		try {
		System.out.println("--------------product by name------------"+productName);
		Product Product1 = ProductService.getProductName(productName);
		productDTO2 Product = mapper.map(Product1, productDTO2.class);
		return ResponseEntity.ok(Product);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/addtofav/{pid}/{uid}")
	private ResponseEntity<ApiResponse> addProduct(@PathVariable Long pid,@PathVariable Long uid) {
		try {
		ApiResponse api = ProductService.addToFav(pid, uid);
		return ResponseEntity.ok(api);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	

	@DeleteMapping("/delfav/{pid}/{uid}")
	public ResponseEntity<?>  removeFavorite(@PathVariable Long uid, @PathVariable Long pid) {
		try {
		FavouriteProducts favoriteProduct = favRepo.findAll().stream()
				.filter(fp -> fp.getUser().getUserId().equals(uid) && fp.getProduct().getProductId().equals(pid))
				.findFirst().orElseThrow(() -> new RuntimeException("Favorite not found"));
		favRepo.delete(favoriteProduct);
		return ResponseEntity.ok("product removed from favourite");
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/{pid}")
	private ResponseEntity<?> delProduct(@PathVariable Long pid) {
		try {
		return ResponseEntity.ok(ProductService.delProduct(pid));
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	private Product mapToEntity(ProductDTO ProductDto) {

		Product Product = new Product();
		Product.setProductName(ProductDto.getProductName());
		Product.setDescription(ProductDto.getDescription());
		Product.setQuantity(ProductDto.getQuantity());
		Product.setPrice(ProductDto.getPrice());
		Product.setImgUrl(ProductDto.getImgUrl());
		Product.setVendorName(ProductDto.getVendorName());

		User user = userService.getById(ProductDto.getAdminId().getUserId());
		Category cat = catService.getById(ProductDto.getCategoryId().getCateId());
		Product.setAddedBy(user);
		Product.setCategory(cat);
		return Product;
	}

	private ProductDTO convertToDTO(Product Product) {

		ProductDTO dto = new ProductDTO();
		dto.setProductId(Product.getProductId());
		dto.setProductName(Product.getProductName());
		dto.setDescription(Product.getDescription());
		dto.setVendorName(Product.getVendorName());
		dto.setQuantity(Product.getQuantity());
		dto.setPrice(Product.getPrice());
		dto.setImgUrl(Product.getImgUrl());
		dto.setAdminId(new UserIdDto(Product.getAddedBy().getUserId()));
		dto.setCategoryId(new CategoryIdDto(Product.getCategory().getCategoryId()));

		return dto;
	}

}
