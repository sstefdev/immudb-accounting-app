import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { CreateAccountDto } from '../accounting/dto/create-account.dto';

@Injectable()
export class ImmudbService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>(
      'IMMUDB_API_URL',
      'https://vault.immudb.io/ics/api/v1/ledger/default',
    );
    this.apiKey = this.configService.get<string>('IMMUDB_API_KEY');
  }

  async createDocument(username: string, documentData: CreateAccountDto) {
    const url = `${this.apiUrl}/collection/default/document`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const dataWithUsername = {
      ...documentData,
      username: username,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.put(url, dataWithUsername, { headers }),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new BadRequestException(
          `Failed to create document: ${error.response.data.message || error.message}`,
        );
      } else if (error.request) {
        throw new BadRequestException('No response received from immudb');
      } else {
        throw new BadRequestException(
          `Error setting up request: ${error.message}`,
        );
      }
    }
  }

  async getDocumentsByUsername(
    username: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const url = `${this.apiUrl}/collection/default/documents/search`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const searchQuery = {
      page: 1,
      perPage: 100,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, searchQuery, { headers }),
      );

      const filteredDocuments = response.data.revisions
        .filter((doc: any) => doc.document.username === username)
        .map((doc: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { revision, transactionId, username, ...rest } = doc.document;
          return rest;
        });

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

      return {
        documents: paginatedDocuments,
        totalCount: filteredDocuments.length,
        page,
        limit,
      };
    } catch (error) {
      console.error(
        'Error in getDocumentsByUsername:',
        error.response?.data || error.message,
      );
      throw new BadRequestException(
        `Failed to retrieve documents: ${error.response?.data?.error || error.message}`,
      );
    }
  }

  async getDocument(collectionName: string, documentId: string) {
    const url = `${this.apiUrl}/collection/${collectionName}/documents/${documentId}`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get document: ${error.message}`);
    }
  }

  async countDocumentsInCollection(username: string) {
    const url = `${this.apiUrl}/collection/default/documents/search`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const searchQuery = {
      page: 1,
      perPage: 100,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, searchQuery, { headers }),
      );

      const count = response.data.revisions.filter(
        (doc: any) => doc.document.username === username,
      ).length;

      return { count };
    } catch (error) {
      console.error(`Error counting documents: ${error.message}`);

      if (error.response) {
        if (error.response.status === 404) {
          throw new NotFoundException(`Collection not found: default`);
        } else {
          throw new BadRequestException(
            `Failed to count documents: ${error.response.data.message || error.message}`,
          );
        }
      } else if (error.request) {
        throw new BadRequestException('No response received from immudb');
      } else {
        throw new BadRequestException(
          `Error setting up request: ${error.message}`,
        );
      }
    }
  }

  async findDocumentByAccountNumber(accountNumber: string) {
    const url = `${this.apiUrl}/collection/default/documents/search`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };

    const searchQuery = {
      query: {
        expressions: [
          {
            fieldComparisons: [
              {
                field: 'accountNumber',
                operator: 'EQ',
                value: accountNumber,
              },
            ],
          },
        ],
      },
      page: 1,
      perPage: 1,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, searchQuery, { headers }),
      );

      return response.data.revisions.length > 0
        ? response.data.revisions[0].document
        : null;
    } catch (error) {
      console.error(
        'Error in findDocumentByAccountNumber:',
        error.response?.data || error.message,
      );
      throw new BadRequestException(
        `Failed to search for account: ${error.response?.data?.error || error.message}`,
      );
    }
  }
}
