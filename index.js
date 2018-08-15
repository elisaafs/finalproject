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
const geodist = require("geodist");

const {
    getPlaceId,
    autoCompletePlace,
    getPlaceDetails
} = require("./googlePlace");

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

app.get("/service/:id.json", function(req, res) {
    db.getServiceById(req.params.id).then(data => {
        console.log(data, "data");
        res.json({ data });
    });
});

app.get("/otheruser/:userId", function(req, res) {
    db.getUserById(req.params.userId).then(data => {
        res.json(data);
    });
});

app.post("/registration-service", async (req, res) => {
    if (
        !req.body.name ||
        !req.body.language ||
        !req.body.category ||
        !req.body.placeId ||
        !req.body.placeDescription
    ) {
        res.json({
            error: "requiredFields"
        });
    } else {
        const { longitude, latitude, address } = await getPlaceDetails(
            req.body.placeId
        );
        db.registerService(
            req.session.id,
            req.body.name,
            req.body.category,
            req.body.subcategory,
            req.body.contact,
            req.body.homepage,
            req.body.description,
            longitude,
            latitude,
            address,
            req.body.placeId,
            req.body.placeDescription
        )
            .then(results => {
                db.registerServiceLanguage(
                    req.body.language,
                    req.body.fluence,
                    results.id
                ).then(registeredService => {
                    res.json({
                        success: true,
                        service: registeredService
                    });
                });
            })
            .catch(err => {
                console.log(err);
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
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

app.get("/reviews/:serviceId", (req, res) => {
    db.getReviewsByServiceId(req.params.serviceId)
        .then(reviews => {
            res.json(reviews);
        })
        .catch(err => console.log(err));
});

app.post("/review", (req, res) => {
    db.addReview(req.body.userId, req.session.id, req.body.comment)
        .then(result => {
            res.json({
                success: true,
                review: result
            });
        })
        .catch(err => console.log(err));
});

app.get("/user", signedOutRedirect, function(req, res) {
    db.getUserById(req.session.id)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/place", async (req, res) => {
    const place = req.query.input;
    const result = await getPlaceId(place);
    res.json(result);
});

app.get("/place-complete", async (req, res) => {
    const place = req.query.input;
    const result = await autoCompletePlace(place);
    res.json(result);
});

app.get("/search-service", async (req, res) => {
    const { placeId, language, category, subcategory } = req.query;
    if (!placeId || !language || !category) {
        res.status = 400;
        res.json({
            error: "Please, fill all the fields."
        });
        return;
    }

    const { longitude, latitude } = await getPlaceDetails(placeId);
    const results = await db.findServices(language, category, subcategory);

    const resultsWithDistance = results.map(result => ({
        ...result,
        distance: geodist(
            {
                lat: parseFloat(result.latitude),
                lon: parseFloat(result.longitude)
            },
            {
                lat: latitude,
                lon: longitude
            },
            { exact: true, unit: "km" }
        )
    }));

    const sortedResults = resultsWithDistance.sort(
        (a, b) => a.distance - b.distance
    );

    res.json(sortedResults.slice(0, 10));
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080);
