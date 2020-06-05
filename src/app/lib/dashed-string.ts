import * as _ from 'ramda';

const __ = _.__

export function toDashedString(str: string): string {
  // TODO: create a dictionary

  return _.pipe(
    _.replace(/\&/g, ' and '),
    _.replace(/\@/g, ' at '),
    _.replace(/\%/g, ' percent '),
    _.replace(/\+/g, ' plus '),
    _.replace(/[\"\']+/g, ''),
    _.replace(/[\s\W_]+/g, '-'),
    _.replace(/\-+/g, '-'),
    _.replace(/^\-/, ''),
    _.replace(/\-$/, ''),
    _.toLower,
  )(str)
}
