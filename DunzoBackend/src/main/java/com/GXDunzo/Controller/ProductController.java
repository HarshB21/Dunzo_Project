package com.GXDunzo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GXDunzo.Entities.Product;
import com.GXDunzo.Exception.ProductNotFound;
import com.GXDunzo.Service.ProductService;
import com.GXDunzo.Service.ProductServiceImpl;

@RestController
@RequestMapping("/Dunzo")
@CrossOrigin(origins = "*")
public class ProductController {
	
	@Autowired
	ProductService productservice;
	
	@Autowired
	ProductServiceImpl serviceimpl;
	
	
	@PostMapping("/addProduct")
	public ResponseEntity<Product> addProduct(@RequestBody Product product){
		return new ResponseEntity<Product>(productservice.addproduct(product),HttpStatus.CREATED);
	}
	
	@GetMapping("/getListOfProduct")
	public ResponseEntity<?> getListOfProduct(){
		try {
			return new ResponseEntity<List<Product>>(productservice.getListofProduct(),HttpStatus.OK);
		} catch (ProductNotFound e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getProductById/{productID}")
	public ResponseEntity<?> getProductById(@PathVariable long productID){
		try {
		return new ResponseEntity<Optional<Product>>(productservice.getProductById(productID),HttpStatus.OK);
		} catch (ProductNotFound e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/findByName/{productName}")
	public ResponseEntity<?> getByProductName(@PathVariable String productName){
		try {
		return new ResponseEntity<List<Product>>(productservice.searchByName(productName),HttpStatus.OK);
		} catch (ProductNotFound e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
}
