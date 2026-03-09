package com.innerroot.config;

import com.innerroot.model.*;
import com.innerroot.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final WisdomQuoteRepository wisdomRepository;
    private final CultureItemRepository cultureRepository;
    private final LibraryItemRepository libraryRepository;
    private final EventRepository eventRepository;
    private final GuideRepository guideRepository;
    private final HeritageSiteRepository heritageRepository;

    @Override
    public void run(String... args) throws Exception {
        if (wisdomRepository.count() == 0) {
            seedWisdom();
        }
        if (cultureRepository.count() == 0) {
            seedCulture();
        }
        if (libraryRepository.count() == 0) {
            seedLibrary();
        }
        if (eventRepository.count() == 0) {
            seedEvents();
        }
        if (guideRepository.count() == 0) {
            seedGuides();
        }
        if (heritageRepository.count() == 0) {
            seedHeritage();
        }
    }

    private void seedWisdom() {
        log.info("Seeding Wisdom Quotes...");
        wisdomRepository.saveAll(List.of(
                WisdomQuote.builder().quote("You have the right to work, but never to the fruit of work.")
                        .source("Bhagavad Gita 2.47").theme("Karma").build(),
                WisdomQuote.builder().quote("The mind acts like an enemy for those who do not control it.")
                        .source("Bhagavad Gita 6.6").theme("Mind").build(),
                WisdomQuote.builder().quote(
                        "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.")
                        .source("Bhagavad Gita 6.19").theme("Meditation").build(),
                WisdomQuote.builder().quote("Truth alone triumphs, not falsehood.").source("Mundaka Upanishad")
                        .theme("Truth").build(),
                WisdomQuote.builder().quote("The mind is everything. What you think you become.")
                        .source("Gautama Buddha").theme("Mind").build()));
    }

    private void seedCulture() {
        log.info("Seeding Culture Items...");
        cultureRepository.saveAll(List.of(
                CultureItem.builder().title("Diwali").category("Festivals").description("The festival of lights.")
                        .image("heritage-gold").build(),
                CultureItem.builder().title("Bharatanatyam").category("Arts").description("Ancient classical dance.")
                        .image("heritage-teal").build(),
                CultureItem.builder().title("The Rigveda").category("Scriptures").description("Oldest Vedic text.")
                        .image("heritage-green").build()));
    }

    private void seedLibrary() {
        log.info("Seeding Library Items...");
        libraryRepository.saveAll(List.of(
                LibraryItem.builder().title("Rigveda").category("Vedas").description("Oldest of the four Vedas.")
                        .build(),
                LibraryItem.builder().title("Bhagavad Gita").category("Smriti").description("Divine conversation.")
                        .build()));
    }

    private void seedEvents() {
        log.info("Seeding Events...");
        eventRepository.saveAll(List.of(
                Event.builder().title("Virtual Tour: Varanasi").type("tour").dateString("Tomorrow, 5:30 AM")
                        .build(),
                Event.builder().title("Gita Study Circle").type("study").dateString("Saturday, 6:00 PM")
                        .build()));
    }

    private void seedGuides() {
        log.info("Seeding Guides...");
        guideRepository.saveAll(List.of(
                Guide.builder().name("Rajesh Kumar").specialty("North India Heritage").status("online").build(),
                Guide.builder().name("Lakshmi Devi").specialty("South Indian Temples").status("online").build()));
    }

    private void seedHeritage() {
        log.info("Seeding Heritage Sites...");
        heritageRepository.saveAll(List.of(
                HeritageSite.builder().name("Taj Mahal").location("Agra").description("Symbol of love.").rating(4.9)
                        .build(),
                HeritageSite.builder().name("Varanasi Ghats").location("Varanasi").description("Spiritual heart.")
                        .rating(4.8).build()));
    }
}
