import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
    template: ''
  })
export class BaseComponent implements OnDestroy {
    subscriptions: Array<Subscription> = [];

    constructor( ) { }

    addSubscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
