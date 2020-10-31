import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from './errors/appError';
import { BadInputError } from './errors/badInputError';
import { NotFoundError } from './errors/notFoundError';
import { Post } from './post-service.service';

export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url).pipe(catchError(this.handleHerror));
  }

  create(post: Post) {
    return this.http.post(this.url, post).pipe(catchError(this.handleHerror));
  }

  delete(id) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError(this.handleHerror));
  }

  private handleHerror(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else if (error.status === 400) {
      return throwError(new BadInputError(error.json()));
    } else {
      return throwError(new AppError(error));
    }
  }
}
