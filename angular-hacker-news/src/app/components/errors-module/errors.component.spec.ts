import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponent } from '@hackerNews/components/errors-module/errors.component';

describe('ErrorsComponent', () => {
    let component: ErrorsComponent;
    let fixture: ComponentFixture<ErrorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
