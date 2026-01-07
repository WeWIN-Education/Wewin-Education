import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseEnumPipe,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PURCHASE_ORDERS_STATUS_ENUM } from 'src/util/enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateStatusDto } from 'src/user/dto/update-status.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.orderService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:status')
  findByStatus(
    @Param('status', new ParseEnumPipe(PURCHASE_ORDERS_STATUS_ENUM))
    status: PURCHASE_ORDERS_STATUS_ENUM,
    @Req() req,
  ) {
    return this.orderService.findByStatus(status, req.user.id);
  }

  @Get(':id/duplicate')
  copyPurchaseOrder(@Param('id') id: string) {
    return this.orderService.duplicatePurchaseOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.orderService.create(createOrderDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body()
    updateStatusDto: UpdateStatusDto,
    @Req() req,
  ) {
    return this.orderService.updateStatus(id, req.user.id, updateStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
