import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class RequestInterceptor  implements HttpInterceptor{
    
    constructor(private cookieService: CookieService){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let token = this.cookieService.get('lamar-token');
        if(token){ //if there is token attach this token to every request
            request = request.clone(
                {
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        return next.handle(request);
    }
}
