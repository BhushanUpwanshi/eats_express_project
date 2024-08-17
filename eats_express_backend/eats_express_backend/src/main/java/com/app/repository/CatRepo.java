package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entites.Category;

public interface CatRepo extends JpaRepository<Category, Long> {

}
