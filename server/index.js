import express from 'express';
import { error } from 'node:console';
import fs from 'node:fs/promises';
import path from 'node:path'

const app = express();
const PORT = 3000;
const ROOT = await fs.realpath( path.resolve('../photos'));

//path safety check
async function comparePaths(rel){
    const full = await fs.realpath(path.resolve(ROOT, rel));
    if(full !== ROOT && !full.startsWith(ROOT + path.sep)) return null;
    return full;
}

app.get('/',(req,res) => {res.send("hello world")});

app.get('/api/list', async(req,res) => {
try{    
    const dir = await comparePaths(String(req.query.path || ''));
    if (!dir) return res.status(400).json({error: 'bad path'});

    const entries = await fs.readdir(dir, {withFileTypes: true})
    const items = entries.map((e) => ({
        name: e.name,
        type: e.isDirectory() ? 'dir' : 'file',
    }))
    res.json(items);
}catch{
    res.status(404).json({error: 'not found'})
}
})

app.get('/api/download', async(req,res) => {
    try {
        const file = await comparePaths(String(req.query.path || ''));
        if (!file) return res.status(400).json({error: 'bad path'});

        const stats = await fs.stat(file);
        if (!stats.isFile()) return res.status(400).json({error: 'not a file'})
        
        res.download(file);
    } catch (error) {
        res.status(404).json({error: 'not found'})
    }
});

app.listen(PORT, '127.0.0.1', () => {console.log(`listening on  http://127.0.0.1:${PORT}`)});
