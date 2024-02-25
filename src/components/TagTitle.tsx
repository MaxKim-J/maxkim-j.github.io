import React from 'react';
import { tagTitleStyle } from './TagTitle.css';
import { useTranslation } from 'react-i18next';

interface Props {
  tag: string;
  count: number;
}

export function TagTitle({ tag, count }: Props) {
  const { t } = useTranslation();

  return (
    <h1 className={tagTitleStyle}>
      {t('태그 모아보기')} - #{tag} ({count})
    </h1>
  );
}
