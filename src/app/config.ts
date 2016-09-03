// import { MenuItem } from 'material-ui';

export let config = {
  //path to image directory relative from the application's public directory (the www dir)
  imagePath: 'img'
};

/**
 * Items for the main AppBar
 */
export let menuNavItems = [
  { route: '/', text: 'Your Activities' },
  { route: '/discover', text: 'Discover' },
  { route: '/stream', text: 'Activity Stream' },
  { route: '/inbox', text: 'Inbox' },
];
