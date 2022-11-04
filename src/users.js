import jwt from 'jsonwebtoken'
import dbConnect from './dbConnect.js';
import { secretKey } from '../secrets.js';

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const db = dbConnect();
  const matchingUsers = await db
    .collection("users")
    .where("email", "==", email.toLowerCase())
    .where("password", "==", password)
    .get()
    const users = matchingUsers.docs.map(doc => ({...doc.data(), uid: doc.id }))
    if(!users.length) {
        res.status(401).send({message: 'Invalid email or password' }) // 401 means not allowed. no permision
        return
    }
    // if we get here, we have (at least) one matching user 
    let user = users[0]
    user.password = undefined
    const token = jwt.sign(user, secretKey)
    res.send({user, token})
}

export async function addNewUser(req, res) {
    const { email, password } = req.body
    const db = dbConnect()
    // w should check to see if email already in used
    await db.collection('users').add({email: email.toLowerCase(), password})
    userLogin(req, res)
}

export async function updateUser(req, res) {
 const token = req.headers.authorization
 const decodedToken = jwt.verify(token, secretKey)
 const { uid } = req.params // profile they want to update
if(uid !== decodedToken.uid) {
    res.status(401).send({message: 'Invalid token ID' })
    return
}
const db = dbConnect()
await db.collection('users').doc(uid).update(rq.body)
let user = doc.data()
user.uid = doc.id
user.password = undefined
re.status(202).send({message: 'updated'})
}