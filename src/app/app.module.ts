import { AppErrorHandler } from './errors/errorHandler';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [AppComponent, PostsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
