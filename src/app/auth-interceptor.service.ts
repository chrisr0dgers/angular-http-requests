import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("request on the way");
    const modifiedRequest = req.clone({
      headers: req.headers.append("authKey", "sad"),
    });
    return next.handle(modifiedRequest);
  }
}
