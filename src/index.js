/** *************************************************************
https://rinsham10.github.io/v1/
2025 Mohammed Rinsham - mohammedrinsham@gmail.com

************************************************************* */
import initContactMenu from './components/contact-modal/init-contact-modal';
import initForm from './components/form/form';
import initProjects from './components/projects/projects';
import initSkills from './components/skills/skills';
import initDefaults from './utilities/handle-defaults';
import initTheme from './utilities/set-theme';
/** ************************************ */
/** ************************************ */
const appInit = () => {
  initTheme();
  initProjects();
  initSkills();
  initContactMenu();
  initForm();
  initDefaults();
};

appInit();
