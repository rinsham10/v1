import adobeSvg from '../images/svg/adobe.svg';
import arrowRightSvg from '../images/svg/arrowRight.svg';
import bentarrowSvg from '../images/svg/bentarrow.svg';
import calendarSvg from '../images/svg/calendar.svg';
import copySvg from '../images/svg/copy.svg';
import cssSvg from '../images/svg/css.svg';
import githubSvg from '../images/svg/githuboutline.svg';
import gmailSvg from '../images/svg/gmail.svg';
import phoneSvg from '../images/svg/phone.svg';
import linkedinSvg from '../images/svg/linkedinw.svg';
import javaSvg from '../images/svg/java.svg';
import jsSvg from '../images/svg/js.svg';
import pythonSvg from '../images/svg/python.svg';
import sqlSvg from '../images/svg/sql.svg';
import lockSvg from '../images/svg/lock.svg';
import mailtoSvg from '../images/svg/mailto.svg';
import nextSvg from '../images/svg/next.svg';
import nodeSvg from '../images/svg/node.svg';
import reactSvg from '../images/svg/react.svg';
import linuxSvg from '../images/svg/linux.svg';
import typescriptSvg from '../images/svg/typescript.svg';
import vanillaSvg from '../images/svg/vanilla.svg';
import viteSvg from '../images/svg/vite.svg';
import webpackSvg from '../images/svg/webpack.svg';
import wordpressSvg from '../images/svg/wordpress.svg';

const svgIcons = {
  java: javaSvg,
  python: pythonSvg,
  sql: sqlSvg,
  linux: linuxSvg,
  js: jsSvg,
  adobe: adobeSvg,
  filler:require('../images/svg/vanilla.svg'), // 👈 fallback
  arrow: arrowRightSvg,
  bentarrow:bentarrowSvg,
  calendar: calendarSvg,
  css: cssSvg,
  copy: copySvg,
  github: githubSvg,
  gmail: gmailSvg,
  phone: phoneSvg,
  linkedin: linkedinSvg,
  lock: lockSvg,
  mailto: mailtoSvg,
  next: nextSvg,
  node: nodeSvg,
  react: reactSvg,
  typescript: typescriptSvg,
  vanilla: vanillaSvg,
  vite: viteSvg,
  webpack: webpackSvg,
  wordpress: wordpressSvg,
};

export default svgIcons;
window.svgIcons = svgIcons;