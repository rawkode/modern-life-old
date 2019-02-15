import React from 'react';

const ArticlePreview = ({ entry, widgetFor }) => {
  const body = widgetFor('body');
  const title = entry.getIn(['data', 'title']);

  return (
    <div className="article">
      <h1 className="article__title">{title}</h1>
      <div className="article__body">{body}</div>
    </div>
  );
};

export default ArticlePreview;
