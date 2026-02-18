package com.innerroot.config;

import com.innerroot.model.*;
import com.innerroot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

        private final WisdomQuoteRepository wisdomRepository;
        private final CultureItemRepository cultureRepository;
        private final HeritageSiteRepository toursRepository;
        private final LibraryItemRepository libraryRepository;
        private final CommunityPostRepository discussionRepository;
        private final GuideRepository guideRepository;
        private final EventRepository eventRepository;

        @Override
        public void run(String... args) throws Exception {
                seedWisdom();
                seedCulture();
                seedTours();
                seedLibrary();
                seedDiscussions();
                seedGuides();
                seedEvents();
        }

        private void seedWisdom() {
                if (wisdomRepository.count() == 0) {
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("You have the right to work, but never to the fruit of work.")
                                        .source("Bhagavad Gita 2.47")
                                        .theme("Karma")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("The mind acts like an enemy for those who do not control it.")
                                        .source("Bhagavad Gita 6.6")
                                        .theme("Mind")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.")
                                        .source("Bhagavad Gita 6.19")
                                        .theme("Meditation")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("The mind is everything. What you think you become.")
                                        .source("Bhagavad Gita, Chapter 6")
                                        .theme("General")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("In the midst of darkness, light persists.")
                                        .source("Upanishads")
                                        .theme("General")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("Arise, awake, and stop not till the goal is reached.")
                                        .source("Katha Upanishad")
                                        .theme("General")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("The soul is neither born, nor does it die.")
                                        .source("Bhagavad Gita 2.20")
                                        .theme("General")
                                        .build());
                }
        }

        private void seedCulture() {
                if (cultureRepository.count() == 0) {
                        cultureRepository.save(CultureItem.builder()
                                        .title("Diwali - Festival of Lights")
                                        .category("festivals")
                                        .description("The most celebrated festival symbolizing the victory of light over darkness.")
                                        .image("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Bharatanatyam")
                                        .category("arts")
                                        .description("One of the oldest classical dance forms originating from Tamil Nadu.")
                                        .image("heritage-teal")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("The Rigveda")
                                        .category("scriptures")
                                        .description("The oldest known Vedic Sanskrit text, composed around 1500 BCE.")
                                        .image("heritage-green")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Holi - Festival of Colors")
                                        .category("festivals")
                                        .description("A vibrant spring festival celebrating love, color, and the triumph of good.")
                                        .image("heritage-brown")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Kuchipudi")
                                        .category("arts")
                                        .description("A classical dance-drama from Andhra Pradesh with roots in ancient Natya Shastra.")
                                        .image("heritage-teal")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Bhagavad Gita")
                                        .category("scriptures")
                                        .description("The divine song of Krishna, containing the essence of Vedic wisdom.")
                                        .image("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Guru-Shishya Parampara")
                                        .category("traditions")
                                        .description("The sacred tradition of knowledge transmission from teacher to student.")
                                        .image("heritage-green")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Navaratri")
                                        .category("festivals")
                                        .description("Nine nights dedicated to the worship of Goddess Durga and her forms.")
                                        .image("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Kathakali")
                                        .category("arts")
                                        .description("A story-play dance form from Kerala with elaborate costumes and makeup.")
                                        .image("heritage-brown")
                                        .build());
                }
        }

        private void seedTours() {
                if (toursRepository.count() == 0) {
                        toursRepository.save(HeritageSite.builder()
                                        .name("Taj Mahal")
                                        .location("Agra, Uttar Pradesh")
                                        .description("The iconic symbol of eternal love and Mughal architecture.")
                                        .rating(4.9)
                                        .reviews(2847)
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Varanasi Ghats")
                                        .location("Varanasi, Uttar Pradesh")
                                        .description("The spiritual heart of India on the banks of the sacred Ganges.")
                                        .rating(4.8)
                                        .reviews(1956)
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Khajuraho Temples")
                                        .location("Khajuraho, Madhya Pradesh")
                                        .description("UNESCO World Heritage site known for stunning temple architecture.")
                                        .rating(4.7)
                                        .reviews(1234)
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Hampi Ruins")
                                        .location("Hampi, Karnataka")
                                        .description("The remains of the glorious Vijayanagara Empire.")
                                        .rating(4.8)
                                        .reviews(1089)
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Amber Fort")
                                        .location("Jaipur, Rajasthan")
                                        .description("Majestic hilltop fort blending Hindu and Mughal styles.")
                                        .rating(4.7)
                                        .reviews(2156)
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Konark Sun Temple")
                                        .location("Konark, Odisha")
                                        .description("A 13th-century temple shaped like a giant chariot.")
                                        .rating(4.6)
                                        .reviews(876)
                                        .build());
                }
        }

        private void seedLibrary() {
                if (libraryRepository.count() == 0) {
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Rigveda")
                                        .category("Vedas")
                                        .description("The oldest of the four Vedas, containing 1028 hymns dedicated to various deities.")
                                        .chapters("10 Mandalas")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Isha Upanishad")
                                        .category("Upanishads")
                                        .description("One of the shortest yet most profound Upanishads, exploring the nature of self.")
                                        .chapters("18 Verses")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Bhagavad Gita")
                                        .category("Smriti")
                                        .description("The divine conversation between Arjuna and Krishna on the battlefield of Kurukshetra.")
                                        .chapters("18 Chapters")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Yoga Sutras of Patanjali")
                                        .category("Philosophy")
                                        .description("The foundational text of Yoga philosophy, systematizing the practice.")
                                        .chapters("4 Padas")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Samaveda")
                                        .category("Vedas")
                                        .description("The Veda of melodies and chants, primarily focused on musical notations.")
                                        .chapters("2 Parts")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Katha Upanishad")
                                        .category("Upanishads")
                                        .description("The story of Nachiketa and Yama, exploring death and the nature of reality.")
                                        .chapters("2 Chapters")
                                        .build());
                }
        }

        private void seedDiscussions() {
                if (discussionRepository.count() == 0) {
                        discussionRepository.save(CommunityPost.builder()
                                        .title("The relevance of Gita in modern life")
                                        .author("Priya Sharma")
                                        .replies(47)
                                        .views(1234)
                                        .build());
                        discussionRepository.save(CommunityPost.builder()
                                        .title("Best heritage sites for meditation?")
                                        .author("Rahul Kumar")
                                        .replies(23)
                                        .views(567)
                                        .build());
                        discussionRepository.save(CommunityPost.builder()
                                        .title("Understanding the symbolism in temple architecture")
                                        .author("Anita Iyer")
                                        .replies(89)
                                        .views(2341)
                                        .build());
                        discussionRepository.save(CommunityPost.builder()
                                        .title("Traditional vs modern yoga practice")
                                        .author("Vikram Singh")
                                        .replies(156)
                                        .views(4521)
                                        .build());
                }
        }

        private void seedGuides() {
                if (guideRepository.count() == 0) {
                        guideRepository.save(Guide.builder()
                                        .name("Rajesh Kumar")
                                        .specialty("North India Heritage")
                                        .status("online")
                                        .build());
                        guideRepository.save(Guide.builder()
                                        .name("Lakshmi Devi")
                                        .specialty("South Indian Temples")
                                        .status("online")
                                        .build());
                        guideRepository.save(Guide.builder()
                                        .name("Amit Joshi")
                                        .specialty("Ancient Scriptures")
                                        .status("away")
                                        .build());
                }
        }

        private void seedEvents() {
                if (eventRepository.count() == 0) {
                        eventRepository.save(Event.builder()
                                        .title("Virtual Tour: Varanasi at Dawn")
                                        .dateString("Tomorrow, 5:30 AM")
                                        .type("tour")
                                        .build());
                        eventRepository.save(Event.builder()
                                        .title("Gita Study Circle")
                                        .dateString("Saturday, 6:00 PM")
                                        .type("study")
                                        .build());
                        eventRepository.save(Event.builder()
                                        .title("Meditation Workshop")
                                        .dateString("Sunday, 7:00 AM")
                                        .type("wellness")
                                        .build());
                }
        }
}
