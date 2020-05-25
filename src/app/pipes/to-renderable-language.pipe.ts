import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toRenderableLanguage'
})
export class ToRenderableLanguagePipe implements PipeTransform {

  transform(text: string): string {
    return text

    const supported = [
      'cpp',
      'markup',
      'html',
      'xml',
      'svg',
      'css',
      'clike',
      'cpp',
    ]

    const dict = {
      'jsx': 'javascript',
      'tsx': 'typescript',
      'c++': 'clike',
    }

    return text.replace(/```[\w\d\+\-]+/gi, (match) => {
      const key = match.split(/^`+/).join('')
      const translation = dict[key] || 'clike'

      return '```' + translation
    })

  }

}
