import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTreeComponent } from '@hackerNews/components/news-comments-module/comment-tree/comment-tree.component';

describe('CommentTreeComponent', () => {
    let component: CommentTreeComponent;
    let fixture: ComponentFixture<CommentTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommentTreeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
