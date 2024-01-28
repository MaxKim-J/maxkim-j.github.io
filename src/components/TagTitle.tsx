import React from 'react';
import { tagTitleStyle } from './TagTitle.css';

interface Props {
  tag: string;
  count: number;
}

export function TagTitle({ tag, count }: Props) {
  return (
    <h1 className={tagTitleStyle}>
      태그 모아보기 - #{tag} ({count})
    </h1>
  );
}
