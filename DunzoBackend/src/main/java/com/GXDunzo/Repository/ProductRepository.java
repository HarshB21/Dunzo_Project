package com.GXDunzo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
	
	List<Product> findByproductNameContains(String productName);
}
