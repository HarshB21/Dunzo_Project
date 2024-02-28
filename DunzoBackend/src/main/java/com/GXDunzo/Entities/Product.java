package com.GXDunzo.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long productID;
	private String productName;
	private double productPrice;
	private String productQuantity;
	private String productDescription;
	private String productImage;
	
	@ManyToOne
	@JoinColumn(name = "subCategoryID")
	@JsonBackReference
	private SubCategories subcategories;
	
	
}
