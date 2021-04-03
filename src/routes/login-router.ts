import express from "express";
import Router from "express";

const router = express.Router();

// Login a user.
router.get( "/login", ( req, res ) => {
    // Get payload and process with JWT.
    res.send("token devuelto!") ;
} );

export default router;