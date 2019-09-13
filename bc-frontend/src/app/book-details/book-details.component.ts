import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookListService } from '../book-list/book-list.service';
import { FormControl } from '@angular/forms';



@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
    book: any; // Need to create a custom type.
    reviews: Array<any>;
    review = new FormControl('');
    isAdding = false;
    slug: any;
    error: string;

    constructor(
        private route: ActivatedRoute,
        private blservice: BookListService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.slug = params.slug;
            this.blservice.getBookDetails(params.slug).subscribe((res: any) => {
                this.book = res.data;
            });
            this.blservice.getReviews(params.slug).subscribe((res: any) => {
                this.reviews = res.data.reviews;
                this.error = '';
                this.review.patchValue('');
            });
        });
    }

    onAddReview(text: string) {
        if (!text) { return false; }
        this.isAdding = true;
        this.blservice.addReview(this.slug, text).subscribe((res: any) => {
            this.blservice.getReview(this.slug, res.data.id).subscribe((resp: any) => {
                this.reviews.push(resp.data);
                this.review.patchValue('');
                this.isAdding = false;
                this.error = '';
            });
        }, err => {
            console.log(err.error.status);
            this.error = err.error.status;
            this.isAdding = false;
        }, () => {});
    }
}

