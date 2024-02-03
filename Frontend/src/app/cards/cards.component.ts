import { Component } from '@angular/core';
import { ExpressdbService } from '../services/expressdb.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  constructor(private db:ExpressdbService){}
  myCards: any[] = [];
  displayCreditCard = false;
  creditCardData: any = {};
  user : any;
  username: any;
  _id : any;

  ngOnInit(){
    this.user = localStorage.getItem("logeduser");
    this.user = JSON.parse(this.user);
    this.username = this.user.username;
    console.log(this.username);
    this.db.allcards(this.username).subscribe((res)=>{
      this.myCards = Object.values(res);
    })
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.creditCardData = {
        userName:this.username,
        cardNumber: form.value.cardNumber,
        cardholderName: form.value.cardHolder,
        expirationDate: form.value.expirationDate,
        cvv: form.value.cvv,
        setLimit: form.value.setLimit,
        cardType: form.value.cardType
        // amountSpent: form.value.amountSpent
      };

  
      this.displayCreditCard = true;
    }
  }
  okaybutton(){
    this.displayCreditCard=!this.displayCreditCard;
    this.db.newcard(this.creditCardData).subscribe((res)=>{alert(res)})
  }

  delete(card:any){
    this.db.deletecard(card)
  }

  edit(card:any){
    card.updatable = true
    // card.updatable = !card.updatable;
  }

  update(card:any){
    // p.updatable = !p.updatable;
    card.updatable = false
    this.db.updatecard(card);
  }

}