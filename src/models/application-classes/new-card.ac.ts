import { IsInt, IsNotEmpty, Length, Max, Min } from "class-validator";

export class NewCard {
    @IsNotEmpty()
    cardType?: string;

    @IsNotEmpty()
    @IsInt()
    @Min(100)
    @Max(999)
    cvc?: number;

    @IsNotEmpty()
    @Length(8, 12)
    password?: string;
}