import * as React from 'react';

import LegacyPostRedirect, { LegacyPostRedirectHead } from '../../components/LegacyPostRedirect';

const TARGET = 'https://jonghyuk.kim/en/';

const IndexPage = () => <LegacyPostRedirect target={TARGET} />;

export const Head = () => (
  <LegacyPostRedirectHead
    target={TARGET}
    title="Knowledge Machine"
    description="Knowledge Machine"
  />
);

export default IndexPage;
