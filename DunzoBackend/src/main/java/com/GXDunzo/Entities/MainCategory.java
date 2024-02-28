package com.GXDunzo.Entities;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Data
public class MainCategory {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long mainCategoryID;
	private String mainCategoryName;
	
	@OneToMany(mappedBy = "mainCategory",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Shops> shops;

	
}
