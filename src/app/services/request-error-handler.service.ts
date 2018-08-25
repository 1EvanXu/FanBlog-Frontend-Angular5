import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NzModalService} from 'ng-zorro-antd';
import {of} from 'rxjs/observable/of';

@Injectable()
export class RequestErrorHandlerService {

  constructor(private _message: NzModalService) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    const requestError = new RequestError(error.status);
    this._message.error({
      title: 'Error',
      content: requestError.errorMessage
    });

    return of(requestError);
  }

}

export class RequestError {
  errorStatus: number;
  errorMessage: string;
  constructor(status: number) {
    this.errorStatus = status;
    switch (status) {
      case 404: this.errorMessage = 'The resource requested not exist!'; break;
      case 403: this.errorMessage = 'Bad Request, please try other page!'; break;
      case 500: this.errorMessage = 'The server internal error!'; break;
      default: this.errorMessage = 'Some errors happened!';
    }
  }
}
