import express from "express";
import routes from './routes/todo.routes.js';
import connectDB from './mongodb/mongodb.connect.js';

connectDB();

const app = express();

app.use(express.json());
app.use("/todos", routes);
app.get('/', (req, res)=>{
    res.send('express test')
})

export default app;
