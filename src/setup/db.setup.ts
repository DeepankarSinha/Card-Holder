import { Collections } from "../constants/collection.constant";
import { TYPES } from "../constants/types.constant";
import { IDatabase } from "../interfaces/database/database.interface";
import { container } from "../inversify.config";

/**
 * Setup database.
 */
export class DbSetup {
    private database: IDatabase;

    constructor() {
        this.database = container.get<IDatabase>(TYPES.Database);
    }

    /**
     * Migrate the database.
     */
    public migrate(): DbSetup {

        // We will add two collections for Card and Customer.
        this.database.addCollection(Collections.Card, {
            indices: ['id'],
        });

        this.database.addCollection(Collections.Customer, {
            indices: ['id'],
        });

        /**
         * Return this instance so that we can chain it with
         * other method in case we decide to expand this class.
         */
        return this;
    }
}