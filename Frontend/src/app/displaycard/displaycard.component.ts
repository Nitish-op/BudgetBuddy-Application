import { Component } from '@angular/core';
import { ExpressdbService } from '../services/expressdb.service';

@Component({
  selector: 'app-displaycard',
  templateUrl: './displaycard.component.html',
  styleUrl: './displaycard.component.css'
})
export class DisplaycardComponent {
  constructor(private db:ExpressdbService){}
  myCards: any[] = [];
  displayCreditCard = false;
  creditCardData: any = {};
  user : any;
  username: any;
  _id : any;
  newcard : any;

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
    this.db.deletecard(card._id)
  }

  edit(card:any){
    card.updatable = true
    // card.updatable = !card.updatable;
  }

  update(card:any){
    this.newcard = {
      userName:this.username,
      cardNumber: card.value.cardNumber,
      cardholderName: card.value.cardHolder,
      expirationDate: card.value.expirationDate,
      cvv: card.value.cvv,
      setLimit: card.value.setLimit,
      cardType: card.value.cardType,
      updatable: false
      // amountSpent: form.value.amountSpent
    };
    // p.updatable = !p.updatable;
    card.updatable = false
    this.db.updatecard(card);
  }
}
