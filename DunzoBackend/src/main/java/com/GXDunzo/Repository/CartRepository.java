package com.GXDunzo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long>{

}
