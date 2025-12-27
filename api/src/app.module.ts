import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ExpenseController } from './modules/expense/interface/controllers/expense.controller';
import { ExpenseService } from './modules/expense/application/use-cases/expense.service';
import { ExpensesDrizzleRepository } from './modules/expense/infrastructure/persistence/expenses.drizzle.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule],
  controllers: [AppController, ExpenseController],
  providers: [ExpenseService, { provide: 'IExpensesRepository', useClass: ExpensesDrizzleRepository }],
})
export class AppModule {}
