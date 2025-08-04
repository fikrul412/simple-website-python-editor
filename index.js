import express from "express" 
import {spawn} from "node:child_process"
import path from 'path'
import { URL } from 'node:url'; 
const __dirname = new URL('.', import.meta.url).pathname;

const app = express()
const port = 3000

app.use(express.json());

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'))
})

app.post('/run', (req, res) =>{
  const cmd = spawn('python', ['-c', req.body.code.toString()])
  cmd.stdout.on('data', data => {
    const output = data.toString()
    res.send(output)
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} \n http://localhost:${port}`)
})
