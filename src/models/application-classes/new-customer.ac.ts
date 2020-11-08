import { IsNotEmpty } from "class-validator";

export class NewCustomer {
    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    address1?: string;

    address2?: string;

    @IsNotEmpty()
    state?: string;

    @IsNotEmpty()
    city?: string;

    @IsNotEmpty()
    country?: string;
}