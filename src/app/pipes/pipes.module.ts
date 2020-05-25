import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashedStringPipe } from './dashed-string.pipe';
import { ToRenderableLanguagePipe } from './to-renderable-language.pipe';

@NgModule({
  declarations: [DashedStringPipe, ToRenderableLanguagePipe],
  imports: [
    CommonModule
  ],
  exports: [
    DashedStringPipe,
    ToRenderableLanguagePipe,
  ],
})
export class PipesModule { }
