package com.GXDunzo.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GXDunzo.Entities.Address;
import com.GXDunzo.Entities.Cart;
import com.GXDunzo.Entities.CartItem;
import com.GXDunzo.Entities.OrderItem;
import com.GXDunzo.Entities.Orders;
import com.GXDunzo.Entities.Users;
import com.GXDunzo.Exception.OrderException;
import com.GXDunzo.Repository.AddressRepository;
import com.GXDunzo.Repository.CartItemRepository;
import com.GXDunzo.Repository.OrderRepository;
import com.GXDunzo.Repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderrepository;

	@Autowired
	UserRepository userrepository;

	@Autowired
	CartItemRepository cartitemrepository;

	@Autowired
	AddressRepository addressrepository;

	/**
	 * It create the order for particular user.
	 * @param userId the unique id for user who will create the order.
	 * @param addressId the unique id for address for which his orders has to delivered to particular location.
	 * @return create the order for particular user. 
	 */

	public Orders CreateOrder(int userId, long addressID) throws OrderException {
		Users user = userrepository.findById(userId).get();
		Orders orders = new Orders();
		if (user != null) {
			Cart cart = user.getCart();
			if (cart != null && !cart.getCartitem().isEmpty()) {
				Address selectaddress = addressrepository.findById(addressID).orElse(null);
				orders.setUsers(user);
				orders.setShipAddress(selectaddress);
				
				double totalprice = cart.getCartitem().stream()
						.mapToDouble(cartitem -> cartitem.getProduct().getProductPrice() * cartitem.getQuantity())
						.sum();
				
				orders.setTotalAmount(totalprice);
				
				orders.setOrderDatetime(LocalDateTime.now());

				for (CartItem cartitem : cart.getCartitem()) {
					OrderItem orderitem = new OrderItem();
					orderitem.setProduct(cartitem.getProduct());
					orderitem.setQuantity(cartitem.getQuantity());
					orderitem.setOrders(orders);
					orders.getOrderitem().add(orderitem);
				}
				orderrepository.save(orders);
				return orders;
			}
		}
		throw new OrderException("Cart is Empty. Can't Create Order..");
	}
	
	/**
	 * Get list of orders for the particular user
	 * @param userId the unique id for user who will get the list of order.
	 * @return the list of order for the user who place the order.
	 */
	

	@Override
	public List<Orders> getOrderList(int userId) {
		List<Orders> orders = orderrepository.findByUsers_userId(userId);
		return orders;
	}
	
	/**
	 * If user want to cancel the order within three minute based on userId and orderId.
	 * @param userId the unique id for user who has to cancel order.
	 * @param orderId the unique id for order for which user has to cancel the order.
	 * @return the string order get cancel.
	 */
	
	@Override
	public String deleteOrder(int userId, int orderId) throws OrderException{
		Users user = userrepository.findById(userId).get();
		if (user!=null) {
			List<Orders> orders = user.getOrders();
			if(orders !=null) {
				Optional<Orders> oporder = orderrepository.findById(orderId);
				
				if(oporder.isPresent()) {
					
					Orders order = oporder.get();
					LocalDateTime threeminute = LocalDateTime.now().minusMinutes(3);
					
					if(order.getOrderDatetime().isAfter(threeminute)) {
						orderrepository.deleteById(orderId);
						return "Order Cancel";
					}else {
						throw new OrderException("Order Can't Cancel");
					}
				}
			}
		}
		throw new OrderException("User or Order Not Found");
	}
	
	
	/**
	 * If user has to return order within one day.
	 * @param userId the unique id for user who has to add product to cart.
	 * @param orderId the unique id for order for which user has to return the order.
	 * @return the string when order get returned. 
	 */

	@Override
	public String returnOrderBefore7Day(int userId, int orderId) throws OrderException {
		Users user = userrepository.findById(userId).get();
		if(user !=null) {
			List<Orders> orders = user.getOrders();
			if(orders !=null) {
				
				Optional<Orders> oporder = orderrepository.findById(orderId);
				
				if(oporder.isPresent()) {
					
					Orders order = oporder.get();
					LocalDateTime oneDays = LocalDateTime.now().minusDays(1);
					
					if(order.getOrderDatetime().isAfter(oneDays)) {
						orderrepository.deleteById(orderId);
						return "Order Returned";
					}else {
						throw new OrderException("Order Can't Returned After 1 Days");
					}
				}
			}
		}
		throw new OrderException("User or Order Not Found");
	}

}
