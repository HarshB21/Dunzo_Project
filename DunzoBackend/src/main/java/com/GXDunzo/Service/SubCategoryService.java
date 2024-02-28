package com.GXDunzo.Service;

import java.util.List;

import com.GXDunzo.DTO.ProductDTO;
import com.GXDunzo.DTO.SubCategoryDTO2;
import com.GXDunzo.Entities.Product;
import com.GXDunzo.Entities.SubCategories;
import com.GXDunzo.Exception.CategoryNotFoundException;

public interface SubCategoryService {
	
	SubCategories addSubCategory(SubCategories subcategories);

	SubCategoryDTO2 getProductWithSubcategory(Long subCategoryID) throws CategoryNotFoundException;
	List<ProductDTO> convertProductDto (List<Product> product);
	
}
