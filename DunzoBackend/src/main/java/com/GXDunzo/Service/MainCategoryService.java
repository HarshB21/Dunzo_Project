package com.GXDunzo.Service;

import java.util.List;

import com.GXDunzo.DTO.MainCatergoryDTO;
import com.GXDunzo.DTO.ShopDTO;
import com.GXDunzo.Entities.MainCategory;
import com.GXDunzo.Entities.Shops;
import com.GXDunzo.Exception.CategoryNotFoundException;


public interface MainCategoryService {
	
	MainCategory addMainCategory(MainCategory maincategory);
	List<MainCategory> getAllMainCategory();


	MainCatergoryDTO getMainCategoryWithShop(Long mainCategoryID) throws CategoryNotFoundException;
	List<ShopDTO> convertshopdto(List<Shops> shops);
	
}
