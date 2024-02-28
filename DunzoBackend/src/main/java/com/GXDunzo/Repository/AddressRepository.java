package com.GXDunzo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GXDunzo.Entities.Address;

public interface AddressRepository extends JpaRepository<Address,Long> {
	
	void deleteByaddressID(long addressID);
	
}
