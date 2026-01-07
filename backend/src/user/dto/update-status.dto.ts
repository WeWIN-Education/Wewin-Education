import { IsEnum } from 'class-validator';
import { PURCHASE_ORDERS_ACTION_ENUM } from 'src/util/enum';

export class UpdateStatusDto {
  @IsEnum(PURCHASE_ORDERS_ACTION_ENUM)
  action: PURCHASE_ORDERS_ACTION_ENUM;
}
