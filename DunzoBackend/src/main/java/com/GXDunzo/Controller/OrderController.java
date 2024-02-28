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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PatchExchange;

import com.GXDunzo.Entities.Orders;
import com.GXDunzo.Exception.OrderException;
import com.GXDunzo.Service.OrderService;

@RestController
@RequestMapping("/DunzoHB")
@CrossOrigin(origins = "*")
public class OrderController {

	@Autowired
	OrderService orderservice;
	
	@PostMapping("/Createorder/{userId}/{addressID}")
	public ResponseEntity<?> createOrder(@PathVariable int userId, @PathVariable long addressID) throws OrderException{
		try {
		return new ResponseEntity<Orders>(orderservice.CreateOrder(userId, addressID),HttpStatus.OK);
		}catch (OrderException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/return/{userId}/{orderId}")
	public ResponseEntity<?> returnOrder(@PathVariable int userId, @PathVariable int orderId) throws OrderException{
		try {
		return new ResponseEntity<String>(orderservice.returnOrderBefore7Day(userId, orderId),HttpStatus.OK);
		}catch  (OrderException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getOrders/{userId}")
	public ResponseEntity<List<Orders>> getOrders(@PathVariable int userId){
		return new ResponseEntity<List<Orders>>(orderservice.getOrderList(userId),HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{userId}/{orderId}")
	public ResponseEntity<String> deletenOrder(@PathVariable int userId, @PathVariable int orderId) throws OrderException{
		try {
		return new ResponseEntity<String>(orderservice.deleteOrder(userId, orderId),HttpStatus.OK);
		}catch (OrderException e){
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}

	

}
