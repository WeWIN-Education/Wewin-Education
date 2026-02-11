import { Controller } from '@nestjs/common';
import { InventoryMovementService } from './inventory-movement.service';

@Controller('inventory-movement')
export class InventoryMovementController {
  constructor(
    private readonly inventoryMovementService: InventoryMovementService,
  ) {}
}
