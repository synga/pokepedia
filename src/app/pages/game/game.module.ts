import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../../components/components.module';
import { GamePage } from './game.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';


@NgModule({
  declarations: [
    GamePage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameRoutingModule,
    ComponentsModule
  ]
})
export class GamePageModule { }
