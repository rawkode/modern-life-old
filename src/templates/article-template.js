import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Article from '../components/Article';

const ArticleTemplate = ({ data }) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle
  } = data.site.siteMetadata;

  const {
    title: articleTitle,
    description: articleDescription
  } = data.markdownRemark.frontmatter;

  const metaDescription = articleDescription !== null ? articleDescription : siteSubtitle;

  return (
    <Layout title={`${articleTitle} - ${siteTitle}`} description={metaDescription}>
      <Article article={data.markdownRemark} />
    </Layout>
  );
};

export const query = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        author {
          name
          contacts {
            twitter
          }
        }
        disqusShortname
        subtitle
        title
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
      }
    }
  }
`;

export default ArticleTemplate;
