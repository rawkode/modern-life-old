import React from 'react';
import renderer from 'react-test-renderer';
import Article from './Article';

describe('Article', () => {
  const props = {
    article: {
      html: '<p>test</p>',
      fields: {
        tagSlugs: [
          '/test_0',
          '/test_1'
        ]
      },
      frontmatter: {
        date: '2016-09-01',
        tags: [
          'test_0',
          'test_1'
        ],
        title: 'test'
      }
    }
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Article {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
