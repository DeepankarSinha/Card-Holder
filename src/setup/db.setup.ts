import { Collections } from "../constants/collection.constant";
import { TYPES } from "../constants/types.constant";
import { IDatabase } from "../interfaces/database/database.interface";
import { container } from "../inversify.config";

export class DbSetup {
    private database: IDatabase;

    constructor() {
        this.database = container.get<IDatabase>(TYPES.Database);
    }

    public migrate(): DbSetup {
        this.database.addCollection(Collections.Card, {
            indices: ['id'],
        });

        this.database.addCollection(Collections.Customer, {
            indices: ['id'],
        });

        return this;
    }
}