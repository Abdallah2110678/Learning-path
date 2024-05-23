package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.RoadmapSteps;

public interface RoadmapStepsRepository extends JpaRepository<RoadmapSteps, Long> {
    List<RoadmapSteps> findByRoadmapId(Long roadmapId);

}
