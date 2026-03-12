import express from "express";

const app = express();

app.get('/', (req, res)=>{
    res.send('express test')
})

export default app;
