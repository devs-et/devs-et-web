import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashedStringPipe } from './dashed-string.pipe';

@NgModule({
  declarations: [DashedStringPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DashedStringPipe,
  ],
})
export class PipesModule { }
