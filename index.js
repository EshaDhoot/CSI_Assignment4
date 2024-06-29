const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const checkRequiredFields = (req, res, next) => {
    const { name, email, age } = req.body

    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required.' })
    }

    next()
}

let users = []
app.post('/user', checkRequiredFields, (req, res) => {
    const { name, email, age } = req.body
    const newUser = {
        id: users.length + 1,
        name,
        email,
        age
    };
    users.push(newUser)
    res.status(201).json(newUser)
})


app.get('/users', (req, res) => {
    res.status(200).json(users)
})

const setUpAndStartServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server running at PORT: ${PORT}`)
    })
}

setUpAndStartServer()