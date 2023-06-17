import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { LoggingService } from "./logging.service";
// import { DetailsComponents } from "./standalone/detail.component";

@Component({
  selector: "app-root",
  // imports: [DetailsComponents],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedFeature = "recipe";
  constructor(
    private authService: AuthService,
    private logginService: LoggingService
  ) {}
  ngOnInit() {
    this.authService.autoLogin();
    this.logginService.printLog("Hello from app component");
  }
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
}
