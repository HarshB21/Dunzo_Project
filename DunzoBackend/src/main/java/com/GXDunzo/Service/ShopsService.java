package com.GXDunzo.Service;

import java.util.List;

import com.GXDunzo.DTO.ShopDTO2;
import com.GXDunzo.DTO.SubCategoryDTO;
import com.GXDunzo.Entities.Shops;
import com.GXDunzo.Entities.SubCategories;
import com.GXDunzo.Exception.CategoryNotFoundException;

public interface ShopsService {
	
	Shops addShop(Shops shops);
	
	ShopDTO2 getShopWithSubCategory(Long shopID) throws CategoryNotFoundException;
	List<SubCategoryDTO> convertSubCategorydto(List<SubCategories> subcategories);
}
