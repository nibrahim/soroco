import { Component, OnInit } from '@angular/core';
import { BookListService } from './shelf-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.scss']
})
export class ShelfListComponent implements OnInit {
    shelves: Array<any>;
    addshelf: boolean = false;
    addshelf_form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required)
    });
    constructor(
        private blservice: BookListService
    ) { } 

    add_shelf()  { 
        this.addshelf = true;
    }
    
    save_shelf() {
        const name = this.addshelf_form.value.name;
        this.blservice.saveShelf(name).subscribe(res => {
            this.shelves.push(res['data']);
            this.addshelf = false;
        });
    }

    ngOnInit() {
        this.blservice.getShelves().subscribe(res => {
            console.log(res);
            this.shelves = res['data']['shelves'];
        });
    }

    
    
}

