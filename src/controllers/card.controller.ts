import { BadRequestError, Body, Get, InternalServerError, JsonController, NotFoundError, Param, Post, Put } from "routing-controllers";
import { TYPES } from "../constants/types.constant";
import { ICardService } from "../interfaces/card/card-service.interface";
import { ICustomerService } from "../interfaces/customer/customer-service.interface";
import { container } from "../inversify.config";
import { NewCard } from "../models/application-classes/new-card.ac";
import { UpdateCard } from "../models/application-classes/update-card.ac";

@JsonController('/api/cards')
export class CardController {

    /**
     * This is the card controller configured to
     * accept json request and return json response.
     */

    private cardService: ICardService;
    private customerService: ICustomerService;

    constructor() {
        this.cardService = container.get<ICardService>(TYPES.CardService);
        this.customerService = container.get<ICustomerService>(TYPES.CustomerService);
    }

    /**
     * @api {Get} api/cards Get all the cards.
     * @apiName GetCards
     * @apiGroup Cards
     * @apiVersion  1.0.0
     * 
     * @apiSuccess (200) {Card[]} List of cards.
     */
    @Get()
    getCards() {
        return this.cardService.getCards();
    }

    /**
     * @api {Post} api/cards Add new card.
     * @apiName AddCard
     * @apiGroup Cards
     * @apiVersion  1.0.0
     * 
     * @apiSuccess (200) {string} Id of the new card added.
     */
    @Post()
    addCard(@Body({ validate: true }) cardDetails: NewCard) {
        // The new card model is automatically validated. Check out model class.
        try {
            const id = this.cardService.addNewCard(cardDetails);

            return { id: id };
        } catch (err) {
            // Error handling can be improved with custom error types.
            throw new InternalServerError(err.message);
        }
    }

    /**
     * @api {Post} api/cards/:cardId Update a card.
     * @apiName UpdateCard
     * @apiGroup Cards
     * @apiVersion  1.0.0
     * 
     * @apiSuccess (200) {Card} Updated card details.
     */
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