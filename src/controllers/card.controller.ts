import { BadRequestError, Body, Get, InternalServerError, JsonController, NotFoundError, Param, Post, Put } from "routing-controllers";
import { TYPES } from "../constants/types.constant";
import { ICardService } from "../interfaces/card/card-service.interface";
import { ICustomerService } from "../interfaces/customer/customer-service.interface";
import { container } from "../inversify.config";
import { NewCard } from "../models/application-classes/new-card.ac";
import { UpdateCard } from "../models/application-classes/update-card.ac";

@JsonController('/api/cards')
export class CardController {

    private cardService: ICardService;
    private customerService: ICustomerService;

    constructor() {
        this.cardService = container.get<ICardService>(TYPES.CardService);
        this.customerService = container.get<ICustomerService>(TYPES.CustomerService);
    }

    @Get()
    getCards() {
        return this.cardService.getCards();
    }

    @Post()
    addCard(@Body({ validate: true }) cardDetails: NewCard) {
        try {
            const id = this.cardService.addNewCard(cardDetails);

            return { id: id };
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    @Put('/:cardId')
    updateCard(@Param("cardId") cardId: string, @Body({ validate: true }) updateCardDetail: UpdateCard) {
        if(updateCardDetail.customerId){

            if(!this.customerService.isCustomerExist(updateCardDetail.customerId)) {
                throw new NotFoundError('Customer not found.');
            }

            try {
                this.cardService.assignCustomer(cardId, updateCardDetail.customerId);
            } catch(err) {
                throw new NotFoundError(err.message);
            }

            return updateCardDetail;
        }

        throw new BadRequestError('Requested field could not be updated.');
    }
}