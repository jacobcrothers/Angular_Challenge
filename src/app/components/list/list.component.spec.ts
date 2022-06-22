import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

import { ListComponent } from './list.component';

fdescribe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule
      ],
      providers: [SearchService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    searchService = TestBed.inject(SearchService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create list component', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully subscribe to observables from search service on ngOnInit', () => {
    let commits: any[] = [];
    let listLength = 0;
    let isLoadingList = false;
    let overlayText = 'No List';

    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(commits);
    expect(component.listLength).toEqual(listLength);
    expect(component.isLoadingList).toEqual(isLoadingList);
    expect(component.overlayText).toEqual(overlayText);
  })
});
