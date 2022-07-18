const passport = require('passport');
// 把匿名函数定义和exports放在一起
// app 是在index.js定义的，这里包装成函数的参数，供index.js调用
module.exports = (app) => {
    app.get(
        // first argument, when user visit this url
        '/auth/google', 
        // second argument, 
        // we use passport module to request these info from google server
        passport.authenticate(
            // use google strategy
            'google',
            {scope: ['profile','email']}
        )
    );
    
    app.get(
        // first argument, google will redirect user to this uri
        // 
        '/auth/google/callback', 
        // second argument
        passport.authenticate(
            // use google strategy
            'google'
            // google send the code to server,
            // passport use code to get info from google
        ),
        (req, res) => {
            res.redirect('/');
        }
    );
    // passport will kill the cookie
    app.get('/api/logout', (req, res) => {
        req.logout();
        //res.send(req.user); // if logout, no content
        res.redirect('/');
    });

    // 这是一个test，访问这个地址，顺利的话，我们的server就知道目前是哪个user在访问
    // 直接返回数据库里的一条instance，
    app.get('/api/current_user',(req, res) => {
        res.send(req.user);
        // res.send(req.session); // req.session 是cookie session返回的结果，供 passport 提取user id
    });
}
