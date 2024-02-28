package com.GXDunzo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GXDunzo.Entities.SubCategories;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategories,Long>{

}
