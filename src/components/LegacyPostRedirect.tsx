import React from 'react';

const NEW_SITE_URL = 'https://jonghyuk.kim';

const KNOWLEDGE_SLUGS = new Set([
  'js-map',
  'js-pure-function',
  'git-start',
  'react-component-this',
  'cra-webpack-config',
  'dom-pos-scroll',
  'protect-var-against-undefined',
  'async-console-log',
  'nuxt-ssr',
  'keyboard-input',
  'packet-travel',
  'tanstack-query-v4-preview',
  'nodejs-server-monitoring',
  'coupling',
  'local-dev-server',
  'cohesion',
  'dependency-protocol',
]);

export function postUrl(lang: 'ko' | 'en', slug: string) {
  const prefix = lang === 'en' ? '/en' : '';
  const kind = KNOWLEDGE_SLUGS.has(slug) ? 'knowledges' : 'articles';
  return `${NEW_SITE_URL}${prefix}/${kind}/${encodeURIComponent(slug)}`;
}

interface Props {
  target: string;
}

export default function LegacyPostRedirect({ target }: Props) {
  return (
    <main style={{ padding: '32px 16px' }}>
      <p>이 글은 새로운 주소로 이동했습니다.</p>
      <p>
        <a href={target}>{target}</a>
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
    </main>
  );
}

interface HeadProps {
  target: string;
  title: string;
  description: string;
}

export function LegacyPostRedirectHead({ target, title, description }: HeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <link rel="canonical" href={target} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={target} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
    </>
  );
}
