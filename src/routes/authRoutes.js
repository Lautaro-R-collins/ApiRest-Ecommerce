import express from "express";

import { registerUser } from "../controllers/authControllers.js";

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', ( req, res) => {
    console.log('login Hiciste una peticion POST a /login')

    res.json({ message: 'Usuario logueado exitosamente' });
})

router.post('/logout', ( req, res) => {
    console.log('logout Hiciste una peticion POST a /logout')

    res.json({ message: 'Usuario deslogueado exitosamente' });
})

router.get('/profile', ( req, res) => {
    console.log('profile Hiciste una peticion POST a /login')

    res.json({ message: 'Usuario logueado exitosamente' });
})

export default router;


//test endpoint
//http://localhost:3000/api/auth/register