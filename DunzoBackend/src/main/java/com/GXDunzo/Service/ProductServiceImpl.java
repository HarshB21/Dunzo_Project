package com.GXDunzo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.Entities.Product;
import com.GXDunzo.Exception.ProductNotFound;
import com.GXDunzo.Repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductRepository productrepository;
	
	@Override
	public Product addproduct(Product product) {
		return productrepository.save(product);
	}
	
	/**
	 * Get list of product 
	 * @return the list of product.
	 */

	@Override
	public List<Product> getListofProduct()throws ProductNotFound {
		if(productrepository!=null) {
			return productrepository.findAll();
		}
			throw new ProductNotFound("No products available");
	}

	/**
	 * Get product by its Id
	 * @param productId the unique id for product which product has to be displayed.
	 * @return the product detail of particular product by its Id .
	 */
	
	@Override
	public Optional<Product> getProductById(long productID) throws ProductNotFound{
		Optional<Product> product = productrepository.findById(productID);
		if(product.isPresent()) {
			return productrepository.findById(productID);
		}
			throw new ProductNotFound("No product with given id found");
	}
	
	/**
	 * Get product by its name 
	 * @param productName which product you want to search.
	 * @return the product with particular name.
	 */

	@Override
	public List<Product> searchByName(String productName) throws ProductNotFound {
		List<Product> productlist = productrepository.findByproductNameContains(productName);
		if(!productlist.isEmpty()) {
		return productrepository.findByproductNameContains(productName);
	}
		throw new ProductNotFound("No such product found");
	}
	
	

}
