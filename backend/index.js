const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const gamesRouter = require("./routes/games.js")
const mechanicsRouter = require("./routes/mechanics.js")
const typesRouter = require("./routes/types.js")
const authorsRouter = require("./routes/authors.js")
const artistsRouter = require("./routes/artists.js")
const searchesRouter = require("./routes/searches.js")
const usersRouter = require("./routes/users.js")

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

const { authentication, isAdmin } = require("./middleware/authentication.js")

app.use("/games", authentication, isAdmin, gamesRouter);
app.use("/mechanics", authentication, isAdmin, mechanicsRouter);
app.use("/types", authentication, isAdmin, typesRouter);
app.use("/authors", authentication, isAdmin, authorsRouter);
app.use("/artists", authentication, isAdmin, artistsRouter);
app.use("/search", authentication, searchesRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log('server running on ' + PORT));