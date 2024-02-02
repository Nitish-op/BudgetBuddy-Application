import { Component } from '@angular/core';
import { ExpressdbService } from '../services/expressdb.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  constructor(private db:ExpressdbService){}
  
  displayCreditCard = false;
  creditCardData: any = {};

  onSubmit(form: any): void {
    if (form.valid) {
      this.creditCardData = {
        userName:'Sample',
        cardNumber: form.value.cardNumber,
        cardholderName: form.value.cardHolder,
        expirationDate: form.value.expirationDate,
        cvv: form.value.cvv,
        setLimit: form.value.setLimit,
        amountSpent: form.value.amountSpent
      };

  
      this.displayCreditCard = true;
    }
  }
  okaybutton(){
    this.displayCreditCard=!this.displayCreditCard;
    this.db.newcard(this.creditCardData).subscribe((res)=>{alert(res)})
  }



  cardnumber: string = '';
  expirydate: string = '';
  CVV: string = '';
  limit: string='';
  spent:string='';
  






}