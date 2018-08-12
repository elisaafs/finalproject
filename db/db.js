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
    subCategorie,
    language,
    fluence
) {
    const q = `
          INSERT INTO services (name, homepage, address, categorie, description, contact, sub_categorie, language, fluence)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *
    `;
    const params = [
        name,
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
