import { DataService } from './data-service.service';
import { NotFoundError } from './errors/notFoundError';
import { AppError } from './errors/appError';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super('https://jsonplaceholder.typicode.com/posts', http);
  }
}
