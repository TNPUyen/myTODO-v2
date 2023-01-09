// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'mytodo-dbed7',
    appId: '1:523911255924:web:30bd54a69e0cee32923e21',
    storageBucket: 'mytodo-dbed7.appspot.com',
    apiKey: 'AIzaSyC0OYmHe8PYnw-wvDlhs-f_k8nHkXD0jCw',
    authDomain: 'mytodo-dbed7.firebaseapp.com',
    messagingSenderId: '523911255924',
  },
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
