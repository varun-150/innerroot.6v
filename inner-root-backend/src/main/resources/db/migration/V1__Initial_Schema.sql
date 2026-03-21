-- Initial Schema for Inner Root Platform

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255),
    profile_picture VARCHAR(500),
    provider VARCHAR(20),
    provider_id VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    learning_goals VARCHAR(500),
    usage_intent VARCHAR(500),
    occupation VARCHAR(100),
    age INT,
    age_group VARCHAR(20),
    address VARCHAR(300),
    region VARCHAR(200),
    interests VARCHAR(500),
    meditation_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    total_sessions INT DEFAULT 0,
    unlocked_badges VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Heritage Sites Table
CREATE TABLE IF NOT EXISTS heritage_sites (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200),
    description TEXT,
    rating DOUBLE,
    reviews INT,
    image_url VARCHAR(500) NOT NULL,
    video_url VARCHAR(500),
    category VARCHAR(50)
);

-- Wellness Content Table
CREATE TABLE IF NOT EXISTS wellness_content (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    type VARCHAR(50), -- meditation, yoga, chanting, breathing
    description TEXT,
    duration VARCHAR(50),
    difficulty VARCHAR(50),
    audio_url VARCHAR(500),
    image_url VARCHAR(500)
);

-- Wisdom Quotes Table
CREATE TABLE IF NOT EXISTS wisdom_quotes (
    id VARCHAR(36) PRIMARY KEY,
    quote TEXT NOT NULL,
    source VARCHAR(150),
    theme VARCHAR(50)
);

-- Japa Logs Table
CREATE TABLE IF NOT EXISTS japa_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    beads_count INT,
    total_malas INT,
    mantra VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Mood Entries Table
CREATE TABLE IF NOT EXISTS mood_entries (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    mood VARCHAR(50) NOT NULL,
    intensity INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Library Items Table
CREATE TABLE IF NOT EXISTS library_items (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    author VARCHAR(100),
    description TEXT,
    chapters VARCHAR(100),
    read_time VARCHAR(50),
    image VARCHAR(500)
);

-- Culture Items Table
CREATE TABLE IF NOT EXISTS culture_items (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(150),
    category VARCHAR(100),
    origin VARCHAR(100),
    description TEXT,
    significance TEXT,
    image VARCHAR(500),
    wiki_url VARCHAR(500),
    color VARCHAR(30)
);
