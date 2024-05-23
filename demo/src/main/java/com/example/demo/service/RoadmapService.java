package com.example.demo.service;
import com.example.demo.models.Roadmap;
import com.example.demo.models.Role;
import com.example.demo.models.Status;

import java.util.List;

public interface RoadmapService {

    Roadmap createRoadmap(Roadmap roadmap);

    Roadmap getRoadmap(Long id);

    Roadmap updateRoadmap(Roadmap roadmap, Long id);


    List<Roadmap> getAllRoadmaps();

   
    List<Roadmap> getApprovedRoadmaps();
    List<Roadmap> getRoadmapsByUserId(Long userId);

    List<Roadmap> getRoadmapsByUserRoleUser();
    Roadmap updateRoadmapStatus(Long id, Status status);

    void deleteRoadmap(Long id);
}