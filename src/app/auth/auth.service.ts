import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJu9_nsy2_O-wrsQT1MUIB54nGn8kT8NY",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }
  logIn(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJu9_nsy2_O-wrsQT1MUIB54nGn8kT8NY",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknow error occurred! ";
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS": {
        errorMessage =
          "The email address is already in use by another account !!";
        break;
      }
      case "EMAIL_NOT_FOUND": {
        errorMessage =
          "There is no user record corresponding to this identifier !!";
        break;
      }
      case "INVALID_PASSWORD": {
        errorMessage =
          "The password is invalid or the user does not have a password !!";
        break;
      }
      case "USER_DISABLED": {
        errorMessage =
          "The user account has been disabled by an administrator !!";
        break;
      }
      default: {
        break;
      }
    }
    return throwError(errorMessage);
  }
}
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
