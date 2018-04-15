import PairedTag from './PairedTagExtends';
import SingleTag from './SingleTagExtends';

const singleTagsList = new Set(['hr', 'br', 'img']);
export default (name, ...args) => {
  const C = singleTagsList.has(name) ? SingleTag : PairedTag;
  return new C(name, ...args);
};
