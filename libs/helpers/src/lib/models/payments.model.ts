import { Code, Grid } from './grid.model';

export interface Payments {
  /**
   * The name of the payment
   */
  name: string;
  /**
   * The amount of the payment
   */
  amount: number;
  /**
   * The generated code
   */
  code: Code;
  /**
   * The generated grid
   */
  grid: Grid;
}
