import express from "express";
import Router from "express";

const router = express.Router();

/* CRUD OPERATIONS */

// Get all users.
router.get( "/", ( req, res ) => {
    res.send("hola mundis!") ;
} );

// Get a single user.
router.get( "/:id", ( req, res ) => {
    res.json({ 'text':  "hola mundis!!"+req.params.id });
} );

// Create a single user.
router.post( "/", ( req, res ) => {
    // GET PAYLOAD AND INSERT
    res.json({ 'text':  "hola mundis!!"+req.params.id });
} );

// Update whole single user.
router.put( "/:id", ( req, res ) => {
    // GET PAYLOAD AND UPDATE ALL
    res.json({ 'text':  "hola mundis!!"+req.params.id });
} );

// Update a subset of single user.
router.patch( "/:id", ( req, res ) => {
    // GET PAYLOAD AND UPDATE
    res.json({ 'text':  "hola mundis!!"+req.params.id });
} );

// Update a subset of single user.
router.delete( "/:id", ( req, res ) => {
    // DELETE
    res.json({ 'text':  "hola mundis!!"+req.params.id });
} );

export default router;