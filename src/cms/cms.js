import CMS from 'netlify-cms';
import PagePreview from './preview-templates/page-preview';
import ArticlePreview from './preview-templates/article-preview';

CMS.registerPreviewTemplate('pages', PagePreview);
CMS.registerPreviewTemplate('articles', ArticlePreview);
