import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {TFSService} from '../app.service';
import {Title} from './title';
import {XLarge} from './x-large';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    TFSService,
    HTTP_PROVIDERS
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./home.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})
export class Home {
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public title: Title, public tfsService: TFSService) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value) {
    this.tfsService.user.getProfile((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      this.tfsService.user.getMemberAccounts((error, res) => {
        if (!error) {
          console.log(res.value);
        }
      });
    });
  }

}
