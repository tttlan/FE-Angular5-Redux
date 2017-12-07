import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppSettings } from './utils/enums/AppSettings';
import { AppModule } from './app.module';

if (AppSettings.ENVIRONMENT === 'prod') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);



