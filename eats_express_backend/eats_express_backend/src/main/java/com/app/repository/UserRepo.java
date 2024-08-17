package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.User;

public interface UserRepo extends JpaRepository<User, Long> {

	User findByEmail(String emailId);

	User findUserByEmailAndPassword(String email, String password);
	

	

}
