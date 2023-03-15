import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  bsModalRef: BsModalRef;
  constructor(
    private bsModalService: BsModalService
  ) { }

  show(status: string, message: string): void {
    this.bsModalRef = this.bsModalService.show(ToastComponent, {
      initialState: {
        status: status,        
        message: message
      }
    });
    setTimeout(() => {
      this.bsModalRef.hide();
    }, 1200);
  }
}
