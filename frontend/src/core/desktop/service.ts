import { Injectable } from "@angular/core";
import { Greet } from '@wails/main/App'

@Injectable({
  providedIn: 'root'
})
export class DesktopService {
  isNativePlatform() {
    return !!window['go' as any] as boolean
  }
  greet(arg: string): Promise<string> {
    return Greet(arg)
  }
}
