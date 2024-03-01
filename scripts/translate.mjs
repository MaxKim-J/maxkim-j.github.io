import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'node:path';
import { Performance } from 'perf_hooks';
import fetch from 'node-fetch';

const {
  parsed: { DEEPL_API_KEY },
} = dotenv.config('../.env');

const TARGET_LANG = 'en';
const CONTENT_DIR_PATH = path.resolve('src/assets/contents');

ateTranslateNecessity = async ({ lang }) => {
  const allBlogContents = await fs.readdir(CONTENT_DIR_PATH);
  const allOriginalBlogContents = allBlogContents.filter(
    (file) => path.extname(file) === '.mdx' && !file.endsWith(`-${lang}.mdx`)
  );
  const allTranslatedBlogContents = allBlogContents
    .filter((file) => file.endsWith(`-${lang}.mdx`))
    .map((file) => file.replace(/-en\.mdx$/, '.mdx'));

  const allNotYetTranslatedBlogContents = allOriginalBlogContents.filter(
    (file) => !allTranslatedBlogContents.includes(file)
  );

  return { allOriginalBlogContents, allNotYetTranslatedBlogContents };
};

const parseMdxFileContent = async (contentName) => {
  const contentPath = path.resolve(CONTENT_DIR_PATH, contentName);
  const fileString = await fs.readFile(contentPath, 'utf8');
  return { content: fileString, path: contentPath };
};

async function main() {
  console.info('openAI API로 블로그 글 번역을 합니다.');

  const { allOriginalBlogContents, allNotYetTranslatedBlogContents } =
    await validateTranslateNecessity({ lang: TARGET_LANG });

  console.info(`전체 한국어 컨텐츠 ${allOriginalBlogContents.length}개`);
  console.info(
    `${TARGET_LANG}으로 번역이 안 된 블로그 컨텐츠 ${allNotYetTranslatedBlogContents.length}개를 번역합니다.`
  );
  console.info();

  const translateTargetContents = await Promise.all(
    allNotYetTranslatedBlogContents.map((content) => parseMdxFileContent(content))
  );

  let count = allNotYetTranslatedBlogContents.length;
  let idx = 0;

  for (let targetContents of translateTargetContents) {
    const { content, path } = targetContents;
    const start = performance.now();
    console.info();
    console.info(`-----------------------`);
    console.info(`(${idx + 1}/${count}) ${path} 번역 시작`);

    const url = 'https://api.deepl.com/v2/translate';
    const options = {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: content,
        target_lang: TARGET_LANG,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const translatedContent = data.translations[0].text;
      const translatedMdxPath = path.replace(/\.mdx$/, `-${TARGET_LANG}.mdx`);
      console.info(`${translatedMdxPath}에 번역 파일을 작성합니다.`);

      await fs.writeFile(translatedMdxPath, translatedContent);
    } catch (error) {
      console.error('Error:', error);
    }

    const end = performance.now();
    console.info(`(${idx + 1}/${count}) ${path} 번역 완료, duration: ${end - start}ms`);
    idx += 1;
    console.info(`-----------------------`);
    console.info();
  }
}

main();
