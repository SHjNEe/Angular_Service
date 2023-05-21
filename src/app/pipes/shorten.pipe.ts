import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  // transform(value: any, ...args: any[]) {}
  transform(value: any, limit: number, lastText = null) {
    if (value.length > limit) {
      return value.substr(0, limit) + "..." + lastText;
    }
    return value;
  }
}
