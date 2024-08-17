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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.UserDTO;
import com.app.dtos.UserLoginDTO;
import com.app.entites.Address;
import com.app.entites.Cart;
import com.app.entites.User;
import com.app.repository.UserRepo;
import com.app.response.ApiResponse;
import com.app.service.AddressService;
import com.app.service.CartService;
import com.app.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private AddressService addService;

	@Autowired
	private CartService cartService;
	
	@Autowired 
	private UserRepo userRepo;
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping
	private ResponseEntity<ApiResponse> addUser(@RequestBody UserDTO userDTO) {
		User user = convertToEntity(userDTO);
		Cart cart = new Cart();
		user.setCart(cart);
		ApiResponse res = userService.addUser(user);
		cart.setUser(user);
		cartService.addCart(cart);
		return ResponseEntity.ok(res);
	}
	@GetMapping("/{id}")
	private ResponseEntity<UserDTO> getUser(@PathVariable Long id){
		UserDTO dto = mapper.map(userService.getById(id), UserDTO.class);
		return  ResponseEntity.ok(dto);
	}
	@PostMapping("/login")
	private ResponseEntity<UserDTO> getUserById(@RequestBody UserLoginDTO userlogin){
		System.out.println(userlogin.getUsername());
		System.out.println(userlogin.getPassword());
		UserDTO dto = userService.getUser(userlogin.getUsername(),userlogin.getPassword());
		return  ResponseEntity.ok(dto);
	}
	@GetMapping
	private ResponseEntity<?> getUsers(){
		List<User> list = userService.getUsers();
		List<UserDTO> dtos = list.stream().map(l->mapper.map(l, UserDTO.class)).collect(Collectors.toList());
		return ResponseEntity.ok(dtos);
	}

	@DeleteMapping("/{uid}")
	private ResponseEntity<ApiResponse> delUser(@PathVariable Long uid) {
		ApiResponse api =  userService.delUser(uid);
		return ResponseEntity.ok(api);
		
	}
	
	@PostMapping("/update")
	private ResponseEntity<ApiResponse> updateUser(@RequestBody UserDTO dto) {
		System.out.println("----------------------");
		ApiResponse api =  userService.updateUser(dto);
		return ResponseEntity.ok(api);
		
	}
	
	private User convertToEntity(UserDTO userDTO) {
		User user = new User();
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setEmail(userDTO.getEmail());
		user.setMobileNumber(userDTO.getMobileNumber());
		user.setPassword(userDTO.getPassword());
		user.setRole(userDTO.getRole());
		user.setCity(userDTO.getCity());
		user.setState(userDTO.getState());
		user.setCountry(userDTO.getCountry());
		
//		if (userDTO.getAddress() != null) {
//			Address address = new Address();
//			address.setStreet(userDTO.getAddress().getStreet());
//			address.setBuildingName(userDTO.getAddress().getBuildingName());
//			address.setCity(userDTO.getAddress().getCity());
//			address.setState(userDTO.getAddress().getState());
//			address.setPincode(userDTO.getAddress().getPincode());
//			address.setCountry(userDTO.getAddress().getCountry());
//			user.setAddress(address);
//			addService.saveAdd(address);
//		}
		return user;
	}

}