package com.GXDunzo.Entities;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int userId;
	public String userName;
	public String userEmail;
	public String userPassword;
	public long userPhone;
	public String userRole;
	
	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonBackReference
	private Cart cart;
	
	@OneToMany(mappedBy = "users",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Address> address;
	
	@OneToMany(mappedBy = "users",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Orders> orders;
	

	
}
