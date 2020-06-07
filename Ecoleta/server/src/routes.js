// import express, { request, response } from 'express';
const express = require('express');
const knex = require('express');

// import knex from './database/connections'

const routes = express.Router()

routes.get('/items', async (request, response) => {
    const items = await knex.items.select('*')
    
    const serializedItems = items.map((item)=> (
        {
            title: item.name, 
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    ))

    return response.json(items)
})

// export default routes;

module.exports = routes