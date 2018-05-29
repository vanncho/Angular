// Components
import { AppComponent } from './app.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './components/shared/shared.module';
import { GameModule } from './components/game/game.module';
import { CartModule } from './components/cart/cart.module';
import { AppRoutesModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

// Routes
import { RouterModule } from '@angular/router';
import { HomeBasicComponent } from './components/home-basic/home-basic.component';

// Services & Guards
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';
import { GameService } from './core/services/game.service';
import { CartService } from './core/services/cart.service';
import { MyGamesService } from './core/services/mygames.service';
import { HttpClientService } from './core/services/http-client.service';
import { CookieService } from 'angular2-cookie/core';
import { CookieManagerService } from './core/services/cookie-manager.service';
import { TruncatePipe } from './core/pipes/truncate.pipe';

// Utils
import { AuthUtil } from './core/utils/auth.util';

@NgModule({
  declarations: [
    AppComponent,
    HomeBasicComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    GameModule,
    CartModule,
    AppRoutesModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard,
    GameService,
    CartService,
    MyGamesService,
    HttpClientService,
    CookieService,
    CookieManagerService,
    AuthUtil
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
