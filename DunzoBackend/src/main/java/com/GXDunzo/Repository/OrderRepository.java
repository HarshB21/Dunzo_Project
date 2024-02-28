package com.GXDunzo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.Orders;



@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer>{
	
	List<Orders> findByUsers_userId(int userId);
	

}
