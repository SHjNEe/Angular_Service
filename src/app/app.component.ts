import { Component, OnInit } from "@angular/core";
import { AccountService } from "./account.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  accounts: { name: string; status: string }[] = [];
  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }
  // onAccountAdded() {
  //   this.accountService.addAccount({ name: "", status: "" });
  // }
}
