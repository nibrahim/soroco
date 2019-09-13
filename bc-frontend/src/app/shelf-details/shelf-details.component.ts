import { Component, OnInit } from '@angular/core';
import { ShelfListService } from '../shelf-list/shelf-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shelf-details',
  templateUrl: './shelf-details.component.html',
  styleUrls: ['./shelf-details.component.scss']
})
export class ShelfDetailsComponent implements OnInit {
  shelf: any;
  isAdding = false;
  number: any;

  constructor(
    private slservice: ShelfListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.number = params.number;
      this.slservice.getShelfDetails(params.number).subscribe((res: any) => {
        this.shelf = res.data.shelf;
      });
    });
  }

  onClickAddToShelf(slug: any) {
    this.isAdding = true;
    this.slservice.addBookToShelf(this.number as number, slug).subscribe((res: any) => {
      const itemIndex = this.shelf.others.findIndex(b => b.slug === slug);
      this.shelf.others.splice(itemIndex, 1);
      this.shelf.books.push(res.data);
      this.isAdding = false;
    });
  }

}
