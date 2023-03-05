import express from 'express';
import stencilRouter from './routes/stencils.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'ok! :D' });
});

app.use('/stencils', stencilRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`The app is now listening on port ${process.env.PORT}`);
});