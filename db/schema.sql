DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS services;
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
    author_id INT REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    homepage VARCHAR(100),
    address VARCHAR(200),
    categorie VARCHAR(100) NOT NULL,
    description VARCHAR(400),
    contact VARCHAR(100),
    city VARCHAR(100),
    country VARCHAR(100),
    subcategorie VARCHAR(150),
    picture VARCHAR(300),
    language VARCHAR(100) NOT NULL,
    fluence VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    author_id INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    rate VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
