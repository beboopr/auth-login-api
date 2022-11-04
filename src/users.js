import dbConnect from "./dbConnect.js";

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const db = dbConnect();
  const matchingUsers = await db
    .collection("users")
    .where("email", "==", email.toLowercase())
    .where("password", "==", password)
    .get()
    const users = matchingUsers.docs.map(doc => ({...doc.data(), uid: doc.id }))
    if(!users.length) {
        res.status(401).send({message: 'Invalid email or password' }) // 401 means not allowed. no permision
        return
    }
    // if we get here, we have (at least) one matching user 
    
}
