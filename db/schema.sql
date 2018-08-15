DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS language;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    language_speak VARCHAR(300),
    profile_pic VARCHAR(300),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(150),
    contact VARCHAR(100),
    place_id VARCHAR(200),
    place_description VARCHAR(300),
    address VARCHAR(300),
    longitude VARCHAR(100),
    latitude VARCHAR(100),
    homepage VARCHAR(100),
    description VARCHAR(400),
    picture VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE language (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    language VARCHAR(100) NOT NULL,
    fluence VARCHAR(15)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    author_id INTEGER REFERENCES users(id),
    title TEXT,
    comment TEXT NOT NULL,
    rate VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
