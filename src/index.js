const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const cars = require('./cars.json');

const PORT = process.env.PORT || 3001; // Use the provided port or default to 3001

//get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

//get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

//update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.json(newCar);
});

//start app
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
