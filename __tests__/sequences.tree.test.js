import { l, length } from 'hexlet-pairs-data'; // eslint-disable-line
import { make, append, node, toString as htmlToString } from 'hexlet-html-tags'; // eslint-disable-line
import { sequencesTask } from '../src/sequences';
import { listToString } from '../src/sequences/tree';

const { select } = sequencesTask;

/*

*/

describe('dom', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));
    const children1 = l(node('li', 'item 1'), node('li', 'item 2'));
    const dom4 = append(dom3, node('p', l(node('ul', children1))));
    const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
    const dom5 = append(dom4, node('ol', children2));
    const dom6 = append(dom5, node('p', 'is a functional language'));
    const children3 = l(node('li', 'item'));
    const dom7 = append(dom6, node('div', l(node('p', l(node('ul', children3))))));
    const dom8 = append(dom7, node('div', l(node('p', 'another text'))));
    const dom9 = append(dom8, node('div', l(node('div', l(node('p', l(node('span', 'text'))))))));
    const dom10 = append(dom9, node('div', l(node('a', l(node('div', l(node('p', l(node('span', 'text'))))))))));
    const dom11 = append(dom10, node('h1', 'prolog'));
    dom = append(dom11, node('p', 'is about logic'));
  });

  it('#select', () => {
    console.log(listToString(select(l('p', 'ul', 'li'), dom)));
    expect(length(select(l('p', 'ul', 'li'), dom))).toBe(2);
    // expect(length(select(l('div', 'div', 'p'), dom))).toBe(1);
    // expect(length(select(l('div', 'p'), dom))).toBe(2);
    // expect(length(select(l('p'), dom))).toBe(8);
    // expect(length(select(l('ul'), dom))).toBe(2);
    // expect(length(select(l('div'), dom))).toBe(4);
  });
});
