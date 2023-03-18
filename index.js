import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

let notes = [{
  id: 1,
  content: 'hola'
}, {
  id: 2,
  content: 'hola'
}, {
  id: 3,
  content: 'hola'
}]

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === Number(req.params.id))
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== Number(req.params.id))
  res.status(204).end()
})

app.post('/notes/', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'Wrong request'
    })
  } else {
    const ids = notes.map(note => note.id)
    console.log(ids)
    const newId = Math.max(...ids) + 1

    const newNote = {
      id: newId,
      content: note.content
    }

    notes = notes.concat(newNote)
    res.json(newNote)
  }
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    endpoint: req.url
  })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('listening on port 3001')
})
