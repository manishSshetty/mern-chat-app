import express from "express"
import { editProfile, getCurrentUser, getOtherUsers, search } from "../controllers/user.controllers.js"
import { isAuth } from "../middleware/isAuth.js"
import { upload } from "../middleware/multer.js"

const userRouter=express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/other",isAuth,getOtherUsers)
userRouter.get("/search",isAuth,search)
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)

export default userRouter