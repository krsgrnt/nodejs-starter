import express from 'express';
import cors from 'cors';
import events from 'events';
import https from 'https';
import fs from 'fs';
import 'dotenv/config';

const app = express();
app.use(cors());
const port = 443;
const em = new events.EventEmitter();

https
    .createServer(
        {
            key: fs.readFileSync('./ssl/server.key'),
            cert: fs.readFileSync('./ssl/server.cert'),
        },
        app
    )
    .listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

em.on('knock', data => {
    console.log('Received the knock event: ' + data);
});

em.emit('knock', "who's there?");

console.log(process.env.MY_DATABASE_PASSWORD);
