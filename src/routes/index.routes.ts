import { Router } from "express";

import authRoutes from "@/modules/auth/auth.routes";
import userRoutes from "@/modules/user/user.routes";


const appRoutes = Router();

appRoutes.get('/', (req, res) => res.send('Hellow am i working fine?'))

appRoutes.use('/auth', authRoutes)
appRoutes.use("/users", userRoutes);

export default appRoutes;