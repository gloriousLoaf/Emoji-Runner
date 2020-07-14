/* IMPORTANT - For dev phase, I wrote an http server. This file started
    with boilerplate from an Express server. I left that in, commented-out,
    so it can be used later? Once its written, maybe have the production
    server at top, with dev server commented out below it to toggle?
    
    Current setup WILL NOT work in production. That doesn't matter now,
    as this is all sandboxed inside the game-demo directory. 
    
    MUST DO:  ** npm i **  within game-demo, then run  ** node server **

    For instructions on setting up p5 to work with Express / Heroku:
    https://devcenter.heroku.com/categories/nodejs-support /*

/* Dependecies */
const http = require(`http`); // this will go away
const path = require(`path`);
const fs = require(`fs`);

/* Express */
// const app = express();
const PORT = process.env.PORT || 3000;
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

/* Router */
// require(`./routes/apiRoutes`)(app);
// require(`./routes/htmlRoutes`)(app);

// handle requests, prepare for our server
const handleRequest = (req, res) => {
    // path requested
    let pathname = req.url;
    if (pathname == '/') {
        pathname = '/public/index.html';
    }
    // file extension
    let ext = path.extname(pathname);
    // map extension to file type
    const typeExt = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    // if unknown default to plain text - probably don't need this
    let contentType = typeExt[ext] || 'text/plain';
    // Now read and write back the file with the appropriate content type
    fs.readFile(__dirname + pathname, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end(`Error loading ${pathname}`);
        }
        // Dynamically setting content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
};

// dev environment server
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
});

// Listen - for Express!!!
// app.listen(PORT, () => {
//     console.log(`App listening on PORT ${PORT}`);
// });