import { Body, Get, InternalServerError, JsonController, Post } from "routing-controllers";
import { TYPES } from "../constants/types.constant";
import { ICustomerService } from "../interfaces/customer/customer-service.interface";
import { container } from "../inversify.config";
import { NewCustomer } from "../models/application-classes/new-customer.ac";

@JsonController('/api/customers')
export class CustomerController {

    /**
     * This is the customer controller configured to
     * accept json request and return json response.
     */

    private customerService: ICustomerService;

    constructor() {
        this.customerService = container.get<ICustomerService>(TYPES.CustomerService);
    }

    /**
     * @api {Get} api/customers Get all the customers.
     * @apiName GetCustomers
     * @apiGroup Customers
     * @apiVersion  1.0.0
     * 
     * @apiSuccess (200) {Customers[]} List of customers. 
     */
    @Get()
    getCustomers() {
        return this.customerService.getCustomers();
    }

    /**
     * @api {Post} api/customers Add a new customer.
     * @apiName AddCustomer
     * @apiGroup Customers
     * @apiVersion  1.0.0
     * 
     * @apiSuccess (200) {string} Id of the new customer. 
     */
    @Post()
    addCustomer(@Body({ validate: true }) newCustomer: NewCustomer) {
        try {
            const id = this.customerService.addCustomer(newCustomer);

            return { id: id };
        } catch(err) {
            throw new InternalServerError(err);
        }
    }
}