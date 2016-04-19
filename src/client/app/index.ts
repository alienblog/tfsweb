// App
export * from './app.component';
export * from './app.service';

import {TFSService} from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  TFSService
];
