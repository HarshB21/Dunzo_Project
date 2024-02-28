package com.GXDunzo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.Entities.Address;
import com.GXDunzo.Entities.Cart;
import com.GXDunzo.Entities.CartItem;
import com.GXDunzo.Entities.Users;
import com.GXDunzo.Exception.AddressException;
import com.GXDunzo.Repository.AddressRepository;

import com.GXDunzo.Repository.UserRepository;

@Service
public class AddressServiceImpl implements AddressService{
	
	@Autowired
	UserRepository userrepository;
	
	@Autowired
	AddressRepository addressrepository;
	
	
	/**
	 * Adds an address to a user by its userID
	 * @param userId the unique id for user to which address will be added
	 * @param address the address object containing the address details to be added.
	 * @return address object if user exist
	 */
	
	@Override
	public Address addAddress(int userId, Address address) throws AddressException {
		Optional<Users> user = userrepository.findById(userId);
		if(user.isPresent()) {
			Users users = user.get();
			
			address.setUsers(users);
			addressrepository.save(address);
			return address;
		}
		throw new AddressException("User not found");
	}
	
	
	/**
	 * Remove an address from a user by its userID
	 * @param userId the unique id for user from which address will be removed.
	 * @param addressID the address id which address has to be removed.
	 * @return string address is removed or not.
	 */
	

	@Override
	public String removeAddress(int userId, long addressID) {
		Users user = userrepository.findById(userId).get();
		if(user!=null) {
			List<Address> address=user.getAddress();
			if(address!=null) {
				for(Address item : address) {
					if(item.getAddressID() == addressID) {
						addressrepository.deleteByaddressID(addressID);
						address.remove(item);
						return "Removed";
					}
				}
			}
		}
		return "Not removed";
	}
	
	
	/**
	 * Give the list of address for the user by userId
	 * @param userId the unique id for user for which list of address will be displayed 
	 * @return address list if user exist and if address exist
	 */

	@Override
	public List<Address> getAddressForUser(int userId) throws AddressException{
		Users user = userrepository.findById(userId).orElse(null);
		if(user!=null) {
			return user.getAddress();
		}
		throw new AddressException("No Address Found For User");
	}
	
	/**
	 * Update an address from a user by its userID and addressId
	 * @param userId the unique id for user for which address has to be updated .
	 * @param addressID the address id which address has to be updated.
	 * @param Address object which take the existing address to be updated.
	 */

	@Override
	public Address updateAddress(int userId, long addressID, Address updateAddress) throws AddressException {
		Users user = userrepository.findById(userId).orElse(null);
		if(user!=null) {
			Optional<Address> exist = addressrepository.findById(addressID);
			if(exist !=null) {
				Address updateadd = exist.get();
				updateadd.setAddressLine1(updateAddress.getAddressLine1());
				updateadd.setAddressLine2(updateAddress.getAddressLine2());
				updateadd.setAddressType(updateAddress.getAddressType());
				updateadd.setCity(updateAddress.getCity());
				updateadd.setPinCode(updateAddress.getPinCode());
				updateadd.setState(updateAddress.getState());
				
				addressrepository.save(updateadd);
			}
			throw new AddressException("No Address Found For User");
		}
		throw new AddressException("No User found");
	}





}
