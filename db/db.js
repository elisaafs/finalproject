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
    name,
    homepage,
    address,
    categorie,
    description,
    contact,
    city,
    country,
    authorId,
    subCategorie,
    language,
    fluence
) {
    const q = `
          INSERT INTO services (author_id, name, homepage, address, categorie, description, contact, subcategorie, language, fluence, city, country)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *
    `;
    const params = [
        name,
        authorId,
        homepage,
        address,
        categorie,
        description,
        contact,
        subCategorie,
        language,
        fluence
    ];
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

exports.editUser = function(
    firstName,
    lastName,
    email,
    hashedPassword,
    city,
    country,
    userId,
    languageSpeak
) {
    const q = `UPDATE users SET first_name = $1, last_name = $2, email = $3, hashed_password = $4, city = $6, country = $7, language_speak = $8 WHERE id = $5
    RETURNING id, first_name, last_name, email, city, country, language_speak;`;

    const params = [
        firstName,
        lastName,
        email,
        hashedPassword,
        city,
        country,
        userId,
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
