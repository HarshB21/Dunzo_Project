package com.GXDunzo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GXDunzo.Entities.Address;
import com.GXDunzo.Exception.AddressException;
import com.GXDunzo.Service.AddressService;

@RestController
@RequestMapping("/DunzoHB")
@CrossOrigin(origins = "*")
public class AddressController {

	@Autowired
	AddressService addressservice;
	
	@PostMapping("/addAddress/{userId}")
	public ResponseEntity<?> addaddress(@PathVariable int userId, @RequestBody Address address){
		try {
			return new ResponseEntity<Address>(addressservice.addAddress(userId, address),HttpStatus.OK);
		} catch (AddressException e){
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	

	@DeleteMapping("/deleteAddress/{userId}/{addressID}")
	public ResponseEntity<String> removeAddress(@PathVariable int userId, @PathVariable long addressID){
		return new ResponseEntity<String>(addressservice.removeAddress(userId, addressID),HttpStatus.OK);
	}
	
	@GetMapping("/getAddress/{userId}")
	public ResponseEntity<?> getAddressByUser(@PathVariable int userId){
		try {
			return new ResponseEntity<List<Address>>(addressservice.getAddressForUser(userId),HttpStatus.OK);
		} catch (AddressException e){
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@PatchMapping("/updateAddress/{userId}/{addressID}")
	public ResponseEntity<?> addaddress(@PathVariable int userId,@PathVariable long addressID ,@RequestBody Address updateAddress){
		try {
			return new ResponseEntity<Address>(addressservice.updateAddress(userId, addressID, updateAddress),HttpStatus.OK);
		} catch (AddressException e){
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
}
