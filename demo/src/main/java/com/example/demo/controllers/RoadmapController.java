package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Resources;
import com.example.demo.models.Roadmap;
import com.example.demo.models.RoadmapSteps;
import com.example.demo.models.Role;
import com.example.demo.models.Status;
import com.example.demo.models.User;
import com.example.demo.repository.RoadmapRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ResourcesService;
import com.example.demo.service.RoadmapService;
import com.example.demo.service.RoadmapStepsService;
import com.example.demo.service.RoadmapStepsServiceImpl;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("api/admin")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    @Autowired
    private ResourcesService resourcesService;
    
    @Autowired
    private RoadmapRepository roadmapRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoadmapStepsService roadmapStepsService;

    @PostMapping("/create/roadmap/{userId}")
public ResponseEntity<?> createRoadmap(@RequestBody Roadmap roadmap, @PathVariable("userId") Long userId) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + userId);
    }
    if (user.getRole() == Role.ADMIN) {
        roadmap.setStatus(Status.APPROVED);
    } else {
        roadmap.setStatus(Status.PENDING);
    }
    
    roadmap.setUser(user);
    Roadmap createdRoadmap = roadmapService.createRoadmap(roadmap);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdRoadmap);
}
    
    @GetMapping("/roadmaps")
    public ResponseEntity<List<Roadmap>> getAllApprovedRoadmaps() {
        List<Roadmap> roadmaps = roadmapService.getAllRoadmaps();
        if (roadmaps.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(roadmaps);
    }


    @GetMapping("/roadmaps/approved")
    public ResponseEntity<List<Roadmap>> getApprovedRoadmaps() {
        List<Roadmap> approvedRoadmaps = roadmapService.getApprovedRoadmaps();
        return ResponseEntity.ok(approvedRoadmaps);
    }

    @GetMapping("/roadmaps/by-user-role-user")
    public ResponseEntity<List<Roadmap>> getRoadmapsByUserRoleUser() {
        List<Roadmap> roadmaps = roadmapService.getRoadmapsByUserRoleUser();
        return ResponseEntity.ok(roadmaps);
    }
   // getRoadmapsByUserId

    @PutMapping("/roadmap/{id}/status")
    public ResponseEntity<Roadmap> updateRoadmapStatus(@PathVariable Long id, @RequestParam String status) {
    if (status == null) {
        return ResponseEntity.ok().build();
    }
    try {
        Status roadmapStatus = Status.valueOf(status.toUpperCase());
        Roadmap updatedRoadmap = roadmapService.updateRoadmapStatus(id, roadmapStatus);
        if (updatedRoadmap != null) {
            return ResponseEntity.ok(updatedRoadmap);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().build(); // Handle invalid status values
    }
}

    @GetMapping("/roadmap/{id}")
    public ResponseEntity<Roadmap> getRoadmapById(@PathVariable("id") Long id) {
        Roadmap roadmap = roadmapService.getRoadmap(id);
        if (roadmap == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(roadmap);
    }

    // @PutMapping("/approve/{id}")
    // public ResponseEntity<Roadmap> approveRoadmap(@PathVariable Long id) {
    //     Roadmap roadmap = roadmapService.approveRoadmap(id);
    //     if (roadmap == null) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }
    //     return ResponseEntity.ok(roadmap);
    // }

    @PutMapping("/roadmap/{id}")
    public ResponseEntity<Roadmap> updateRoadmap(@PathVariable Long id, @RequestBody Roadmap roadmapDetails) {
        Roadmap updatedRoadmap = roadmapService.updateRoadmap(roadmapDetails, id);
        if (updatedRoadmap == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(updatedRoadmap);
    }

  
     @Transactional
    @DeleteMapping("/roadmap/{id}")
    public ResponseEntity<?> deleteRoadmap(@PathVariable Long id) {
        try {
             roadmapService.deleteRoadmap(id);
             return  ResponseEntity.ok().build();
        } catch (Exception e) {
             return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/user/{userId}/roadmaps")
    public ResponseEntity<List<Roadmap>> getRoadmapsByUserId(@PathVariable Long userId) {
        List<Roadmap> roadmaps = roadmapService.getRoadmapsByUserId(userId);
        if (roadmaps.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(roadmaps);
    }

    @PostMapping("/roadmap/{roadmapId}/steps")
    public ResponseEntity<RoadmapSteps> createStep(@PathVariable Long roadmapId, @RequestBody RoadmapSteps step) {
        Roadmap roadmap = roadmapService.getRoadmap(roadmapId);
        if (roadmap == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        step.setRoadmap(roadmap);
        RoadmapSteps createdStep = roadmapStepsService.createStep(step);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStep);
    }

    @GetMapping("/roadmap/{roadmapId}/steps")
    public ResponseEntity<List<RoadmapSteps>> getStepsByRoadmapId(@PathVariable Long roadmapId) {
        List<RoadmapSteps> steps = roadmapStepsService.getStepsByRoadmapId(roadmapId);
        if (steps.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(steps);
    }

    @GetMapping("/step/{id}")
    public ResponseEntity<RoadmapSteps> getStepById(@PathVariable Long id) {
        RoadmapSteps step = roadmapStepsService.getStep(id);
        if (step == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(step);
    }

    @PutMapping("/step/{id}")
    public ResponseEntity<RoadmapSteps> updateStep(@PathVariable Long id, @RequestBody RoadmapSteps step) {
        RoadmapSteps updatedStep = roadmapStepsService.updateStep(step, id);
        if (updatedStep == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(updatedStep);
    }

    @DeleteMapping("/step/{id}")
    public ResponseEntity<?> deleteStep(@PathVariable Long id) {
        try {
             roadmapStepsService.deleteStep(id);
             return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
       
       
    }

    @PostMapping("/step/{stepId}/resource")
    public ResponseEntity<Resources> createResourceForStep(@PathVariable Long stepId, @RequestBody Resources resource) {
        RoadmapSteps step = roadmapStepsService.getStep(stepId);
        if (step == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        resource.setRoadmapSteps(step);
        Resources createdResource = resourcesService.createResource(resource);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdResource);
    }


    @DeleteMapping("/delete/resource/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        try {
             resourcesService.deleteResourceById(id);
             return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
           
        }  
    }


    // @GetMapping("/unapproved")
    // public ResponseEntity<List<Roadmap>> getUnapprovedRoadmaps() {
    //     List<Roadmap> unapprovedRoadmaps = roadmapRepository.findByApprovedFalse();
    //     return ResponseEntity.ok().body(unapprovedRoadmaps);
    // }
}