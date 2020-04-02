import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCommentsComponent } from '@hackerNews/components/news-comments-module/news-comments.component';

describe('NewsCommentsComponent', () => {
    let component: NewsCommentsComponent;
    let fixture: ComponentFixture<NewsCommentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsCommentsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsCommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
