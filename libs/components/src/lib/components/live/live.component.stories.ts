import type { Meta, StoryObj } from '@storybook/angular';
import { LiveComponent } from './live.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<LiveComponent> = {
  component: LiveComponent,
  title: 'LiveComponent'
};
export default meta;
type Story = StoryObj<LiveComponent>;

export const Primary: Story = {
  args: {
    generationStarted: false
  }
};

export const Heading: Story = {
  args: {
    generationStarted: false
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/live works!/gi)).toBeTruthy();
  }
};
