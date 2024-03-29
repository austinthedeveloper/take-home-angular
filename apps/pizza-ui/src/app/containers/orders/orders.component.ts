import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initPizza, removePizza, selectAllPizza } from '@pizza/products/pizza';

@Component({
  selector: 'pizza-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  orders$ = this.store.select(selectAllPizza);
  actions = [
    {
      key: 'Edit',
      value: 'edit',
    },
    {
      key: 'Copy',
      value: 'copy',
    },
    {
      key: 'Remove',
      value: 'remove',
    },
  ];

  constructor(private router: Router, private store: Store) {
    this.store.dispatch(initPizza());
  }

  onAction(action: string, orderId: number) {
    switch (action) {
      case 'edit':
        this.router.navigate(['/order/', orderId]);
        break;
      case 'copy':
        this.router.navigate(['/order/copy/', orderId]);
        break;
      case 'remove':
        this.store.dispatch(removePizza({ pizzaId: orderId }));
        break;
    }
  }
}
