export interface ICalculator {
  id?: number;
  _id?: string;
  action?: '+' | '-' | '/' | 'x';
  valOne?: number;
  valTwo?: number;
  Result?: number;
}