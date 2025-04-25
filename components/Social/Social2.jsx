/* The commented code you provided is a JavaScript React component named `Social2`. It appears to be a
component that renders a list of social media icons with links. Here's a breakdown of the code: */
import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Social2 = () => {
  return (
    <ul className="st-social-btn st-style1 st-mp0">
      <li>
        <Link to='' target='_blank'>
          <Icon icon="fa6-brands:facebook-f" />
        </Link>
      </li>
      <li>
        <Link to='' target='_blank'>
          <Icon icon="fa6-brands:linkedin-in" />
        </Link>
      </li>
      <li>
        <Link to='' target='_blank'>
          <Icon icon="fa:snapchat-ghost" />
        </Link>
      </li>
      <li>
        <Link to='' target='_blank'>
          <Icon icon="fa:twitter" />
        </Link>
      </li>
      <li>
        <Link to='' target='_blank'>
          <Icon icon="fa:youtube-play" />
        </Link>
      </li>
    </ul>
  )
}

export default Social2;
