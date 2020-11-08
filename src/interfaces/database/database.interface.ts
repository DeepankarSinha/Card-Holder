export interface IDatabase {

    /**
     * Create a new collection.
     * @param collectionName Collection name to add.
     * @param option Option for collection.
     */
    addCollection(collectionName: string, option: any): Collection<any>;

    /**
     * Get collection by name.
     * @param collectionName Collection name to get.
     */
    getCollection(collectionName: string): Collection<any>;

    /**
     * Insert a document in a collection.
     * @param collectionName
     * @param document Document to insert.
     */
    insert(collectionName: string, document: any): void;

    /**
     * Updates a document in a collection.
     * @param collectionName
     * @param document Document to insert.
     */
    update(collectionName: string, document: any): void;

    /**
     * Apply where filter.
     * @param collectionName
     * @param filter Filter to apply.
     */
    where(collectionName: string, filter: any): any[];

    /**
     * Get rows from collections.
     * @param collectionName Collection to get from.
     */
    getAll<T>(collectionName: string): T[];

    /**
     * Update with where filter.
     * @param collectionName Collection to update.
     * @param filter Filter to apply..
     * @param updateFunction Update function.
     */
    updateWhere(collectionName: string, filter: any, updateFunction: any): void;
}