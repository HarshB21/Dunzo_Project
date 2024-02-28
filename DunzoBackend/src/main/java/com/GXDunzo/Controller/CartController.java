package com.GXDunzo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GXDunzo.Entities.CartItem;
import com.GXDunzo.Exception.CartItemNotFoundException;
import com.GXDunzo.Service.CartService;
import com.GXDunzo.Service.CartServiceImpl;

@RestController
@RequestMapping("/DunzoHB")
@CrossOrigin(origins = "*")
public class CartController {

	@Autowired
	CartService cartservice;
	
	@Autowired
	CartServiceImpl cartimpl;
	
	@PostMapping("/addProduct/{userId}/{productID}")
	public ResponseEntity<String> addProductToCart(@PathVariable int userId, @PathVariable long productID) {
		try {
			return new ResponseEntity<String>(cartservice.addProductToCart(userId, productID),HttpStatus.OK);
		} catch (CartItemNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PutMapping("/updateCount/{userId}/{productID}/{quantity}")
	public ResponseEntity<String> updateProductCount(@PathVariable int userId,@PathVariable long productID, @PathVariable int quantity){
		
		return new ResponseEntity<String>(cartservice.updateProdcutCount(userId, productID, quantity),HttpStatus.OK);
	}

	
	@GetMapping("/getProductList/{userId}")
	public ResponseEntity<?> getProductFromCart(@PathVariable int userId){
		try {
			return new ResponseEntity<List<CartItem>>(cartservice.getAllCartItem(userId),HttpStatus.OK);
		} catch (CartItemNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
	@DeleteMapping("/removeFromCart/{userId}/{cartItemId}")
	public ResponseEntity<String> removeFromCart(@PathVariable int userId, @PathVariable long cartItemId){
		return new ResponseEntity<String>(cartservice.removeFromCart(userId, cartItemId),HttpStatus.OK);
	}
	
	
	@DeleteMapping("/afterPayment/{userId}")
	public ResponseEntity<String> clearCart(@PathVariable int userId){
		return new ResponseEntity<String>(cartservice.clearCart(userId),HttpStatus.OK);
	}
	
	
}
