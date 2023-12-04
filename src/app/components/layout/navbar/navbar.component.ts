import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TailwindUtilService } from '../../../services/tailwind-util.service';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBars4,
  heroXMark,
  heroPlus,
  heroPaperAirplane,
} from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink],
  providers: [
    provideIcons({ heroBars4, heroXMark, heroPaperAirplane, heroPlus }),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private mergeClasses: TailwindUtilService) {}

  menuLinks = [
    {
      name: 'Create new ',
      icon: 'heroPlus',
      link: '/create',
    },
    {
      name: 'Contact',
      icon: 'heroPaperAirplane',
      link: '/contact',
    },
  ];

  sidebarOpen = false;

  cn(...classes: string[]): string {
    return this.mergeClasses.cn(...classes);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
