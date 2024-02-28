package com.GXDunzo.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long addressID;
	private String addressType;
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private int pinCode;
	
	@ManyToOne
	@JoinColumn(name = "userID")
	@JsonBackReference
	private Users users;
	

}
