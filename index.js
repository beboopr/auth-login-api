import express  from "express";
import cors from "cors"
import { userLogin, addNewUser, updateUser} from "./src/users.js";
const port = 3030
const app = express()
app.use(cors())
app.use(express.json())
app.patch('/users/:uid', updateUser)

app.post('/login', userLogin)
app.post('/users', addNewUser)
app.listen( port, () => console.log(`Listening to http://localhost${port}...`))
