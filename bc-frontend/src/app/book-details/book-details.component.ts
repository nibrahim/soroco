import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookListService } from '../book-list/book-list.service';



@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
    book:any; // Need to create a custom type.
    constructor(private route: ActivatedRoute,
                private blservice: BookListService) {}

    ngOnInit() {
        const slug = this.route.params.subscribe(params => {
            this.blservice.getBookDetails(params.slug).subscribe(res => {
            this.book = res['data'];
            console.log(res);
            })})};

// .params['slug'];
//         this.blservice.getBookDetails(slug).subscribe(res => {
//             this.book = res['data'];
//             console.log(res);
//         });
    // }
}

