'use client'

import React, { useEffect } from 'react';

export function CalendlyWidget({ data }) {
  const { fields } = data

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full h-[1200px] lg:h-[799px] rounded-xl"
      data-url={fields.embed}
    />
  );
}