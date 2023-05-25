import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { User } from "../auth/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;
  user: User;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
