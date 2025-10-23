class HomeController {
    static index = (req, res) => {
        const message = req.session.message;
        delete req.session.message;
        // console.log('sdsdsd')
        res.render('client/home/index', { message: message });
    }

    static login_view = (req, res) => {
        const message = req.session.message;
        delete req.session.message;
        res.render('client/auth/login', { message: message })
    }

    static register_view = (req, res) => {
        const message = req.session.message;
        delete req.session.message;
        res.render('client/auth/register', { message: message })
    }
}


module.exports = HomeController