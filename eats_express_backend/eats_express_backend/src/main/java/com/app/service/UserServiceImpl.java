package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dtos.UserDTO;
import com.app.entites.User;
import com.app.repository.UserRepo;
import com.app.response.ApiResponse;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	@Autowired
	private ModelMapper modelMapper;
	
	

	@Override
	public ApiResponse addUser(User user) {

		userRepo.save(user);
		return new ApiResponse("User Inserted");
	}

	@Override
	public List<User> getUsers() {
		List<User> list = userRepo.findAll();
		return list;
	}

	@Override
	public ApiResponse delUser(Long uid) {
		userRepo.deleteById(uid);
		return new ApiResponse("User Deleted");
	}

	@Override
	public User getById(Long userId) {
		return  userRepo.findById(userId).get();
	}

	@Override
	public UserDTO getUser(String email, String password) {
		User user = userRepo.findUserByEmailAndPassword(email, password);
		if(user!=null) {
			System.out.println("Success USer");
			
		}
		UserDTO udto = modelMapper.map(user, UserDTO.class);
//		AddressDTO add = modelMapper.map(user.getAddress(), AddressDTO.class);
//		udto.setAddress(add);
		return udto;
	}

	@Override
	public ApiResponse updateUser(UserDTO dto) {
		User user = userRepo.findById(dto.getUserId()).get();
		user.setFirstName(dto.getFirstName());
		user.setLastName(dto.getLastName());
		user.setMobileNumber(dto.getMobileNumber());
		user.setEmail(dto.getEmail());
		user.setCity(dto.getCity());
		user.setState(dto.getState());
		user.setCountry(dto.getCountry());
		userRepo.save(user);
		return new ApiResponse("User Updated");
	}

}
