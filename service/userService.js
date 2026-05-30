const userService = async(email) => {
const findUserEmail = await User.findOne(email)
if (findUserEmail) {
    const error = new Error("User with this email already registered")
    error.status = 400
    throw error
}
}