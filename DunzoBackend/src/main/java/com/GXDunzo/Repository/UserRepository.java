package com.GXDunzo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.Users;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer>{
	
	Boolean existsByUserEmail(String userEmail);
	
	Users findByUserEmail(String userEmail);

	Users findByUserEmailAndUserPassword(String userEmail, String userPassword);
}
