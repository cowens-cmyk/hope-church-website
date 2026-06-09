/* Hope Church — brand image paths.
   Previously these lived on window.__resources (set in index.html). They are now
   a plain module so components can read them during static pre-rendering (build
   time, in Node, where there is no `window`) as well as in the browser. */
export const resources = {
  logoHorizBlue: '/assets/logo-horizontal-blue.png',
  logoHorizWhite: '/assets/logo-horizontal-white.png',
  logoHorizReversed: '/assets/logo-horizontal-reversed.png',
  logoStackedReversed: '/assets/logo-stacked-reversed.png',
  iconWhite: '/assets/icon-white.png',
  appScreenshot: '/assets/app-screenshot.png',
  lobbyWelcome: '/assets/lobby-welcome.jpg',
  aboutOriginWorship: '/assets/about-origin-worship.jpg',
  aboutVisionWelcome: '/assets/about-vision-welcome.jpg',
  aboutTeamGroup: '/assets/about-team-group.jpg',
};

export default resources;
