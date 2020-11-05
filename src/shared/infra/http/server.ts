import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

// import database connection
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', express.static(uploadConfig.directory));

app.use('/api', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			code: err.statusCode,
			message: err.message,
		});
	}

	// eslint-disable-next-line no-console
	console.error(err);

	return response.status(500).json({
		status: 'error',
		code: 500,
		message: 'Internal server error',
	});
});

const port = process.env.PORT || 3333;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`\n🚀 Server started on port ${port}\n`));
