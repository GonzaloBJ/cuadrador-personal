import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ExpenseService } from '../../application/use-cases/expense.service';


@Controller('expenses')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Get()
  getAll() {
    return this.service.getExpenses();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getExpenseById(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.service.createExpense(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.deleteExpense(id);
  }

  @Delete()
  removeFromTo(@Query('from') from: number, @Query('to') to: number) {
    return this.service.deleteExpenseFromTo(from, to);
  }

  @Post('from-value-array')
  fromValueArray(@Body() dto: string[][]) {
    return this.service.createExpenseFromValueArray(dto);
  }
}