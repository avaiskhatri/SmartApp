import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DevicesPage } from '../devices/devices';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DevicesPage;
  tab3Root = ContactPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
