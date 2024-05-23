package com.example.demo.service;

import com.example.demo.models.Resources;
import com.example.demo.repository.ResourcesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourcesServiceImpl implements ResourcesService {

    @Autowired
    private ResourcesRepository resourcesRepository;

    @Override
    public Resources createResource(Resources resource) {
        return resourcesRepository.save(resource);
    }

    @Override
    public void deleteResourceById(Long id) {
        resourcesRepository.deleteById(id);
    }
}
