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
        private final WellnessContentRepository wellnessRepository;
        private final UserRepository userRepository;
        private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) throws Exception {
                seedUsers();
                seedWisdom();
                seedCulture();
                seedTours();
                seedLibrary();
                seedDiscussions();
                seedGuides();
                seedEvents();
                seedWellness();
        }

        private void seedUsers() {
                if (userRepository.count() == 0) {
                        // Admin Account
                        userRepository.save(User.builder()
                                        .name("System Administrator")
                                        .email("admin@innerroot.com")
                                        .password(passwordEncoder.encode("InnerRoot2026!"))
                                        .role(User.Role.ADMIN)
                                        .provider(User.AuthProvider.LOCAL)
                                        .active(true)
                                        .onboardingCompleted(true)
                                        .build());

                        // Demo User Account
                        userRepository.save(User.builder()
                                        .name("Demo Explorer")
                                        .email("user@innerroot.com")
                                        .password(passwordEncoder.encode("InnerRoot2026!"))
                                        .role(User.Role.USER)
                                        .provider(User.AuthProvider.LOCAL)
                                        .active(true)
                                        .onboardingCompleted(true)
                                        .build());
                }
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
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("Truth alone triumphs, not falsehood.")
                                        .source("Mundaka Upanishad")
                                        .theme("Truth")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("He who has no attachment can really love others, for his love is pure and divine.")
                                        .source("Swami Vivekananda")
                                        .theme("Love")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("That which is known as Brahman is the eternal truth, the supreme consciousness.")
                                        .source("Taittiriya Upanishad")
                                        .theme("Consciousness")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark.")
                                        .source("Swami Vivekananda")
                                        .theme("Strength")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality.")
                                        .source("Brihadaranyaka Upanishad")
                                        .theme("Enlightenment")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("The soul becomes dyed with the color of its thoughts.")
                                        .source("Marcus Aurelius")
                                        .theme("Thought")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.")
                                        .source("Rumi")
                                        .theme("Love")
                                        .build());
                        wisdomRepository.save(WisdomQuote.builder()
                                        .quote("The wound is the place where the Light enters you.")
                                        .source("Rumi")
                                        .theme("Hope")
                                        .build());
                }
        }

        private void seedCulture() {
                if (cultureRepository.count() == 0) {
                        cultureRepository.save(CultureItem.builder()
                                        .title("Diwali")
                                        .subtitle("Festival of Lights")
                                        .category("festivals")
                                        .origin("Pan-India")
                                        .description("The most celebrated festival symbolizing the victory of light over darkness.")
                                        .significance("Victory of light over darkness; Lakshmi puja for prosperity")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Diwali_Diya.jpg/640px-Diwali_Diya.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Diwali")
                                        .color("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Holi")
                                        .subtitle("Festival of Colors")
                                        .category("festivals")
                                        .origin("Pan-India (North)")
                                        .description("A vibrant spring festival celebrating love, color, and the triumph of good.")
                                        .significance("Spring celebration; triumph of devotion over evil")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Holi_celebrations%2C_braj_mandal.jpg/640px-Holi_celebrations%2C_braj_mandal.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Holi")
                                        .color("heritage-teal")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Sun Temple, Modhera")
                                        .subtitle("Gujarat")
                                        .category("temples")
                                        .origin("Chaulukya Dynasty (1026 CE)")
                                        .description("An architectural masterpiece dedicated to the Sun God Surya.")
                                        .significance("Architectural precision; equinox solar alignment")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Modhera_Sun_Temple_2016.jpg/640px-Modhera_Sun_Temple_2016.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Sun_Temple,_Modhera")
                                        .color("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Onam")
                                        .subtitle("Harvest Festival of Kerala")
                                        .category("state-festivals")
                                        .origin("Kerala")
                                        .description("Harvest festival commemorating the homecoming of King Mahabali.")
                                        .significance("Mythical King Mahabali's homecoming; cultural unity")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Boat_Race_during_Onam%2C_Kerala.jpg/640px-Boat_Race_during_Onam%2C_Kerala.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Onam")
                                        .color("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Atithi Devo Bhava")
                                        .subtitle("Guest is God")
                                        .category("traditions")
                                        .origin("Pan-India")
                                        .description("The ancient Indian philosophy of treating guests with the same reverence as God.")
                                        .significance("Universal hospitality; selfless service")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Namaste2.jpg/480px-Namaste2.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Atithi_Devo_Bhava")
                                        .color("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Dhokla")
                                        .subtitle("Gujarati Steamed Treat")
                                        .category("food")
                                        .origin("Gujarat")
                                        .description("A savory, soft, and spongy steamed cake made from fermented chickpea batter.")
                                        .significance("Gujarati culinary staple; light & nutritious")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Khaman_Dhokla.jpg/640px-Khaman_Dhokla.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Dhokla")
                                        .color("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Dussehra")
                                        .subtitle("Victory of Good over Evil")
                                        .category("festivals")
                                        .origin("Pan-India")
                                        .description("Marks the victory of Lord Rama over Ravana.")
                                        .significance("Rama's victory over Ravana; Durga's triumph over Mahishasura")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ambaji_Temple_Navratri_celebration.jpg/640px-Ambaji_Temple_Navratri_celebration.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Vijayadashami")
                                        .color("heritage-gold")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Eid-ul-Fitr")
                                        .subtitle("Festival of Breaking the Fast")
                                        .category("festivals")
                                        .origin("Pan-India")
                                        .description("Celebrates the end of Ramadan with joy and charity.")
                                        .significance("End of Ramadan fasting; community bonding and charity")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Eid_Prayers_Jama_Masjid.jpg/640px-Eid_Prayers_Jama_Masjid.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Eid_al-Fitr")
                                        .color("heritage-green")
                                        .build());
                        cultureRepository.save(CultureItem.builder()
                                        .title("Kathak")
                                        .subtitle("Classical Dance")
                                        .category("arts")
                                        .origin("Uttar Pradesh")
                                        .description("A storytelling dance form of North India.")
                                        .significance("Vedic storytelling tradition; fusion of Hindu and Mughal courts")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kathak_Performance.jpg/640px-Kathak_Performance.jpg")
                                        .wikiUrl("https://en.wikipedia.org/wiki/Kathak")
                                        .color("heritage-gold")
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
                                        .imageUrl("https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80")
                                        .videoUrl("https://www.youtube.com/watch?v=49HTtI70Y1o")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Varanasi Ghats")
                                        .location("Varanasi, Uttar Pradesh")
                                        .description("The spiritual heart of India on the banks of the sacred Ganges.")
                                        .rating(4.8)
                                        .reviews(1956)
                                        .imageUrl("https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80")
                                        .videoUrl("https://www.youtube.com/watch?v=IgAnj6r1O48")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Khajuraho Temples")
                                        .location("Khajuraho, Madhya Pradesh")
                                        .description("UNESCO World Heritage site known for stunning temple architecture.")
                                        .rating(4.7)
                                        .reviews(1234)
                                        .imageUrl("https://images.unsplash.com/photo-1623497847953-b9035133379a?auto=format&fit=crop&w=800&q=80")
                                        .videoUrl("https://www.youtube.com/watch?v=IgAnj6r1O48")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Hampi Ruins")
                                        .location("Hampi, Karnataka")
                                        .description("The remains of the glorious Vijayanagara Empire.")
                                        .rating(4.8)
                                        .reviews(1089)
                                        .imageUrl("https://images.unsplash.com/photo-1600100598655-e8d1a34d88e4?auto=format&fit=crop&w=800&q=80")
                                        .videoUrl("https://www.youtube.com/watch?v=IgAnj6r1O48")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Amber Fort")
                                        .location("Jaipur, Rajasthan")
                                        .description("Majestic hilltop fort blending Hindu and Mughal styles.")
                                        .rating(4.7)
                                        .reviews(2156)
                                        .imageUrl("https://images.unsplash.com/photo-1599661046289-e318dcbee006?auto=format&fit=crop&w=800&q=80")
                                        .videoUrl("https://www.youtube.com/watch?v=IgAnj6r1O48")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Konark Sun Temple")
                                        .location("Konark, Odisha")
                                        .description("A 13th-century temple shaped like a giant chariot.")
                                        .rating(4.6)
                                        .reviews(876)
                                        .imageUrl("https://images.unsplash.com/photo-1628068765360-1534065606d0?auto=format&fit=crop&w=800&q=80")
                                        .videoUrl("https://www.youtube.com/watch?v=IgAnj6r1O48")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Ajanta Caves")
                                        .location("Aurangabad, Maharashtra")
                                        .description("30 rock-cut Buddhist cave monuments including masterpieces of Buddhist religious art.")
                                        .rating(4.9)
                                        .reviews(1542)
                                        .imageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ajanta_Caves_panorama.jpg/640px-Ajanta_Caves_panorama.jpg")
                                        .videoUrl("https://www.youtube.com/watch?v=SAnvT9v_V04")
                                        .build());
                        toursRepository.save(HeritageSite.builder()
                                        .name("Jaisalmer Fort")
                                        .location("Jaisalmer, Rajasthan")
                                        .description("One of the very few 'living forts' in the world, built in 1156 CE.")
                                        .rating(4.8)
                                        .reviews(1892)
                                        .imageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Jaisalmer_Fort_2.jpg/640px-Jaisalmer_Fort_2.jpg")
                                        .videoUrl("https://www.youtube.com/watch?v=IgAnj6r1O48")
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
                                        .image("https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Isha Upanishad")
                                        .category("Upanishads")
                                        .description("One of the shortest yet most profound Upanishads, exploring the nature of self.")
                                        .chapters("18 Verses")
                                        .image("https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Bhagavad Gita")
                                        .category("Smriti")
                                        .description("The divine conversation between Arjuna and Krishna on the battlefield of Kurukshetra.")
                                        .chapters("18 Chapters")
                                        .image("https://images.unsplash.com/photo-1594132646633-b247f5d09f7f?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Yoga Sutras of Patanjali")
                                        .category("Philosophy")
                                        .description("The foundational text of Yoga philosophy, systematizing the practice.")
                                        .chapters("4 Padas")
                                        .image("https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Samaveda")
                                        .category("Vedas")
                                        .description("The Veda of melodies and chants, primarily focused on musical notations.")
                                        .chapters("2 Parts")
                                        .image("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Aryabhatiya")
                                        .category("Science")
                                        .author("Aryabhata")
                                        .description("A foundational Sanskrit astronomical and mathematical treatise.")
                                        .chapters("121 Verses")
                                        .readTime("2h 30m")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Aryabhata_statue_at_IUCAA.jpg/480px-Aryabhata_statue_at_IUCAA.jpg")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Sushruta Samhita")
                                        .category("Science")
                                        .author("Sushruta")
                                        .description("An ancient Sanskrit text on medicine and surgery, one of the most important surviving ancient treatises on medical study.")
                                        .chapters("184 Chapters")
                                        .readTime("20h+")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Sushruta_statue.jpg/480px-Sushruta_statue.jpg")
                                        .build());
                        libraryRepository.save(LibraryItem.builder()
                                        .title("Abhijnanashakuntalam")
                                        .category("Literature")
                                        .author("Kalidasa")
                                        .description("A celebrated Sanskrit play about the love between King Dushyanta and Shakuntala.")
                                        .chapters("7 Acts")
                                        .readTime("4h")
                                        .image("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shakuntala_by_Raja_Ravi_Varma.jpg/640px-Shakuntala_by_Raja_Ravi_Varma.jpg")
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

        private void seedWellness() {
                if (wellnessRepository.count() == 0) {
                        wellnessRepository.save(WellnessContent.builder()
                                        .title("Morning Sun Salutation")
                                        .type("yoga")
                                        .description("A series of 12 powerful yoga poses that provide a great cardiovascular workout.")
                                        .duration("15 min")
                                        .difficulty("beginner")
                                        .imageUrl("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        wellnessRepository.save(WellnessContent.builder()
                                        .title("Transcendental Meditation")
                                        .type("meditation")
                                        .description("A simple, natural technique that allows your mind to settle inward beyond thought.")
                                        .duration("20 min")
                                        .difficulty("intermediate")
                                        .imageUrl("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80")
                                        .build());
                        wellnessRepository.save(WellnessContent.builder()
                                        .title("Om Chanting")
                                        .type("chanting")
                                        .description("The primordial sound of the universe, helping align your energy centers.")
                                        .duration("10 min")
                                        .difficulty("beginner")
                                        .audioUrl("https://www.soundscape.com/om.mp3")
                                        .build());
                        wellnessRepository.save(WellnessContent.builder()
                                        .title("Anulom Vilom Pranayama")
                                        .type("breathing")
                                        .description("Alternate nostril breathing to balance the nervous system and calm the mind.")
                                        .duration("5 min")
                                        .difficulty("beginner")
                                        .imageUrl("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80")
                                        .build());
                }
        }
}
