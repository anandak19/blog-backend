import { Router } from "express";

import authRoutes from "@/modules/auth/auth.routes";
import userRoutes from "@/modules/user/user.routes";
import blogRoutes from "@/modules/blog/blog.routes";


const appRoutes = Router();

appRoutes.get('/', (req, res) => res.send('Hellow am i working fine?'))

appRoutes.use('/auth', authRoutes)
appRoutes.use("/users", userRoutes);
appRoutes.use("/blogs", blogRoutes)

export default appRoutes;