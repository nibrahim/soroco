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

  constructor(
    private slservice: ShelfListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slservice.getShelfDetails(params.number).subscribe((res: any) => {
        this.shelf = res.data;
      });
    });
  }

}
