import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ImmudbService } from '../immudb/immudb.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@ApiTags('accounting')
@ApiBearerAuth()
@Controller('accounting')
@UseGuards(AuthGuard)
export class AccountingController {
  constructor(private readonly immudbService: ImmudbService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
    type: CreateAccountDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createAccount(
    @Req() req: Request,
    @Body() accountData: CreateAccountDto,
  ) {
    const user = req['user'];
    return this.immudbService.createDocument(user.username, accountData);
  }

  @Get()
  @ApiOperation({ summary: 'Get user accounts' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the list of user accounts.',
    type: [CreateAccountDto],
  })
  async getUserAccounts(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    const user = req['user'];
    try {
      const result = await this.immudbService.getDocumentsByUsername(
        user.username,
        page || 1,
        perPage || 10,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to retrieve accounts: ${error.message}`,
      );
    }
  }

  @Get('count')
  @ApiOperation({ summary: 'Count user accounts' })
  @ApiResponse({
    status: 200,
    description: 'Return the count of user accounts.',
  })
  async countUserAccounts(@Req() req: Request) {
    const user = req['user'];
    try {
      const result = await this.immudbService.countDocumentsInCollection(
        user.username,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(
        `Failed to count accounts: ${error.message}`,
      );
    }
  }
}
