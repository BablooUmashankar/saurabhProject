import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './Component/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RequestInterceptor } from './Intereceptor/request.interceptor';
import { ResponseInterceptor } from './Intereceptor/response.interceptor';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS ,useClass :RequestInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS ,useClass :ResponseInterceptor, multi : true}

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
