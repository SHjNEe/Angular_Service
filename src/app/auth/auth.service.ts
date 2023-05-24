import { HttpClient } from "@angular/common/http";
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
          let errorMessage = "An unknow error occurred! ";
          if (!error.error || !error.error.error) {
            return throwError(errorMessage);
          }
          switch (error.error.error.message) {
            case "EMAIL_EXISTS": {
              errorMessage = "This email exists already !!";
            }
          }
          return throwError(errorMessage);
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
      .pipe(
        catchError((error) => {
          let errorMessage = "An unknow error occurred! ";
          if (!error.error || !error.error.error) {
            return throwError(errorMessage);
          }
          switch (error.error.error.message) {
            case "EMAIL_EXISTS": {
              errorMessage = "This email exists already !!";
            }
          }
          return throwError(errorMessage);
        })
      );
  }
}
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
