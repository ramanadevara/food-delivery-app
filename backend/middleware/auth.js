import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers

  console.log()

  if (!token) {
    return res.json({ success: false, message: "You are not authorized" })
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

    req.body.userId = tokenDecode.id

    next()
  } catch (error) {
    console.log(error)
    res.json({
      success: "false",
      message: "Error occured while accessing cart",
    })
  }
}

export default authMiddleware
