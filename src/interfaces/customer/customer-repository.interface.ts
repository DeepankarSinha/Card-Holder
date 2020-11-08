import { Customer } from "../../models/customer.model";

export interface ICustomerRepository {
    /**
     * Get all the customers.
     */
    getAll(): Customer[];

    /**
     * Add new customer.
     * @param newCustomer New customer object.
     */
    add(newCustomer: Customer): Customer;

    /**
     * Check if customer with customerId exist.
     * @param customerId Customer Id.
     */
    exist(customerId: string): boolean;
}