import { Router } from 'express';
import knex from './database/connections';

const routes = Router()

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*')
    
    const serializedItems = items.map((item)=> (
        {
            id: item.id,
            title: item.name, 
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    ))
    return response.json(items)
})

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body
    
    await knex('points').insert({
        image: 'image-temp',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    })

    return response.json({success: true})
})

export default routes