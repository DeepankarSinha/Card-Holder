import { NewCard } from "../../models/application-classes/new-card.ac";
import { Card } from "../../models/card.model";

export interface ICardService {

    /**
     * Get all the cards.
     */
    getCards(): Card[];

    /**
     * Add new card.
     * @param newCard New Card to add.
     */
    addNewCard(newCard: NewCard): string;

    /**
     * Assign customer to a card.
     * @param cardId Card Id.
     * @param customerId Customer Id.
     */
    assignCustomer(cardId: string, customerId: string): void;
}