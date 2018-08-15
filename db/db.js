const spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg(`postgres:Elisa:elisa1@localhost:5432/finalproject`);
}

exports.registerUser = function(firstName, lastName, email, hashedPassword) {
    const q = `
          INSERT INTO users (first_name, last_name, email, hashed_password)
          VALUES ($1, $2, $3, $4)
          RETURNING *
    `;
    const params = [firstName, lastName, email, hashedPassword];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getInfoUser = function(email) {
    const q = `SELECT email, hashed_password, id FROM users WHERE email= $1;`;
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.registerService = function(
    authorId,
    name,
    category,
    subcategory,
    contact,
    homepage,
    description,
    longitude,
    latitude,
    address,
    placeId,
    placeDescription
) {
    const q = `
        INSERT INTO services (author_id, name, category, subcategory, contact, homepage, description, longitude, latitude, address, place_id, place_description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
    `;
    const params = [
        authorId,
        name,
        category,
        subcategory,
        contact,
        homepage,
        description,
        longitude,
        latitude,
        address,
        placeId,
        placeDescription
    ];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.registerServiceLanguage = function(language, fluence, serviceId) {
    const q = `
        INSERT INTO language (language, fluence, service_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const params = [language, fluence, serviceId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.updateServicePicture = function(serviceId, servicePic) {
    const q = `
        UPDATE services SET
        picture = $2
        WHERE id = $1
        RETURNING *;
        `;
    const params = [serviceId, servicePic];
    return db.query(q, params).then(results => {
        return results.rows[0].cover_pic;
    });
};

exports.updateUserImage = function(userId, profilePic) {
    const q = `
        UPDATE users SET
        profile_pic = $2
        WHERE id = $1
        RETURNING *;
        `;
    const params = [userId, profilePic];
    return db.query(q, params).then(results => {
        return results.rows[0].profile_pic;
    });
};

exports.getUserById = function(userId) {
    const q = `SELECT id, first_name, last_name, profile_pic, email, city, country, language_speak FROM users WHERE id= $1;`;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getServiceById = function(serviceId) {
    const q = `SELECT * FROM services
    LEFT JOIN language ON language.service_id = services.id WHERE services.id = $1;`;
    const params = [serviceId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.editUser = function(
    firstName,
    lastName,
    email,
    hashedPassword,
    city,
    country,
    languageSpeak,
    userId
) {
    const q = `UPDATE users SET first_name = $1, last_name = $2, email = $3, hashed_password = $4, city = $6, country = $7, language_speak = $8 WHERE id = $5
    RETURNING id, first_name, last_name, email, city, country, language_speak;`;

    const params = [
        firstName,
        lastName,
        email,
        hashedPassword,
        userId,
        city,
        country,
        languageSpeak
    ];

    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getCompleteUserById = function(userId) {
    const q = `SELECT * FROM users WHERE id= $1;`;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getReviewsByServiceId = function(serviceId) {
    const query = `SELECT * FROM reviews WHERE service_id = $1 ORDER BY created_at DESC`;
    const params = [serviceId];
    return db.query(query, params).then(results => {
        return results.rows;
    });
};

exports.addReview = function(userId, authorId, title, comment, rate) {
    const query = `
          INSERT INTO reviews (service_id, author_id, comment, rate)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
    `;
    const params = [userId, authorId, title, comment, rate];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};

exports.findServices = function(language, category, subcategory) {
    let query, params;
    if (subcategory) {
        query = `SELECT * FROM services
            LEFT JOIN language ON language.service_id = services.id
            WHERE language = $1 AND category=$2 AND subcategory=$3;`;
        params = [language, category, subcategory];
    } else {
        query = `SELECT * FROM services
            LEFT JOIN language ON language.service_id = services.id
            WHERE language = $1 AND category = $2;`;
        params = [language, category];
    }
    return db.query(query, params).then(results => {
        return results.rows;
    });
};
