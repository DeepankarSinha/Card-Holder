import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types.constant";
import { ICardRepository } from "../interfaces/card/card-repository.interface";
import { ICardService } from "../interfaces/card/card-service.interface";
import { NewCard } from "../models/application-classes/new-card.ac";
import { Card } from "../models/card.model";

@injectable()
export class CardService implements ICardService {
    
    private cardRepository: ICardRepository;

    constructor(@inject(TYPES.CardRepository) cardRepository: ICardRepository){
        this.cardRepository = cardRepository;
    }

    getCards(): Card[] {
        return this.cardRepository.getAll();
    }

    addNewCard(newCard: NewCard): string {
        const card: Card = {
            cardType: newCard.cardType,
            cvc: newCard.cvc,
            password: newCard.password
        }

        const addedCard = this.cardRepository.add(card);
        
        if(addedCard && addedCard.id){
            return addedCard.id;
        }

        // Best would be to replace it with custom error.
        throw new Error('Adding new card operation failed.');
    }
    
    assignCustomer(cardId: string, customerId: string): void {
        const card = this.cardRepository.get(cardId);

        if(card){
            card.customerId = customerId;
            this.cardRepository.update(card);
        } else {
            throw new Error(`Card with ${cardId} was not found.`);
        }
    }

}