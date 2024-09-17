import 'jest-preset-angular/setup-jest';
import 'zone.js'; // Importa o zone.js
import 'zone.js/testing'; // Importa o zone.js/testing
import { getTestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { join } from 'path';
import { sync as globSync } from 'glob';

// First, initialize the Angular testing environment.
if (!getTestBed().platform) {
    getTestBed().initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
        { teardown: { destroyAfterEach: true } }
    );
}

// Then we find all the tests.
const context = globSync('./src/**/*.spec.ts', { cwd: __dirname });
// And load the modules.
context.forEach((file) => {
    require(join(__dirname, file));
});