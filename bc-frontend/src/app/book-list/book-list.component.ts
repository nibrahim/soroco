import { Component, OnInit } from '@angular/core';
import { BookListService } from './book-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
    books: Array<any>;
    cbook: string;
    constructor(
        private blservice: BookListService
    ) { } 


    ngOnInit() {
        this.cbook = '';
        this.blservice.getBooks().subscribe(res => {
            console.log(res);
            this.books = res['data']['books'];
        });
    }

    
    
}

