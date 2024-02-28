package com.GXDunzo.DTO;

import java.util.List;


import lombok.Data;

@Data
public class SubCategoryDTO2 {
	
	List<ProductDTO> productdto;

	public SubCategoryDTO2(List<ProductDTO> productdto) {
		super();
		this.productdto = productdto;
	}


}
