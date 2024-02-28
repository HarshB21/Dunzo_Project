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

import com.GXDunzo.DTO.SubCategoryDTO2;
import com.GXDunzo.Entities.SubCategories;
import com.GXDunzo.Exception.CategoryNotFoundException;
import com.GXDunzo.Service.SubCategoryService;

@RestController
@RequestMapping("/Dunzo")
@CrossOrigin(origins = "*")
public class SubCategoryController {
		
	@Autowired
	SubCategoryService subcategoryservice;
	
	@PostMapping("/addSubCategory")
	public ResponseEntity<SubCategories> addsubcategories(@RequestBody SubCategories subcategories){
		return new ResponseEntity<SubCategories>(subcategoryservice.addSubCategory(subcategories),HttpStatus.CREATED);
	}
	
	
	
	@GetMapping("/getProductWithSubcategory/{subCategoryID}")
	public ResponseEntity<?> getProductWithSubcategory(@PathVariable Long subCategoryID) throws CategoryNotFoundException{
		try {
			return new ResponseEntity<SubCategoryDTO2>(subcategoryservice.getProductWithSubcategory(subCategoryID),HttpStatus.OK);
		} catch (CategoryNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);	
		}
	}
	
	
}
