import type { Meta, StoryObj } from '@storybook/angular';
import { LiveComponent } from './live.component';

const meta: Meta<LiveComponent> = {
  component: LiveComponent,
  title: 'LiveComponent'
};
export default meta;
type Story = StoryObj<LiveComponent>;

export const Primary: Story = {
  args: {
    generationStarted: false,
    code: '53'
  }
};
