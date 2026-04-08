package com.innerroot.config;

import com.innerroot.model.User;
import com.innerroot.model.HeritageSite;
import com.innerroot.repository.UserRepository;
import com.innerroot.repository.HeritageSiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final HeritageSiteRepository heritageSiteRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed Admin User if not exists
        if (userRepository.findByEmail("admin@innerroot.com").isEmpty()) {
            User admin = User.builder()
                    .name("Super Admin")
                    .email("admin@innerroot.com")
                    .password(passwordEncoder.encode("InnerRootAdmin2026!"))
                    .role(User.Role.ADMIN)
                    .provider(User.AuthProvider.LOCAL)
                    .onboardingCompleted(true)
                    .active(true)
                    .build();
            userRepository.save(admin);
            System.out.println("Default Admin User created: admin@innerroot.com");
        }

        // Seed some sample data for testing the admin dashboard
        if (heritageSiteRepository.count() == 0) {
            heritageSiteRepository.save(HeritageSite.builder()
                            .name("The Golden Temple")
                            .location("Amritsar, Punjab")
                            .description("The holiest Gurdwara of Sikhism.")
                            .imageUrl("https://images.unsplash.com/photo-1548013146-72479768b725")
                            .category("Spiritual")
                            .rating(5.0)
                    .build());
            System.out.println("Sample context seeded for Admin dashboard.");
        }
    }
}
