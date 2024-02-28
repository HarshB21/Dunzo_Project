package com.GXDunzo.DTO;

import java.util.List;

import lombok.Data;

@Data
public class ShopDTO2 {
	
	private String shopName;
	private String shopLocation;
	private String shopLogo;
	
	List<SubCategoryDTO> subcategorydto;

	public ShopDTO2(String shopName, String shopLocation, String shopLogo, List<SubCategoryDTO> subcategorydto) {
		super();
		this.shopName = shopName;
		this.shopLocation = shopLocation;
		this.shopLogo = shopLogo;
		this.subcategorydto = subcategorydto;
	}
	
	
}
