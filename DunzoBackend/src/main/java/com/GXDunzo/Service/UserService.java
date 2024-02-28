package com.GXDunzo.Service;


import com.GXDunzo.Entities.Users;
import com.GXDunzo.Exception.UserAlreadyExists;
import com.GXDunzo.Exception.UserNotFound;

public interface UserService {
	
	Users registerUser(Users users) throws UserAlreadyExists, Exception;
	Users findByUserEmailAndUserPassword(String userEmail, String userPassword) throws UserNotFound;
	Users updateUser(String userEmail, Users users) throws UserNotFound;
	
}
