import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShelfListService } from './shelf-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.scss']
})
export class ShelfListComponent implements OnInit {
    shelves: Array<any>;
    addshelf = false;
    addshelf_form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required)
    });
    constructor(
        private slservice: ShelfListService
    ) { }

    add_shelf() {
        this.addshelf = true;
    }
    save_shelf() {
        const name = this.addshelf_form.value.name;
        this.slservice.saveShelf(name).subscribe((res: any) => {
            this.shelves.push(res.data);
            this.addshelf = false;
        });
    }

    ngOnInit() {
        this.slservice.getShelves().subscribe((res: any) => {
            console.log(res);
            this.shelves = res.data['shelves'];
        });
    }
}

