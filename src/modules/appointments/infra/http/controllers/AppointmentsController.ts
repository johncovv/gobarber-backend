import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

// import the service to create a new appointment
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppoitmentsController {
	public async create(request: Request, response: Response): Promise<Response> {
		// set request.body fragmenting constants
		const { provider_id, date } = request.body;

		// transform a date into a string into an ISO date format
		const parsedDate = parseISO(date);

		const createAppointment = container.resolve(CreateAppointmentService);

		// execute the service and creation of the appointment
		const appointment = await createAppointment.execute({
			date: parsedDate,
			provider_id,
		});

		// returns the created appointment
		return response.json(appointment);
	}
}
