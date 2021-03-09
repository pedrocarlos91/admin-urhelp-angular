import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SpinnerService implements HttpInterceptor{
    count = 0;
    constructor(private _spinner: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._spinner.show();
        this.count++;

        return next.handle(req)
        .pipe(
            tap(
            ),
            finalize(() =>{
                this.count--;
                if ( this.count == 0 ) this._spinner.hide ()
            })
        );
    }
}