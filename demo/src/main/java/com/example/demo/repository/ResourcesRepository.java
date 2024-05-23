package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Resources;

public interface ResourcesRepository extends JpaRepository<Resources, Long> {

}