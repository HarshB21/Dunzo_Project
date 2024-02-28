package com.GXDunzo.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.GXDunzo.Entities.Product;
import com.GXDunzo.Exception.ProductNotFound;
import com.GXDunzo.Repository.ProductRepository;


@SpringBootTest
public class TestProductService {
	
	@Autowired
	ProductService productservice;
	
	@Mock
	private ProductRepository productrepository;
	
	@InjectMocks
	ProductServiceImpl productserviceimpl;
	
	@BeforeEach
	void set() {
		Optional<Product> product = Optional.of(new Product(23,"Coca-Cola",225.0,"Pack of 5 x 750 ml","Shelf life :360 Days","https://ik.imagekit.io/dunzo/tr:w-144,h-144,cm-pad_resize/1b9bc28a91bf11edbd6b58f691ac8603_PRODUCT_5c029b4e08e0144a1a409b47_1.jpg",null));
		Mockito.when(productrepository.findById(23l)).thenReturn(product);
	}
	
	@Test
	public void testProductById() throws ProductNotFound {
		String productname = "Coca-Cola";
		
		Optional<Product> productById;
	
			productById = productserviceimpl.getProductById(23);
			assertEquals(productname, productById.get().getProductName());
	}
	
	
	@Test
	public void testProduct() throws ProductNotFound {
		
			Optional<Product> actualProduct = productservice.getProductById(23);
			
			assertEquals("Coca-Cola",actualProduct.get().getProductName());
	}
}
