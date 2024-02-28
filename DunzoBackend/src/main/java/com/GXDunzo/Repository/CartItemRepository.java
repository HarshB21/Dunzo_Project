package com.GXDunzo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.GXDunzo.Entities.CartItem;



@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long>{
	
	
	CartItem findByCart_CartIDAndProduct_ProductID(long cartID , long productID);

	@Transactional
	@Modifying
	@Query("UPDATE CartItem c SET c.quantity = :quantity where c.cart.id= :cartID AND c.product.id= :productID")
	int updateCartItem(long cartID, long productID, int quantity);
	
	List<CartItem> findByCart_cartID(long cartID);
	
	void deleteBycartItemId(long cartItemId);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartID")
	void deleteBycartID(long cartID);
}
