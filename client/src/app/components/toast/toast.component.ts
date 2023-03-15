import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  status: string;
  message: string;
  iconClassList: string[];
  bgClassList: string[];
  constructor() { }

  ngOnInit() {
    this.setClasses(this.status);
  }
  
  setClasses(status: string): void {
    switch (status) {
      case 'success':
        this.iconClassList = ['bi-check-circle text-success'];
        this.bgClassList = ['bg-success'];
        break;
        case 'error':
          this.iconClassList = ['bi-x-circle text-danger'];
          this.bgClassList = ['bg-danger'];
        break;
    }
  }

}
