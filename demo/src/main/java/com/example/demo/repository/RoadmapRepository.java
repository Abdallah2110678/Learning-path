package com.example.demo.repository;

import com.example.demo.models.Roadmap;
import com.example.demo.models.Status;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findAllById(Long id);
    List<Roadmap> findByTitleContainingIgnoreCase(String title);
    List<Roadmap> findByUserId(Long userId);

    List<Roadmap> findByStatus(Status status);

    @Query("SELECT r FROM Roadmap r WHERE r.user.role = 'USER'")
    List<Roadmap> findAllByUserRoleUser();
    
}