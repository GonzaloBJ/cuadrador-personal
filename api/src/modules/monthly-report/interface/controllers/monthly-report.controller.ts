// import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
// import { MonthlyReportService } from '../../application/use-cases/monthly-report.service';


// @Controller('monthly-reports')
// export class MonthlyReportController {
//   constructor(private readonly service: MonthlyReportService) {}

//   @Get()
//   getAll() {
//     return this.service.getMonthlyReports();
//   }

//   @Get(':id')
//   getById(@Param('id') id: number) {
//     return this.service.getMonthlyReportById(id);
//   }

//   @Get(':month')
//   getByMonth(@Param('month') month: string) {
//     return this.service.getMonthlyReportByMonth(month);
//   }
// }