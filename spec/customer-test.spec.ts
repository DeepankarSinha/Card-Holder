import 'jasmine';
import 'reflect-metadata';
import { TYPES } from '../src/constants/types.constant';
import { ICustomerRepository } from '../src/interfaces/customer/customer-repository.interface';
import { container } from '../src/inversify.config';
import { NewCustomer } from '../src/models/application-classes/new-customer.ac';
import { Customer } from '../src/models/customer.model';
import { CustomerService } from '../src/services/customer.service';

const customerRepoMock = {
    add: (customer: Customer) => {
        return { id: 'sa2ff4csdr345' };
    },
    exist: (id: string): boolean => {
        return true;
    },
    getAll: (): Customer[] => { return []; }
};
const customerService = new CustomerService(customerRepoMock);

describe('Customer service', () => {
    beforeEach(() => {

        // create a snapshot so each unit test can modify 
        // it without breaking other unit tests
        container.snapshot();

    });

    afterEach(() => {

        // Restore to last snapshot so each unit test 
        // takes a clean copy of the application container
        container.restore();

    });

    it('should add a new customer', () => {
        container.unbind(TYPES.CustomerRepository);
        container.bind<ICustomerRepository>(TYPES.CustomerRepository).toConstantValue(customerRepoMock);
        const newCustomer: NewCustomer = {
            name: 'test',
            address1: 'add1',
            address2: 'add2',
            city: 'test-city',
            country: 'test-country',
            state: 'test-state'
        }

        const result = customerService.addCustomer(newCustomer);

        expect(result).toBe('sa2ff4csdr345');
    });
});