package com.example.demo.service;
import java.util.List;

import com.example.demo.models.Resources;
import com.example.demo.models.RoadmapSteps;

public interface RoadmapStepsService {
    RoadmapSteps createStep(RoadmapSteps step);

    RoadmapSteps getStep(Long id);

    RoadmapSteps updateStep(RoadmapSteps step, Long id);

    void deleteStep(Long id);

    List<RoadmapSteps> getStepsByRoadmapId(Long roadmapId);

    Resources createResourceForStep(Long stepId, Resources resource);
}