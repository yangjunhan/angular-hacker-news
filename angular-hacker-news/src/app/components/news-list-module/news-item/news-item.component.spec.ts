import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemComponent } from '@hackerNews/components/news-list-module/news-item/news-item.component';

describe('NewsItemComponent', () => {
    let component: NewsItemComponent;
    let fixture: ComponentFixture<NewsItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
