import {ChildCommentary, Commentary} from '../entities/commentary';
const childCommentary1_1 = new ChildCommentary(
  2,
  'child-commentator1-1',
  '2018-05-17 16:27',
   'commentary content test commentary content test commentary content test commentary content' +
' test commentary content test commentary content test commentary content test commentary content test commentary content test',
);
const childCommentary1_2 = new ChildCommentary(
   3,
  'child-commentator1-2',
  '2018-05-17 16:27',
  'commentary content test commentary content test commentary content test commentary content' +
' test commentary content test commentary content test commentary content test commentary content test commentary content test',
);
const childCommentary1_3 = new ChildCommentary(
  4,
  'child-commentator1-3',
  '2018-05-17 16:27',
  'commentary content test commentary content test commentary content test commentary content' +
  ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
);
const childCommentary1_4 = new ChildCommentary(
  4,
  'child-commentator1-3',
  '2018-05-17 16:27',
  'commentary content test commentary content test commentary content test commentary content' +
  ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
);
const childCommentary1_5 = new ChildCommentary(
  5,
  'child-commentator1-3',
  '2018-05-17 16:27',
  'commentary content test commentary content test commentary content test commentary content' +
  ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
);
const parentCommentary1 = new Commentary(
  1,
  'commentator1',
  '2018-05-17 16:27',
  'commentary content test commentary content test commentary content test commentary content test commentary conten' +
't test commentary content test commentary content test commentary content test commentary content test',
  [childCommentary1_1, childCommentary1_2, childCommentary1_3, childCommentary1_4, childCommentary1_5]
);

const childCommentary2_1 = new ChildCommentary(
  9,
  'child-commentator2-1',
  '2018-05-17 16:27',
  ' commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test ' +
  'commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test',

);
const childCommentary2_2 = new ChildCommentary(
  10,
  'child-commentator2-2',
  '2018-05-17 16:27',
  ' commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test ' +
  'commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test',

);

const parentCommentary2 = new Commentary(
  7,
  'commentator',
  '2018-05-17 16:27',
  ' commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test ' +
  'commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test',
  [childCommentary2_1, childCommentary2_2]
);


const parentCommentary3 = new Commentary(
   11,
  'commentator3',
  '2018-05-17 16:27',
  ' commentary content 3 commentary content 3 commentary content 3 commentary content 3 commentary ' +
  'content 3 commentary content 3 commentary content 3 commentary content 3 commentary content 3 commentary content 3 commentary content 3',
  []
);

export const COMMENTARIES_1 = [
  parentCommentary1, parentCommentary3
];

export const COMMENTARIES_2 = [
  parentCommentary1, parentCommentary2, parentCommentary3
];
export const COMMENTARIES_3 = [
  parentCommentary2, parentCommentary3, parentCommentary3, parentCommentary3
];
