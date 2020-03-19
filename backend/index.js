const express = require('express');
const app = express();
const PORT = 3000;

const gamesRouter = require("./routes/games.js")
const mechanicsRouter = require("./routes/mechanics.js")
const typesRouter = require("./routes/types.js")
const authorsRouter = require("./routes/authors.js")
const artistsRouter = require("./routes/artists.js")

app.use(express.json());

app.use("/games", gamesRouter);
app.use("/mechanics", mechanicsRouter);
app.use("/types", typesRouter);
app.use("/authors", authorsRouter);
app.use("/artists", artistsRouter);

app.listen(PORT, () => console.log('server running on ' + PORT));