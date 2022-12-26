import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reg-and-login',
  templateUrl: './reg-and-login.component.html',
  styleUrls: ['./reg-and-login.component.css']
})
export class RegAndLoginComponent implements OnInit {

  rgister="login"
  constructor() { }

  ngOnInit(): void {
  }

  change(text){
    debugger;
    this.rgister = text;
    this.ChangeActive()

  }
ChangeActive(){
  debugger;
      const div1:HTMLElement = document.getElementById("MyActiveDiv1");
      const div2:HTMLElement = document.getElementById("MyActiveDiv2");

      if(div1.className.includes("active"))
      {
        div1.classList.remove("active") ;
        div2.classList.add("active") ;
      }
      else if(div2.className.includes("active"))
      {
        div2.classList.remove("active") ;
        div1.classList.add("active") ;
      }
    }

}
