package com.GXDunzo.Service;


import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.GXDunzo.Entities.CartItem;
import com.GXDunzo.Exception.CartItemNotFoundException;

public interface CartService {
		

	public String addProductToCart(int userId, long productID) throws CartItemNotFoundException ;
	public String updateProdcutCount(int userId, long productID, int quantity);
	public List<CartItem> getAllCartItem(int userId) throws CartItemNotFoundException;
	@Transactional
	public String removeFromCart(int userId, long cartItemId);
	public String clearCart(int userId);
	
}
