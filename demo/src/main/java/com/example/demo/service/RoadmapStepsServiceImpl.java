package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Resources;
import com.example.demo.models.Roadmap;
import com.example.demo.models.RoadmapSteps;
import com.example.demo.repository.RoadmapStepsRepository;
import com.example.demo.repository.ResourcesRepository;

@Service
public class RoadmapStepsServiceImpl implements RoadmapStepsService {

    @Autowired
    private RoadmapStepsRepository roadmapStepsRepository;

    @Autowired
    private ResourcesRepository resourcesRepository; // Autowire ResourcesRepository

    @Override
    public RoadmapSteps createStep(RoadmapSteps step) {
        return roadmapStepsRepository.save(step);
    }
    @Autowired
    private RoadmapStepsRepository roadmapStepRepository ;
    @Autowired
    private ResourcesRepository resourceRepository;


    @Override
    public RoadmapSteps getStep(Long id) {
        Optional<RoadmapSteps> optionalStep = roadmapStepsRepository.findById(id);
        return optionalStep.orElse(null);
    }

    @Override
    public RoadmapSteps updateStep(RoadmapSteps step, Long id) {
        Optional<RoadmapSteps> optionalStep = roadmapStepsRepository.findById(id);
        if (optionalStep.isPresent()) {
            RoadmapSteps existingStep = optionalStep.get();
            existingStep.setTitle(step.getTitle());
            existingStep.setDescription(step.getDescription());
            return roadmapStepsRepository.save(existingStep);
        } else {
            return null;
        }
    }

    @Override
    public void deleteStep(Long id) {
        RoadmapSteps roadmap = roadmapStepsRepository.findById(id)
                .orElseThrow();

        // Delete associated steps and resources
        for (Resources step : roadmap.getResources()) {
           
                // Delete resource
                resourceRepository.delete(step);

        }

        // Delete roadmap
        roadmapStepsRepository.delete(roadmap);
    }

    @Override
    public List<RoadmapSteps> getStepsByRoadmapId(Long roadmapId) {
        return roadmapStepsRepository.findByRoadmapId(roadmapId);
    }

    @Override
    public Resources createResourceForStep(Long stepId, Resources resource) {
        RoadmapSteps step = getStep(stepId);
        if (step != null) {
            resource.setRoadmapSteps(step);
            return resourcesRepository.save(resource); // Use resourcesRepository
        }
        return null;
    }
}
