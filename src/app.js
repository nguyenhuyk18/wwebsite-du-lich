// framework express
const express = require('express');
// bodyparser để lấy dữ liệu từ form
const bodyParser = require('body-parser');
// session
const session = require('express-session');
// nơi lưu trữ session
const FileStore = require('session-file-store')(session);
// nơi điều hành chính
const app = express();
// .env
require('dotenv').config();
// cookie
const cookieParser = require('cookie-parser');
// passport
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const redisStore = require('./database/connectRedisDB');

// Set up session
app.use(session({
    store: new FileStore({}),
    secret: 'phattrienungdunghihi',
    resave: false,
    saveUninitialized: false,

}));


// Khởi tạo Passport
app.use(passport.initialize());
// app.use(passport.session());


// Serialize & Deserialize user (tùy cách lưu user của bạn)
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//     done(null, obj);
// });


// Cấu hình Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3256/auth/google/callback"
// },
//     (accessToken, refreshToken, profile, done) => {
//         // Xử lý user ở đây (lưu DB hoặc trả về profile)

//         return done(null, profile);
//     }
// ));


// nơi để import middleware
// const checkLoginAdminSite = require('./middlewares/checkLoginAdminSite');
app.use(cookieParser());

const port = process.env.PORT || 6969;

// set up ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// các file tỉnh cố định
app.use(express.static('public'));




const helpers = require('./util/helpers');
// rules: những thuộc tính trong app.locals sẽ trở thành tên biến bên view
// vd: thuộc tính helpers bên trái sẽ trở thành biến helpers trong view
app.locals.helpers = helpers;

// middlewares
app.use((req, res, next) => {
    app.locals.currentRoute = helpers.getCurrentRoute(req.path);
    next();
})


// app.use((req, res, next) => {

// })


app.use((req, res, next) => {
    app.locals.login = helpers.getUserSession(req.session.login);
    // console.log('sdsdsd')
    next();
});


app.use((req, res, next) => {
    app.locals.message = helpers.getUserSession(req.session.login);
    next();
});


// app.use((req, res, next) => {
//     const idrole = req.session.login?.role_id ?? null;
//     app.locals.id_role = helpers.getIdRole(idrole);
//     app.locals.status_order = 0;
//     next();
// });

// require router client
const clientRouters = require('./routers/clientRouters');
app.use('/', clientRouters);


app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
});