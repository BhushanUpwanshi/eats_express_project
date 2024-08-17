package com.app.dtos;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.app.entites.RoleEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
	private Long userId;
	private String firstName;
	private String lastName;
	private String mobileNumber;
	private String email;
	private String password;
	
	private String city;
	private String state;
	private String country;
	
	@Enumerated(EnumType.STRING)
	private RoleEnum role;
	
//	private AddressDTO address;
	
	
}
