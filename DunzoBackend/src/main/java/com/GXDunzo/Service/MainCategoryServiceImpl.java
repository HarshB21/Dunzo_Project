package com.GXDunzo.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.DTO.MainCatergoryDTO;
import com.GXDunzo.DTO.ShopDTO;
import com.GXDunzo.Entities.MainCategory;
import com.GXDunzo.Entities.Shops;
import com.GXDunzo.Exception.CategoryNotFoundException;
import com.GXDunzo.Repository.MainCategoryRepository;
import com.GXDunzo.Repository.ShopRepository;

@Service
public class MainCategoryServiceImpl implements MainCategoryService{
	
	@Autowired
	MainCategoryRepository maincategoryrepository;
	
	

	@Override
	public MainCategory addMainCategory(MainCategory maincategory) {
		return maincategoryrepository.save(maincategory);
	}

	@Override
	public List<MainCategory> getAllMainCategory() {
		return maincategoryrepository.findAll();
	}

	

	@Override
	public MainCatergoryDTO getMainCategoryWithShop(Long mainCategoryID) throws CategoryNotFoundException{
		Optional<MainCategory> mainCategory = maincategoryrepository.findById(mainCategoryID);
		if(mainCategory.isPresent()) {
			MainCategory main = mainCategory.get();
			List<Shops> shops = main.getShops();
			String categoryMainName = main.getMainCategoryName();
			List<ShopDTO> shopdto = convertshopdto(shops);
			return new MainCatergoryDTO(categoryMainName,shopdto); 
		}else {
			throw new CategoryNotFoundException("Main Category Not Found");
		}
	}


	@Override
	public List<ShopDTO> convertshopdto(List<Shops> shops) {
		List<ShopDTO> shopdto =new ArrayList<>();
		for(Shops s : shops) {
			ShopDTO dto =new ShopDTO();
			dto.setShopID(s.getShopID());
			dto.setShopName(s.getShopName());
			dto.setShopLocation(s.getShopLocation());
			dto.setShopLogo(s.getShopLogo());
			
			shopdto.add(dto);
		}
		return shopdto;
	}

	

	

}
