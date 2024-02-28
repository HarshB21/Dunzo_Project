package com.GXDunzo.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.DTO.ShopDTO2;
import com.GXDunzo.DTO.SubCategoryDTO;
import com.GXDunzo.Entities.Shops;
import com.GXDunzo.Entities.SubCategories;
import com.GXDunzo.Exception.CategoryNotFoundException;
import com.GXDunzo.Repository.ShopRepository;

@Service
public class ShopsServiceImpl implements ShopsService {
	
	@Autowired
	ShopRepository shoprepository;

	@Override
	public Shops addShop(Shops shops) {
		return shoprepository.save(shops);
	}


	@Override
	public ShopDTO2 getShopWithSubCategory(Long shopID) throws CategoryNotFoundException {
		Optional<Shops> shops = shoprepository.findById(shopID);
		if(shops.isPresent()) {
			Shops shop = shops.get();
			List<SubCategories> subcategories = shop.getSubcategories();
			String shopName = shop.getShopName();
			String shopLocation = shop.getShopLocation();
			String shopLogo = shop.getShopLogo();
			List<SubCategoryDTO> subdto =convertSubCategorydto(subcategories);
			return new ShopDTO2(shopName, shopLocation, shopLogo, subdto);
		}else {
			throw new CategoryNotFoundException("Shop not Found");
		}
	}

	@Override
	public List<SubCategoryDTO> convertSubCategorydto(List<SubCategories> subcategories) {
		List<SubCategoryDTO> subcategorydto = new ArrayList<>();
		for(SubCategories sub : subcategories) {
			SubCategoryDTO subdto = new SubCategoryDTO();
			subdto.setSubCategoryID(sub.getSubCategoryID());
			subdto.setSubCategoryName(sub.getSubCategoryName());
			
			subcategorydto.add(subdto);
		}
		return subcategorydto;
	}

}
