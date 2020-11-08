import { Body, Get, InternalServerError, JsonController, Post } from "routing-controllers";
import { TYPES } from "../constants/types.constant";
import { ICustomerService } from "../interfaces/customer/customer-service.interface";
import { container } from "../inversify.config";
import { NewCustomer } from "../models/application-classes/new-customer.ac";

@JsonController('/api/customers')
export class CustomerController {

    private customerService: ICustomerService;

    constructor() {
        this.customerService = container.get<ICustomerService>(TYPES.CustomerService);
    }

    @Get()
    getCustomers() {
        return this.customerService.getCustomers();
    }

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