import express  from "express";
import cors from "cors"
const port = 3030
const app = express()
app.use(cors())
app.use(express.json())

app.post('/login', userLogin)
app.post('/user', addNewUser)
app.listen, port, () => console.log(`Listening to http://localhost${port}...`)
