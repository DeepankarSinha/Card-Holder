import { inject, injectable } from "inversify";
import { Collections } from "../constants/collection.constant";
import { TYPES } from "../constants/types.constant";
import { ICardRepository } from "../interfaces/card/card-repository.interface";
import { IDatabase } from "../interfaces/database/database.interface";
import { Card } from "../models/card.model";
import { shortId } from "../utils/generators.util";

@injectable()
export class CardRepository implements ICardRepository {
    
    private database: IDatabase;

    constructor(@inject(TYPES.Database) database: IDatabase){
        this.database = database;
    }

    get(cardId: string): Card {
        const cards = this.database.where(Collections.Card, (obj: Card) => obj.id === cardId);

        return cards[0];
    }

    getAll(): Card[] {
        return this.database.getAll(Collections.Card);
    }

    add(newCard: Card): Card {
        newCard.id = shortId();
        this.database.insert(Collections.Card, newCard);

        return newCard;
    }
    
    update(card: Card): void {
        this.database.update(Collections.Card, card);
    }
}