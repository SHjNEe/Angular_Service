export class LoggingService {
  logStatus(status: string): void {
    console.log("A server status changed, new status: " + status);
  }
}
