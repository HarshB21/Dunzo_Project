package com.GXDunzo.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.DTO.ProductDTO;
import com.GXDunzo.DTO.SubCategoryDTO2;
import com.GXDunzo.Entities.Product;
import com.GXDunzo.Entities.SubCategories;
import com.GXDunzo.Exception.CategoryNotFoundException;
import com.GXDunzo.Repository.SubCategoryRepository;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {

	@Autowired
	SubCategoryRepository subcategoryrepository;
	
	@Override
	public SubCategories addSubCategory(SubCategories subcategories) {
		return subcategoryrepository.save(subcategories);
	}

	

	@Override
	public SubCategoryDTO2 getProductWithSubcategory(Long subCategoryID) throws CategoryNotFoundException{
		Optional<SubCategories> subcategory = subcategoryrepository.findById(subCategoryID);
		if(subcategory.isPresent()) {
			SubCategories subc = subcategory.get();
			List<Product> product = subc.getProduct();
			List<ProductDTO> prodto = convertProductDto(product);
			return new SubCategoryDTO2(prodto);
		}else {
			throw new CategoryNotFoundException("subCategory Not Found");
		}
		
	}

	@Override
	public List<ProductDTO> convertProductDto(List<Product> product) {
		List<ProductDTO> productdto = new ArrayList<>();
		for(Product pro : product) {
			ProductDTO dto = new ProductDTO();
			dto.setProductID(pro.getProductID());
			dto.setProductName(pro.getProductName());
			dto.setProductPrice(pro.getProductPrice());
			dto.setProductQuantity(pro.getProductQuantity());
			dto.setProductImage(pro.getProductImage());
			
			productdto.add(dto);
		}
		return productdto ;
	}

}
