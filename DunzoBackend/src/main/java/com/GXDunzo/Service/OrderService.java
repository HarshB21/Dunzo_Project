package com.GXDunzo.Service;


import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.GXDunzo.Entities.Orders;
import com.GXDunzo.Exception.OrderException;

public interface OrderService {
	
	public Orders CreateOrder(int userId, long addressID) throws OrderException;
	public List<Orders> getOrderList(int userId);
	
	public String deleteOrder(int userId , int orderId) throws OrderException;
	
	public String returnOrderBefore7Day(int userId, int orderId) throws OrderException;
	

}
