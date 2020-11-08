import Loki from 'lokijs';
import { injectable } from 'inversify';
import { IDatabase } from '../interfaces/database/database.interface';

@injectable()
export class Database implements IDatabase{
    private db: Loki;

    constructor() {
        this.db = new Loki(process.env.DB || 'defaultdb');
    }

    getCollection(collectionName: string): Collection<any> {
        return this.db.getCollection(collectionName);
    }

    addCollection(collectionName: string, option: any): Collection<any> {
        return this.db.addCollection(collectionName, option);
    }

    insert(collectionName: string, document: any): void {
        const collection = this.db.getCollection(collectionName);
        collection.insert(document);
    }

    update(collectionName: string, document: any): void {
        const collection = this.db.getCollection(collectionName);
        collection.update(document);
    }

    where(collectionName: string, filter: any): any[] {
        const collection = this.db.getCollection(collectionName);

        return collection.where(filter);
    }

    getAll<T>(collectionName: string): T[]{
        const collection = this.db.getCollection(collectionName);
        return collection.find();
    }

    updateWhere(collectionName: string, filter: any, updateFunction: any) {
        const collection = this.db.getCollection(collectionName);
        collection.updateWhere(filter, updateFunction);
    }
}