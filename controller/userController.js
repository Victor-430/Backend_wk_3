import {v4 as uuidv4} from "uuid"

const registerUser = (req, res) => {

const {username, email, password} = req.body

if(!username || !email || !password){
    return res.status(400).json({message: "All fields are required"})
}

const existingUser = await userService(email)

const user = {
    id: uuidv4(),
    username,
    email,
    password

}

res.status(201).json({message: "User registered successfully", user})


}

export default registerUser