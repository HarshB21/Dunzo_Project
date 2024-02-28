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
public class Shops {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long shopID;
	private String shopName;
	private String shopLocation;
	private String shopLogo;
	
	@ManyToOne
	@JoinColumn(name = "mainCategoryId")
	@JsonBackReference
	private MainCategory mainCategory;
	
	@OneToMany(mappedBy = "shops",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<SubCategories> subcategories;
	
	
	

}
