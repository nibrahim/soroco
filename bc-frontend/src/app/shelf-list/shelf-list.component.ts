import { Component, OnInit } from '@angular/core';
import { BookListService } from './shelf-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class ShelfListComponent implements OnInit {
    shelves: Array<any>;
    addbook: boolean = false;
    addbook_form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        author: new FormControl('', Validators.required),
        description: new FormControl('')
    });
    constructor(
        private blservice: BookListService
    ) { } 

    add_book()  { 
        this.addbook = true;
    }
    
    save_book() {
        const {name, author, description} = this.addbook_form.value;
        this.blservice.saveBook(name, author, description).subscribe(res => {
            this.books.push(res['data']);
            this.addbook = false;
        });
    }




    ngOnInit() {
        this.blservice.getShelves().subscribe(res => {
            console.log(res);
            this.shelves = res['data']['shelves'];
        });
    }

    
    
}

