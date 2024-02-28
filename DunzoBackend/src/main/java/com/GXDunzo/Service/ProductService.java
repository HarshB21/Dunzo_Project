package com.GXDunzo.Service;

import java.util.List;
import java.util.Optional;

import com.GXDunzo.Entities.Product;
import com.GXDunzo.Exception.ProductNotFound;

public interface ProductService {
	
	Product addproduct(Product product);
	List<Product> getListofProduct()throws ProductNotFound;
	Optional<Product> getProductById(long productID) throws ProductNotFound;
	List<Product> searchByName(String productName)throws ProductNotFound;
	
}
