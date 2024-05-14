import { Injectable, inject } from "@angular/core";
import { Capacitor } from '@capacitor/core';
import { DesktopService } from "@desktop";

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  destkopService = inject(DesktopService)
  isMobile(): boolean {
    return Capacitor.isNativePlatform()
  }
  isDesktop(): boolean {
    return this.destkopService.isNativePlatform()
  }
}
