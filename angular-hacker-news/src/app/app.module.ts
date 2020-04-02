import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '@hackerNews/app-routing.module';
import { AppComponent } from '@hackerNews/app.component';
import { HeaderComponent } from '@hackerNews/components/header/header.component';
import { FooterComponent } from '@hackerNews/components/footer/footer.component';
import { HttpRetryInterceptor } from 'src/app/interceptor/http-retry.interceptor';

@NgModule({
    // HeaderComponent and FooterComponent are commonly used in this website
    declarations: [AppComponent, HeaderComponent, FooterComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
