import { Card } from "../../models/card.model";

export interface ICardRepository {

    /**
     * Get the card by Id.
     * @param cardId Id of the card.
     */
    get(cardId: string): Card;

    /**
     * Get all the cards.
     */
    getAll(): Card[];

    /**
     * Add new card.
     * @param newCard New card object.
     */
    add(newCard: Card): Card;

    /**
     * Assign customer to a card.
     * @param cardId Card detail to update.
     */
    update(card: Card): void; 
}