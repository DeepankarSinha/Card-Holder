import { inject, injectable } from "inversify";
import { Collections } from "../constants/collection.constant";
import { TYPES } from "../constants/types.constant";
import { ICustomerRepository } from "../interfaces/customer/customer-repository.interface";
import { IDatabase } from "../interfaces/database/database.interface";
import { Customer } from "../models/customer.model";
import { shortId } from "../utils/generators.util";

@injectable()
export class CustomerRepository implements ICustomerRepository {
    
    private database: IDatabase;

    constructor(@inject(TYPES.Database) database: IDatabase) {
        this.database = database;
    }
    
    getAll(): Customer[] {
        return this.database.getAll(Collections.Customer);
    }
    
    add(newCustomer: Customer): Customer {
        newCustomer.id = shortId();
        this.database.insert(Collections.Customer, newCustomer);

        return newCustomer;
    }

    exist(customerId: string): boolean {
        const customer = this.database.where(Collections.Customer, (obj: Customer) => obj.id === customerId);

        return customer.length !== 0;
    }

}