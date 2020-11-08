import { NewCustomer } from "../../models/application-classes/new-customer.ac";
import { Customer } from "../../models/customer.model";

export interface ICustomerService {

    /**
     * Get all the customers.
     */
    getCustomers(): Customer[];

    /**
     * Add new customer.
     * @param customer New customer to add.
     */
    addCustomer(customer: NewCustomer): string;

    /**
     * Check if customer exist.
     * @param customerId Customer Id.
     */
    isCustomerExist(customerId: string): boolean;
}