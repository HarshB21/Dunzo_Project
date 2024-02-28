package com.GXDunzo.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.Shops;

@Repository
public interface ShopRepository extends JpaRepository<Shops,Long> {
	
}
