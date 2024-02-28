package com.GXDunzo.Service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.GXDunzo.Entities.Address;
import com.GXDunzo.Exception.AddressException;

public interface AddressService {

	Address addAddress(int userId,Address address) throws AddressException;
	
	List<Address> getAddressForUser(int userId) throws AddressException;
	
	@Transactional
	public String removeAddress(int userId, long addressID);
	
	public Address updateAddress(int userId, long addressID, Address updateAddress) throws AddressException;
}
