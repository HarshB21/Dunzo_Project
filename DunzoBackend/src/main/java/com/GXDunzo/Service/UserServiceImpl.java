package com.GXDunzo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.GXDunzo.Entities.Address;
import com.GXDunzo.Entities.Cart;
import com.GXDunzo.Entities.CartItem;
import com.GXDunzo.Entities.Product;
import com.GXDunzo.Entities.Users;
import com.GXDunzo.Exception.UserAlreadyExists;
import com.GXDunzo.Exception.UserNotFound;
import com.GXDunzo.Repository.AddressRepository;
import com.GXDunzo.Repository.CartItemRepository;
import com.GXDunzo.Repository.ProductRepository;
import com.GXDunzo.Repository.UserRepository;

import lombok.Setter;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userrepository;
	
	@Autowired
	CartItemRepository cartitemrepository;

	@Autowired
	ProductRepository productrepository;
	
	@Autowired
	BCryptPasswordEncoder passwordEncoder;
	
	
	
	@Override
	public Users registerUser(Users users) throws UserAlreadyExists, Exception {
		if(userrepository.existsByUserEmail(users.getUserEmail())) {
			throw new UserAlreadyExists("User Already Exists, Please Log In");
		}
		if(users.getUserEmail().equals("harshb@gmail.com"))
			users.setUserRole("Admin");
		else 
			users.setUserRole("User");
		String encodedPassword = passwordEncoder.encode(users.getUserPassword());
		users.setUserPassword(encodedPassword);
		Cart cart =new Cart();
		cart.setUsers(users);
		users.setCart(cart);
		
		return userrepository.save(users);
	}

	@Override
	public Users findByUserEmailAndUserPassword(String userEmail, String userPassword) throws UserNotFound {
		Users user = userrepository.findByUserEmail(userEmail);
		
		if(user==null) {
			throw new UserNotFound("User Not Found, Kindly Register!");
		}
		String encryptedPassword = user.getUserPassword();
		if(!passwordEncoder.matches(userPassword, encryptedPassword)) {
			throw new UserNotFound("Password Mismatch");
		}else {
		return user;
		}
	}


	

	@Override
	public Users updateUser(String userEmail, Users users) throws UserNotFound {
		Users user = userrepository.findByUserEmail(userEmail);
		if(user!=null) {
			user.setUserName(users.getUserName());
			user.setUserEmail(users.getUserEmail());
			user.setUserPhone(users.getUserPhone());
			return userrepository.save(user);
		}
		throw new UserNotFound("User not found");
	}

	

	


}
