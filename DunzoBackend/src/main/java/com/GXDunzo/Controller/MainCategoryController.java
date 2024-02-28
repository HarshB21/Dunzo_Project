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

import com.GXDunzo.DTO.MainCatergoryDTO;
import com.GXDunzo.DTO.ShopDTO;
import com.GXDunzo.Entities.MainCategory;
import com.GXDunzo.Exception.CategoryNotFoundException;
import com.GXDunzo.Exception.OrderException;
import com.GXDunzo.Service.MainCategoryService;

@RestController
@RequestMapping("/Dunzo")
@CrossOrigin(origins = "*")
public class MainCategoryController {

	@Autowired
	MainCategoryService maincategoryservice;
	
	@PostMapping("/addMainCategory")
	public ResponseEntity<MainCategory> addmain(@RequestBody MainCategory maincategory){
		return new ResponseEntity<MainCategory>(maincategoryservice.addMainCategory(maincategory),HttpStatus.CREATED);
	}
	
	@GetMapping("/getListOfMainCategory")
	public ResponseEntity<List<MainCategory>> getallmain(){
		return new ResponseEntity<List<MainCategory>>(maincategoryservice.getAllMainCategory(),HttpStatus.OK);
	}
	
	@GetMapping("/getListOfShopByMainCategory/{mainCategoryID}")
	public ResponseEntity<?> getMainCategoryWithShop(@PathVariable Long mainCategoryID) throws CategoryNotFoundException{
		try {
		return new ResponseEntity<MainCatergoryDTO>(maincategoryservice.getMainCategoryWithShop(mainCategoryID),HttpStatus.OK);
		}catch (CategoryNotFoundException e) {
		return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);	
		}
	}

	
}
