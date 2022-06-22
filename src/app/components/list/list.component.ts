import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { SearchService } from 'src/app/services/search.service';
import { BaseComponentOnDestroy } from 'src/app/epics/base-component-on-destroy';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponentOnDestroy implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns: string[] = ['avatar', 'sha', 'name'];

  listLength!: number;
  isLoadingList!: boolean;
  overlayText!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    this.getCommit();

    this.searchService.loading$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((loading: boolean) => this.isLoadingList = loading);

    this.searchService.totalCount$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((count: number) => this.listLength = count);

    this.searchService.commits$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((commits: any[]) => this.dataSource.data = commits);

    this.searchService.newSearch$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((newSearch: boolean) => {
        if (!!newSearch && this.paginator) {
          this.paginator.firstPage();
        }
      });

    this.searchService.overlayText$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(txt => this.overlayText = txt);
  }

  getCommit() {
    this.searchService.getCommits();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((paginator) => this.searchService.moveToPage(++paginator.pageIndex));
  }

}
