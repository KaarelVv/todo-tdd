import express from "express";
import routes from './routes/todo.routes.js';
import connectDB from './mongodb/mongodb.connect.js';

connectDB();

const app = express();

app.use(express.json());
app.use("/todos", routes);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', (req, res)=>{
    res.send('express test')
})

export default app;
