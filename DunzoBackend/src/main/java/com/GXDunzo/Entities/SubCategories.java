package com.GXDunzo.Entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class SubCategories {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long subCategoryID;
	
	private String subCategoryName;
	
	@ManyToOne
	@JoinColumn(name = "ShopID")
	@JsonBackReference
	private Shops shops;
	
	
	@OneToMany(mappedBy = "subcategories",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Product> product;

	
}
