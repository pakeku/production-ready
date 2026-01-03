import React from 'react';
import { UiProvider } from '@repo/ui';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => React.createElement(UiProvider, null, React.createElement(Story)),
  ],
};

export default preview;
