import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideBox } from '@ng-icons/lucide';
import { DesktopService } from '@desktop';
import { PlatformService } from '../core/platform/service';
import { Nullable } from '@utils/types/Nullable';
import { CommonModule } from '@angular/common';

type Platform = {
  desktop: Nullable<boolean>,
  mobile: Nullable<boolean>
}

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideIcons({ lucideBox }), DesktopService, PlatformService],
  imports: [RouterOutlet, HlmButtonDirective, HlmAlertTitleDirective, HlmAlertIconDirective, HlmAlertDirective, HlmAlertDescriptionDirective, HlmIconComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  desktopService = inject(DesktopService)
  platformService = inject(PlatformService)

  platform = signal<Platform>({
    desktop: null,
    mobile: null
  })

  showButton = signal<boolean>(false)

  ngOnInit(): void {
    this.platform.set({
      desktop: this.platformService.isDesktop(),
      mobile: this.platformService.isMobile()
    })
  }

  toggleShowButtons(): void {
    this.showButton.update((val => !val))
  }
  async greet() {
    const resp = await this.desktopService.greet('anything')
    this.title = resp
  }
}
