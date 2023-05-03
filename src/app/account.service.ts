import { Injectable, EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable({providedIn: 'root'}) //Inject other service
export class AccountService {
  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Testaccount",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];
  //Define 1 event
  statusUpdated = new EventEmitter<string>();
  constructor(private loggingService: LoggingService) {}
  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatus(status);
  }
  updateStatus(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.loggingService.logStatus(newStatus);
  }
}
