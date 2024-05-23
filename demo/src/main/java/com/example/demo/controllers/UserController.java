package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.models.AuthenticationResponse;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.repository.RoadmapRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoadmapRepository roadmapRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/statistics")
    public Map<String, Integer> getStatistics() {
        Map<String, Integer> statistics = new HashMap<>();
        int userCount = userRepository.countUsersByRole(Role.USER);
        int adminCount = userRepository.countUsersByRole(Role.ADMIN);
        int RoadmapCount = roadmapRepository.findAll().size();

        statistics.put("userCount", userCount);
        statistics.put("adminCount", adminCount);
        statistics.put("RoadmapCount", RoadmapCount);

        return statistics;
    }

    @GetMapping("/allusers")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<User> createuser(@RequestBody User user) {
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saveduser = userRepository.save(user);
        return ResponseEntity.ok(saveduser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getuser/{id}")
    public ResponseEntity<User> getuser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null && user.getRole() == Role.USER) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/promote-to-admin/{id}")
    public ResponseEntity<Void> promoteUserToAdmin(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setRole(Role.ADMIN);
            userRepository.save(user);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user.isPresent());
    }

    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody User user, @PathVariable Long id) {
        User repouser = userRepository.findById(id).orElse(null);
        if (repouser != null && repouser.getRole() == Role.USER) {
            repouser.setFname(user.getFname());
            repouser.setLname(user.getLname());
            repouser.setEmail(user.getEmail());
            repouser.setGender(user.getGender());
            repouser.setDob(user.getDob());
            if (!user.getPassword().isEmpty()) {
                repouser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            userRepository.save(repouser);
            return repouser;
        }
        return null;
    }

    public User getUserFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7);
            return authService.getUserFromToken(jwtToken);
        } else {
            return null;
        }
    }
}
