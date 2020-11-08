import { Container } from "inversify";
import { TYPES } from "./constants/types.constant";
import { Database } from "./database/database.service";
import { ICardRepository } from "./interfaces/card/card-repository.interface";
import { ICardService } from "./interfaces/card/card-service.interface";
import { ICustomerRepository } from "./interfaces/customer/customer-repository.interface";
import { ICustomerService } from "./interfaces/customer/customer-service.interface";
import { IDatabase } from "./interfaces/database/database.interface";
import { ILogger } from "./interfaces/logger/logger.interface";
import { CardRepository } from "./repositories/card.repository";
import { CustomerRepository } from "./repositories/customer.repository";
import { CardService } from "./services/card.service";
import { CustomerService } from "./services/customer.service";
import { Logger } from "./setup/logger.setup";

// Setup IoC container. Inversify provides good support for DI.
const container = new Container();

container.bind<ICardRepository>(TYPES.CardRepository).to(CardRepository);
container.bind<ICardService>(TYPES.CardService).to(CardService);
container.bind<ICustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
container.bind<ICustomerService>(TYPES.CustomerService).to(CustomerService);

// Singletons
container.bind<ILogger>(TYPES.Logger).to(Logger).inSingletonScope();
container.bind<IDatabase>(TYPES.Database).to(Database).inSingletonScope();



export { container };