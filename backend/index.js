const express = require('express');
const app = express();
const PORT = 3000;

const gamesRouter = require("./routes/games.js")

app.use(express.json());

app.use("/games", gamesRouter);

app.listen(PORT, () => console.log('server running on ' + PORT));