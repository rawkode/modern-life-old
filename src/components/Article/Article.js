import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Article.module.scss';

const Article = ({ article }) => {
  const {
    tags,
    title,
    date
  } = article.frontmatter;

  const { html } = article;
  const { tagSlugs } = article.fields;

  return (
    <div className={styles['article']}>
      <Link className={styles['article__home-button']} to="/">All Articles</Link>

      <div className={styles['article__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['article__footer']}>
        <Meta date={date} />
        <Tags tags={tags} tagSlugs={tagSlugs} />
        <Author />
      </div>

      <div className={styles['article__comments']}>
        <Comments articleSlug={article.fields.slug} articleTitle={article.frontmatter.title} />
      </div>
    </div>
  );
};

export default Article;
