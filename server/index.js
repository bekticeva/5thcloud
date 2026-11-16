import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path'

const app = express();
const PORT = 3000;
const ROOT = path.resolve('../photos');

app.get('/',(req,res) => {res.send("hello world")});



app.get('/api/list', async(req,res) => {
    const entries = await fs.readdir(ROOT, {withFileTypes: true})
    const items = entries.map((e) => ({
        name: e.name,
        type: e.isDirectory() ? 'dir' : 'file',
    }))
    res.json(items);
})



app.listen(PORT, '127.0.0.1', () => {console.log(`listening on  http://127.0.0.1:${PORT}`)});
