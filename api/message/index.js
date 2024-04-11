module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Import required modules
    const express = require('express');
    const cors = require('cors');

    // Create Express.js app
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Define cars data
    const cars = require('./cars.json');

    // Define Express.js routes
    // Get all cars
    app.get('/api/message', (req, res) => {
        res.json(cars);
    });

    // Get car by id
    app.get('/api/message/:id', (req, res) => {
        const id = req.params.id;
        const car = cars.find(car => car.id === id);
        res.json(car);
    });

    // Update car
    app.put('/api/message/:id', (req, res) => {
        const id = req.params.id;
        const updatedCar = req.body;
        const index = cars.findIndex(car => car.id === id);
        cars[index] = updatedCar;
        res.json(updatedCar);
    });

    // Delete car
    app.delete('/api/message/:id', (req, res) => {
        const id = req.params.id;
        const index = cars.findIndex(car => car.id === id);
        cars.splice(index, 1);
        res.json({ message: `Car with id ${id} deleted` });
    });

    // Add car
    app.post('/api/message', (req, res) => {
        const newCar = req.body;
        cars.push(newCar);
        res.json(newCar);
    });

    // Listen for requests
    app(req, context.res);
};
