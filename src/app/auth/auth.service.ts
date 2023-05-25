import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

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
  private tokenExpirationTimer;
  user = new BehaviorSubject<User>(null);
  constructor(private httpClient: HttpClient, private router: Router) {}
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
        }),
        tap((responseData) => {
          return this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
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
        catchError(this.handleError),
        tap((responseData) => {
          return this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    // localStorage.clear();
    this.router.navigate(["/auth"]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem("userData", JSON.stringify(user));

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
  }
  autoLogout(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration * 1000);
    }
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
