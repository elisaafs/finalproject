const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const db = require("./db/db.js");
const cookieSession = require("cookie-session");
const bc = require("./conf/bcrypt.js");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

const signedOutRedirect = (req, res, next) => {
    if (!req.session.id) {
        res.redirect("/");
    } else {
        next();
    }
};

app.use(compression());

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
    app.use(
        "/bundle.js.map",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    let pass = "";
    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            error: "Please, fill all the fields."
        });
    } else {
        bc.hashPassword(req.body.password.trim())
            .then(hashedPassword => {
                pass = hashedPassword;
                return db
                    .registerUser(
                        req.body.firstName,
                        req.body.lastName,
                        req.body.email.toLowerCase().trim(),
                        pass
                    )
                    .then(registeredUser => {
                        req.session.id = registeredUser.id;
                        res.json({
                            success: true,
                            user: registeredUser
                        });
                    });
            })
            .catch(err => {
                res.json({
                    error: "The email address already exists."
                });
            });
    }
});

app.post("/login", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            error: "Please, fill all the fields."
        });
    } else {
        db.getInfoUser(req.body.email.toLowerCase().trim()).then(results => {
            if (results === undefined || results.length === 0) {
                res.json({
                    error: "Email or password incorrect"
                });
            } else {
                let hashedPassword = results.hashed_password;
                bc.checkPassword(req.body.password.trim(), hashedPassword).then(
                    checked => {
                        if (checked) {
                            req.session.id = results.id;
                            res.json({
                                success: true
                            });
                        } else {
                            res.json({
                                error: "Email or password incorrect"
                            });
                        }
                    }
                );
            }
        });
    }
});

app.get("/user/:id.json", function(req, res) {
    if (req.session && req.params && req.session.id == req.params.id) {
        res.json({
            redirect: "/"
        });
    } else {
        db.getUserById(req.params.id).then(data => {
            res.json({ data });
        });
    }
});

app.get("/otheruser/:userId", function(req, res) {
    db.getUserById(req.params.userId).then(data => {
        res.json(data);
    });
});

app.post("/registration-service", (req, res) => {
    if (
        !req.body.name ||
        !req.body.contact ||
        !req.body.language ||
        !req.body.categorie ||
        !req.body.city ||
        !req.body.country
    ) {
        res.json({
            error: "Please, fill the required fields."
        });
    } else {
        console.log("Here?");
        db.registerService(
            req.session.id,
            req.body.name,
            req.body.homepage,
            req.body.address,
            req.body.categorie,
            req.body.description,
            req.body.contact,
            req.body.subCategorie,
            req.body.language,
            req.body.fluence,
            req.body.city,
            req.body.country
        )
            .then(registeredService => {
                console.log("why we are not getting here?");
                res.json({
                    success: true,
                    service: registeredService
                });
            })
            .catch(err => {
                res.json({
                    success: false
                });
            });
    }
});

function updateProfileInternal(newUserData, req, res) {
    db.editUser(
        newUserData.firstName,
        newUserData.lastName,
        newUserData.email,
        newUserData.hashedPassword,
        newUserData.city,
        newUserData.country,
        newUserData.languageSpeak,
        req.session.id
    ).then(() => {
        res.json({
            redirect: "/"
        });
    });
}
app.post("/uploadpictureservice", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    db.updateServicePicture(
        req.session.id,
        config.s3Url + req.file.filename
    ).then(pictureService => {
        res.json({
            success: true,
            picture: pictureService
        });
    });
});

app.post("/profile/edit", (req, res) => {
    db.getCompleteUserById(req.session.id).then(userData => {
        const newUserData = {
            firstName: req.body.firstName || userData.first_name,
            lastName: req.body.lastName || userData.last_name,
            email: req.body.email || userData.email,
            hashedPassword: userData.hashed_password,
            city: req.body.city || userData.city,
            country: req.body.country || userData.country,
            languageSpeak: req.body.languageSpeak || userData.language_speak
        };
        if (req.body.password != "") {
            bc.hashPassword(req.body.password).then(hashedPassword => {
                newUserData.hashedPassword = hashedPassword;
                updateProfileInternal(newUserData, req, res);
            });
        } else {
            updateProfileInternal(newUserData, req, res);
        }
    });
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    db.updateUserImage(req.session.id, config.s3Url + req.file.filename).then(
        imgUrl => {
            res.json({
                success: true,
                url: imgUrl
            });
        }
    );
});

app.get("/user", signedOutRedirect, function(req, res) {
    db.getUserById(req.session.id)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080);
