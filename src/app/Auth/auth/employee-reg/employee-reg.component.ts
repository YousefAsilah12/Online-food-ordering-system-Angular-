import { Component, OnInit } from '@angular/core';
interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.css']
})
export class EmployeeRegComponent implements OnInit {
  cities: City[];
  selectedCity1;
  constructor() {     this.cities=[
    {name: 'Jerusalem', code: 'JM'},
    {name: 'BeitHanina', code: 'BH'},
 ];
}

  ngOnInit(): void {
  }

}
