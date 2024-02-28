package com.GXDunzo.Logging;



import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;



@Aspect
@Component
public class LoggingAspect {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@AfterThrowing(pointcut = "execution(* com.GXDunzo..*(..))",throwing = "exception")
	public void logException(JoinPoint joinPoint, Throwable exception) {
		logger.error("Exception in {}.{} () with cause = '{}'",joinPoint.getSignature().getDeclaringTypeName(),
			joinPoint.getSignature().getName() , exception.getMessage());
	}
	
	@Before("execution(* com.GXDunzo..*(..))")
	public void logStart(JoinPoint joinPoint) {
		logger.debug("Method {} is about to be executed.",joinPoint.getSignature().getName());
	}
	
	@After("execution(* com.GXDunzo..*(..))")
	public void logEnd(JoinPoint joinPoint) {
		logger.debug("Method {} has been successfully executed.",joinPoint.getSignature().getName());
	}
}
