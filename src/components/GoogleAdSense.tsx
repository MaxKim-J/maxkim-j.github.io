import React, { useEffect } from 'react';

const AD_CLIENT = 'ca-pub-5727170943665894';
const AD_SLOT = '7028040177';

export function GoogleAdSense() {
  useEffect(() => {
    const browserWindow = window as any;
    (browserWindow.adsbygoogle = browserWindow.adsbygoogle || []).push({});
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}
