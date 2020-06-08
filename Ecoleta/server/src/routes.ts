import { Router } from 'express';

import PointsController from './controllers/pointsController'
import ItemsController from './controllers/itemsController'

const routes = Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)

export default routes