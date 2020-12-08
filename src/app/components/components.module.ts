import { TypeBadgeComponent } from './type-badge/type-badge.component';
import { PokecardComponent } from './pokecard/pokecard.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokestatusComponent } from './pokestatus/pokestatus.component';
import { MatIconModule, MatIcon } from '@angular/material/icon';

/**
 * Função para pegar o label do paginador
 */
const getRangeLabel = (page: number, pageSize: number, length: number) => {
  length = Math.max(length, 0);
  const start = page * pageSize;
  const end = start < length ?
    Math.min(start + pageSize, length) :
    start + pageSize;

  return `${start + 1} - ${end} de ${length}`;
}

/**
 * Traduz os textos do paginador
 */
const translatePaginator = () => {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Pokémons por página';
  paginatorIntl.nextPageLabel = 'Próxima';
  paginatorIntl.lastPageLabel = 'Anterior';
  paginatorIntl.getRangeLabel = getRangeLabel;

  return paginatorIntl;
}

@NgModule({
  declarations: [
    SearchComponent,
    PokecardComponent,
    TypeBadgeComponent,
    PokestatusComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    MatTab,
    MatTabGroup,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatPaginator,
    TypeBadgeComponent,
    SearchComponent,
    PokecardComponent,
    PokestatusComponent,
    MatIcon
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: translatePaginator() }
  ]
})
export class ComponentsModule { }
