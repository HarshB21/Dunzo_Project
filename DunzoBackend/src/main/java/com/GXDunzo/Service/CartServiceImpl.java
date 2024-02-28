package com.GXDunzo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.Entities.Cart;
import com.GXDunzo.Entities.CartItem;
import com.GXDunzo.Entities.Product;
import com.GXDunzo.Entities.Users;
import com.GXDunzo.Exception.CartItemNotFoundException;
import com.GXDunzo.Repository.CartItemRepository;
import com.GXDunzo.Repository.ProductRepository;
import com.GXDunzo.Repository.UserRepository;

@Service
public class CartServiceImpl implements CartService{
	
	
	
	@Autowired
	UserRepository userrepository;
	
	@Autowired
	CartItemRepository cartitemrepository;

	@Autowired
	ProductRepository productrepository;
	
	/**
	 * Add product to cart from userId and productId
	 * @param userId the unique id for user who has to add product to cart.
	 * @param productId the unique id for product which product has to be added to cart.
	 * @return the string when product get added 
	 */
	
	@Override
	public String addProductToCart(int userId, long productID) throws CartItemNotFoundException  {
		Users user = userrepository.findById(userId).orElseThrow(() -> new CartItemNotFoundException("Please Login in !!"));
		Cart cart = user.getCart();
		Product product = productrepository.findById(productID).orElseThrow(() -> new CartItemNotFoundException("Product Not Found"));
		CartItem cartitem = new CartItem();
		cartitem.setCart(cart);
		cartitem.setProduct(product);
		cartitem.setQuantity(1);
		cartitemrepository.save(cartitem);
		return "Product Added";
	}
	
	/**
	 * update product quantity for particular product for particular user.
	 * @param userId the unique id for user who has to update product quantity .
	 * @param productId the unique id for product which product has to update its quantity in cart.
	 * @return the string when quantity is updated. 
	 */
	@Override
	public String updateProdcutCount(int userId, long productID, int quantity) {
		Users user = userrepository.findById(userId).get();
		Cart cart = user.getCart();
		int count=cartitemrepository.updateCartItem(cart.getCartID(),productID,quantity);
		String message;
		if(count!=0) message="Quantity updated";
		else message="product not found";
		return message;
	}
	
	/**
	 * Get list of product in the cart for a particular User
	 * @param userId the unique id for user who get the list of product for his cart.
	 * @return the list of product in the cart which user has added.
	 */

	@Override
	public List<CartItem> getAllCartItem(int userId) throws CartItemNotFoundException {
		Users user = userrepository.findById(userId).get();
		Cart cart = user.getCart();
		
		if(cart == null || cart.getCartitem().isEmpty()) {
			throw new CartItemNotFoundException("Cart is Empty");
		}
		List<CartItem> cartitem = cartitemrepository.findByCart_cartID(cart.getCartID());
		return cartitem;	
	}
	
	/**
	 * Remove the particular product from the cart.
	 * @param userId the unique id for user who has to remove product from cart.
	 * @param cartitemId the unique id for cart item means which product has to be removed from cart.
	 * @return the string when product get removed 
	 */
	
	
	@Override
	public String removeFromCart(int userId, long cartItemId) {
		Users user = userrepository.findById(userId).get();
		if(user!=null) {
			Cart cart=user.getCart();
			if(cart!=null) {
				List<CartItem> cartitem = cart.getCartitem();
				for(CartItem item : cartitem) {
					if(item.getCartItemId()== cartItemId) {
						cartitemrepository.deleteBycartItemId(cartItemId);
						cartitem.remove(item);
						return "Removed";
					}
				}
			}
		}
		return "Not removed";
	}
	
	
	/**
	 * delete all product list from the cart based on userId 
	 * @param userId the unique id for user who has to delete all product from cart.
	 * @return the string when all product get removed. 
	 */
	@Override
	public String clearCart(int userId) {
		Users user = userrepository.findById(userId).get();
		if(user!=null) {
			Cart cart=user.getCart();
			if(cart!=null) {
				cartitemrepository.deleteBycartID(cart.getCartID());
			}
		}
		return "Cleared";
	}
	




}
