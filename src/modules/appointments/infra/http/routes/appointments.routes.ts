import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// import the appointments repository
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
// import the service to create a new appointment
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const apponitmentsRouter = Router();

// aplica a autenticação
apponitmentsRouter.use(ensureAuthenticated);

apponitmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	const appointments = await appointmentsRepository.find();

	return response.json(appointments);
});

apponitmentsRouter.post('/', async (request, response) => {
	// set request.body fragmenting constants
	const { provider_id, date } = request.body;

	// transform a date into a string into an ISO date format
	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService();

	// execute the service and creation of the appointment
	const appointment = await createAppointment.execute({
		date: parsedDate,
		provider_id,
	});

	// returns the created appointment
	return response.json(appointment);
});

export default apponitmentsRouter;
