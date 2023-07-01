import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  keyframes,
} from "@angular/animations";
import { AuthService } from "./auth/auth.service";
import { LoggingService } from "./logging.service";
// import { DetailsComponents } from "./standalone/detail.component";

@Component({
  selector: "app-root",
  // imports: [DetailsComponents],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)",
        })
      ),
      transition("normal <=> highlighted", animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0) scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          transform: "translateX(0) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({
          "background-color": "orange",
        }),
        animate(
          1000,
          style({
            borderRadius: "50px",
          })
        ),
        animate(500),
      ]),
    ]),
    trigger("list1", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(300),
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            transform: "translateX(100px)",
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0px)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition("* => void", [
        group([
          animate(
            300,
            style({
              color: "red",
            })
          ),
          animate(
            800,
            style({
              transform: "translateX(100px)",
              opacity: 0,
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  state = "normal";
  wildState = "normal";
  loadedFeature = "recipe";
  constructor(
    private authService: AuthService,
    private logginService: LoggingService
  ) {}

  onAnimate() {
    this.state == "normal"
      ? (this.state = "highlighted")
      : (this.state = "normal");
    this.wildState == "normal"
      ? (this.wildState = "highlighted")
      : (this.wildState = "normal");
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.logginService.printLog("Hello from app component");
  }
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }
}
