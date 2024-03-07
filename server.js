const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const cors = require('cors')

app.use(cors())

const obj = {
    'lily': {
        'class': 'mage',
        'level': 25,
    },
    'kim': {
        'class': 'mage',
        'level': 25,
    },
    'austin': {
        'class': 'adc',
        'level': 23
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (req, res) => {
    const user = req.params.name
    res.json(obj[user])
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})