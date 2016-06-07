/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ROUTER_PROVIDERS ],
  directives: [ RouterActive, ROUTER_DIRECTIVES ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.scss')
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Index'] ">
            Home
          </button>
          <button md-button router-active [routerLink]=" ['About'] ">
            About
          </button>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
        123
      </footer>
      </md-content>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Statistigs';
  url = '';//https://twitter.com/AngularClass'; @TODO

  constructor(
    public appState: AppState) {

  }

  getInstagramTokenFromHash(hash) {
    const hashParts = window.location.hash.split('#');
    if (hashParts.length >= 2) {
      const currentHash = hashParts.slice(-1)[0];
      const token = currentHash.split('=')[1];
      return token;
    }
    return '';
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    const hash = window.decodeURIComponent(window.location.hash);
    if (hash) {
      const token = this.getInstagramTokenFromHash(hash);
      alert(token);
    }
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
