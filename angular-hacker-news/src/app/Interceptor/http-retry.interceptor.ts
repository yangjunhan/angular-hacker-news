import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {
    constructor() {}

    /**
     *  Implement intercept function in HttpInterceptor interface
     */
    // tslint:disable-next-line:no-any
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // retry at most 3 times
            retry(3),
            catchError(this.handleError),
        );
    }

    /**
     * Error handler for intercept function
     */
    handleError(error: HttpErrorResponse) {
        let errorMessage;
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = 'Error: ' + error.error.message;
        } else {
            // Server-side errors
            errorMessage = 'Error Code: ' + error.status + '\nMessage: ' + error.message;
        }
        return throwError(errorMessage);
    }
}
