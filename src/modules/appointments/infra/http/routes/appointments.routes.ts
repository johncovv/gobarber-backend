import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const apponitmentsRouter = Router();
const appointmentsController = new AppointmentsController();

apponitmentsRouter.use(ensureAuthenticated);

apponitmentsRouter.post('/', appointmentsController.create);

export default apponitmentsRouter;
