import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
	date: Date;
	provider_id: string;
}

class CreateAppointmentService {
	// execution method with a return of type Promise
	// unstructured parameters of the RequestDTO interface
	public async execute({
		date,
		provider_id,
	}: RequestDTO): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		const appointmentDate = startOfHour(date);

		// search if there is an appointment with the same date using the repository method
		const findAppointmentInSameDate = await appointmentsRepository.findByDate(
			appointmentDate,
		);

		// if there is an appointment with the same date, it returns an error message
		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is already booked!');
		}

		// if not, use the repository's create method to create a new appointment
		const appointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
