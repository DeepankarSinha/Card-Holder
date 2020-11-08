import 'jasmine';
import 'reflect-metadata';
import { TYPES } from '../src/constants/types.constant';
import { ICardRepository } from '../src/interfaces/card/card-repository.interface';
import { container } from '../src/inversify.config';
import { NewCard } from '../src/models/application-classes/new-card.ac';
import { Card } from '../src/models/card.model';
import { CardService } from '../src/services/card.service';

const cardRepoMock = {
    add: (newCard: NewCard) => {
        return {
            id: 'd34fvd4f5fw4f4',
            cardType: 'type',
            cvc: 111,
            password: '12345678'
        };
    },
    get: (id: string): Card => {
        return {
            id: 'd34fvd4f5fw4f4',
            cardType: 'type',
            cvc: 111,
            password: '12345678'
        };
    },
    getAll: (): Card[] => { return []; },
    update: (card: Card) => { }
};
const cardService = new CardService(cardRepoMock);

describe('Card service', () => {
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

    it('should add a new card', () => {
        container.unbind(TYPES.CardRepository);
        container.bind<ICardRepository>(TYPES.CardRepository).toConstantValue(cardRepoMock);
        const newCard: NewCard = {
            cardType: 'type',
            cvc: 111,
            password: '12345678'
        }

        const result = cardService.addNewCard(newCard);

        expect(result).toBe('d34fvd4f5fw4f4');
    });

    it('should assign customer to a card', () => {
        container.unbind(TYPES.CardRepository);
        container.bind<ICardRepository>(TYPES.CardRepository).toConstantValue(cardRepoMock);
        spyOn(cardRepoMock, "update");
        cardService.assignCustomer('dsfd', 'gjhgj');
        
        expect(cardRepoMock.update).toHaveBeenCalled();
    });
});