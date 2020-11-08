import { Express } from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { TYPES } from './constants/types.constant';
import { CardController } from './controllers/card.controller';
import { CustomerController } from './controllers/customer.controller';
import { ILogger } from './interfaces/logger/logger.interface';
import { container } from './inversify.config';
import { DbSetup } from './setup/db.setup';

export const start = () => {
    const port = process.env.PORT;
    const logger = container.get<ILogger>(TYPES.Logger);

    /**
     * We are using routing controllers with express backend. 
     * For more info on routing controller: https://github.com/typestack/routing-controllers
     */

    const app = createExpressServer({
        cors: true,
        // Inject the controllers here.
        controllers: [
            CardController,
            CustomerController
        ]
    });

    if (port) {
        (app as Express).listen(port, () => {
            logger.info(`Listening to ${port}, Loud and Clear, over!`);

            // Now that the application is listening to the port, we must migrate our database.
            new DbSetup().migrate();
        });
    } else {
        logger.error('Expect me to serve you without port, master?');
    }

    process.on('uncaughtException', error => {
        logger.error(`**COUGH** **COUGH** I am crashing... **COUGH** **COUGH**
        Error: ${error.message} 
        Stack: ${error.stack}`);
    });

    process.on('exit', () => {
        logger.info('Shutting down...');
    });
}