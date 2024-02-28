package com.GXDunzo.Controller;

import java.util.List;

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

import com.GXDunzo.DTO.ShopDTO2;
import com.GXDunzo.DTO.SubCategoryDTO;
import com.GXDunzo.Entities.Shops;
import com.GXDunzo.Exception.CategoryNotFoundException;
import com.GXDunzo.Service.ShopsService;

@RestController
@RequestMapping("/Dunzo")
@CrossOrigin(origins = "*")
public class ShopController {
	
	@Autowired
	ShopsService shopservice;
	
	@PostMapping("/addShop")
	public ResponseEntity<Shops> addshops(@RequestBody Shops shops){
		return new ResponseEntity<Shops>(shopservice.addShop(shops),HttpStatus.CREATED);
	}
	
	@GetMapping("/getListOfSubcategoryFromShop/{shopID}")
	public ResponseEntity<?> getShopWithSubCategory(@PathVariable long shopID) throws CategoryNotFoundException{
		try {
			return new ResponseEntity<ShopDTO2>(shopservice.getShopWithSubCategory(shopID),HttpStatus.OK);
		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);	
		}
	}
}
