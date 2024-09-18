export type CreditCardRequest = {
  valid: boolean;
  credit_card_number: number;
}

export type CreditCardResponse = {
  valid: boolean;
  credit_card_number: number;
  title: string;
  message: string;
}