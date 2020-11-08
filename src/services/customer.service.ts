import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types.constant";
import { ICustomerRepository } from "../interfaces/customer/customer-repository.interface";
import { ICustomerService } from "../interfaces/customer/customer-service.interface";
import { NewCustomer } from "../models/application-classes/new-customer.ac";
import { Customer } from "../models/customer.model";

@injectable()
export class CustomerService implements ICustomerService {
    
    private customerRepository: ICustomerRepository;

    constructor(@inject(TYPES.CustomerRepository) customerRepository: ICustomerRepository){
        this.customerRepository = customerRepository;
    }
    
    getCustomers(): Customer[] {
        return this.customerRepository.getAll();
    }
    
    addCustomer(newCustomer: NewCustomer): string {
        const customer: Customer = {
            name: newCustomer.name,
            address1: newCustomer.address1,
            address2: newCustomer.address2,
            city: newCustomer.city,
            country: newCustomer.country,
            state: newCustomer.state
        };

        const addedCustomer = this.customerRepository.add(customer);

        if(addedCustomer && addedCustomer.id){
            return addedCustomer.id;
        }

        throw new Error('Adding new customer failed.');
    }

    isCustomerExist(customerId: string): boolean {
        return this.customerRepository.exist(customerId);
    }
}