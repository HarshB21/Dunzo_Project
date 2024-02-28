package com.GXDunzo.DTO;


import java.util.List;



import lombok.Data;

@Data
public class MainCatergoryDTO {
	
	
	private String mainCategoryName;
	List<ShopDTO> shopdto;
	
	public MainCatergoryDTO(String mainCategoryName, List<ShopDTO> shopdto) {
		this.mainCategoryName= mainCategoryName;
		this.shopdto =shopdto;
	}
	
}
