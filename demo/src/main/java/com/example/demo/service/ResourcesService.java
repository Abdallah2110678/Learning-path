package com.example.demo.service;

import com.example.demo.models.Resources;

public interface ResourcesService {
    Resources createResource(Resources resource);
    void deleteResourceById(Long id);
}
