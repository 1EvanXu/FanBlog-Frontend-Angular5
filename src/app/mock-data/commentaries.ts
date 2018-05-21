const commentary1 = {
  id: 1,
  commentator: 'commentator1',
  commentTime: '2018-05-17 16:27',
  commentaryContent: 'commentary content test commentary content test commentary content test commentary content test commentary conten' +
  't test commentary content test commentary content test commentary content test commentary content test',
  childrenCommentary: [
    {
      id: 2,
      commentator: 'child-commentator1-1',
      commentTime: '2018-05-17 16:27',
      commentaryContent: 'commentary content test commentary content test commentary content test commentary content' +
      ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
    },
    {
      id: 3,
      commentator: 'child-commentator1-2',
      commentTime: '2018-05-17 16:27',
      commentaryContent: 'commentary content test commentary content test commentary content test commentary content' +
      ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
    },
    {
      id: 4,
      commentator: 'child-commentator1-3',
      commentTime: '2018-05-17 16:27',
      commentaryContent: 'commentary content test commentary content test commentary content test commentary content' +
      ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
    },
    {
      id: 5,
      commentator: 'child-commentator1-3',
      commentTime: '2018-05-17 16:27',
      commentaryContent: 'commentary content test commentary content test commentary content test commentary content' +
      ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
    },
    {
      id: 6,
      commentator: 'child-commentator1-3',
      commentTime: '2018-05-17 16:27',
      commentaryContent: 'commentary content test commentary content test commentary content test commentary content' +
      ' test commentary content test commentary content test commentary content test commentary content test commentary content test',
    },
  ]
};

const commentary2 = {
  id: 7,
  commentator: 'commentator',
  commentTime: '2018-05-17 16:27',
  commentaryContent: ' commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test ' +
  'commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test',
  childrenCommentary: [
    {
      id: 9,
      commentator: 'child-commentator2-1',
      commentTime: '2018-05-17 16:27',
      commentaryContent: ' commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test ' +
      'commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test',
    },
    {
      id: 10,
      commentator: 'child-commentator2-2',
      commentTime: '2018-05-17 16:27',
      commentaryContent: ' commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test ' +
      'commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test commentary content 2 test',
    }
  ]
};

const commentary3 = {
  id: 11,
  commentator: 'commentator3',
  commentTime: '2018-05-17 16:27',
  commentaryContent: ' commentary content 3 commentary content 3 commentary content 3 commentary content 3 commentary ' +
  'content 3 commentary content 3 commentary content 3 commentary content 3 commentary content 3 commentary content 3 commentary content 3',
  childrenCommentary: []
};

export const COMMENTARIES_1 = [
  commentary1, commentary3
];

export const COMMENTARIES_2 = [
  commentary1, commentary2, commentary3
];
export const COMMENTARIES_3 = [
  commentary3, commentary3, commentary3, commentary3, commentary3, commentary3,
];
