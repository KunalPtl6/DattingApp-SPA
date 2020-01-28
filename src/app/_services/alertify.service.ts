import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(messsage: string, okCallback: () => any) {
    alertify.confirm(messsage, (e: any) => {
      if (e) {
        okCallback();
      } else { }
    });
  }

  success(messsage: string) {
    alertify.success(messsage);
  }

  error(messsage: string) {
    alertify.error(messsage);
  }

  warning(messsage: string) {
    alertify.warning(messsage);
  }

  message(messsage: string) {
    alertify.message(messsage);
  }

}
