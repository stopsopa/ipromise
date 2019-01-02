
module.exports = {
    ignorePrefixes: [
        '/api/',
        '/endpoint/',

        // not necessary because it's declared after express.static()
        // '/media/',
        // '/dist/',
        // '/favicon',
    ],
    redirections: [
        {
            test: /^\/([a-z]{2,3})\/?$/,
            buildPath: "/2-3"
        },
        {
            test: /^\/([a-z]{2,3})\/test\/?/,
            buildPath: "/test"
        },
    ]
};

