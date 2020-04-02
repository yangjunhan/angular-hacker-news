import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from '@hackerNews/components/news-list-module/news-list.component';

describe('NewsListComponent', () => {
    let component: NewsListComponent;
    let fixture: ComponentFixture<NewsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsListComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
