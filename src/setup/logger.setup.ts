import { injectable } from 'inversify';
import winston from 'winston';
import { ILogger } from '../interfaces/logger/logger.interface';

@injectable()
export class Logger implements ILogger {

    private logger;

    constructor() {
        // Winston is a good boy!
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf( template => `[${template.timestamp}] ${template.level}: ${template.message}`)
                ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: process.env.LOG_OUT_FILE || 'output.log' })
            ]
        })
    }

    info(message: string): void {
        this.logger.info(message);
    }
    
    debug(message: string): void {
        this.logger.debug(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }
}