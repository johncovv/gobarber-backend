import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
	date: Date;
	provider_id: string;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
	) {}

	public async execute({
		date,
		provider_id,
	}: IRequestDTO): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		// search if there is an appointment with the same date using the repository method
		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		// if there is an appointment with the same date, it returns an error message
		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is already booked!');
		}

		// if not, use the repository's create method to create a new appointment
		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
