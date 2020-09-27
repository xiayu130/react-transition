import React, {
  useState
} from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { AnimateProps } from './Animate';
import Animate from './Animate';

export default {
  title: 'Example/Animate',
  component: Animate,
} as Meta;

const Template: Story<AnimateProps> = (args) => {
  const [play, setPlay] = useState(true)

  return (
    <>
      <button onClick={() => setPlay(!play)}>toggle</button>
      <Animate
        {...args}
        animation={play}
      >
        <div>动画</div>
      </Animate>
    </>

  );
}

export const Default = Template.bind({});
