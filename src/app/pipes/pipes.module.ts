import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashedStringPipe } from './dashed-string.pipe';
import { ToRenderableLanguagePipe } from './to-renderable-language.pipe';
import { MomentAgoPipe } from './moment-ago.pipe';

@NgModule({
  declarations: [
    DashedStringPipe,
    ToRenderableLanguagePipe,
    MomentAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashedStringPipe,
    ToRenderableLanguagePipe,
    MomentAgoPipe,
  ],
})
export class PipesModule { }
