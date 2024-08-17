package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entites.Address;
import com.app.repository.AddressRepo;

@Service
@Transactional
public class AddressServImpl implements AddressService {

	@Autowired
	private AddressRepo addressRepo;
	@Override
	public void saveAdd(Address address) {
		addressRepo.save(address);
	}

}
