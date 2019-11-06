import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adz-search',
  templateUrl: './adz-search.component.html',
  styleUrls: ['./adz-search.component.css']
})
export class AdzSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(query: HTMLInputElement) {
    this.router.navigate(['search', query.value]);
  }


}
