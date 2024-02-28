package com.GXDunzo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.MainCategory;

@Repository
public interface MainCategoryRepository extends JpaRepository<MainCategory,Long>{

}
