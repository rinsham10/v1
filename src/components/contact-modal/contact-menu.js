import contactData from '../../data/json/contact.json';
import useCopyToClipboard from '../../hooks/handle-copy';
import createButton from '../ui/button';
import createLink from '../ui/link';
import createToast from '../ui/toast';
import svgIcons from 'C:/Users/hp/Desktop/code/portfolio/v1/src/utilities/get-svg.js';

/**
 * createBadge
 */
const createBadge = (cname, href, title, dataAcc, dataBef, idx) => {
  const platform = cname.replace('badge-', '');
  const badge = document.createElement('div');
  badge.classList.add('cm-right--top__cell', cname);

  const badgeLink = createLink(href, title, 'cm-right--top__cell-badge', null);
  const badgeTop = document.createElement('div');
  badgeTop.classList.add('badge-top');

  const badgeTopProfile = document.createElement('div');
  badgeTopProfile.classList.add('badge-top--profile');

  const badgeTopContainerSvg = document.createElement('div');
  badgeTopContainerSvg.classList.add('badge-top--container--svg');

  const badgeTopContainerSvgImg = document.createElement('img');
  badgeTopContainerSvgImg.src = svgIcons[platform] || svgIcons['github'];
  badgeTopContainerSvgImg.alt = '';

  const badgeTopSpan = document.createElement('span');

  if (dataBef) {
    const [bef, aft] = dataBef;
    badgeTopSpan.dataset.acc = aft;
    badgeTopSpan.classList.add('badge-prof');
    badgeTopSpan.textContent = bef;
    badgeTopContainerSvgImg.classList.add('badge-mug');
  } else {
    badgeTopSpan.dataset.acc = dataAcc;
    badgeTopSpan.textContent = dataAcc;
    badgeTopContainerSvgImg.classList.add('icn-svg');
  }

  const badgeFooter = document.createElement('div');
  badgeFooter.classList.add('badge-footer');

  const badgeFooterIcon = document.createElement('img');
  badgeFooterIcon.src = svgIcons['bentarrow']; // Assuming you have a 'bentarrow' entry
  badgeFooterIcon.classList.add('icn-svg');
  badgeFooterIcon.alt = 'arrow';

  const badgeFooterSpan = document.createElement('span');
  badgeFooterSpan.textContent = title;

  badgeTopContainerSvg.append(badgeTopContainerSvgImg);
  badgeTopProfile.append(badgeTopContainerSvg, badgeTopSpan);
  badgeTop.append(badgeTopProfile);
  badgeFooter.append(badgeFooterIcon, badgeFooterSpan);
  badgeLink.append(badgeTop, badgeFooter);
  badge.append(badgeLink);
  return badge;
};

/**
 * Bottom contact cell (phone/email)
 */
const createCmBottomCell = (
  spanText,
  btnClass,
  btnTitle,
  btnHref,
  dataText,
  platform
) => {
  const menuCell = document.createElement('div');
  menuCell.classList.add('cm-right--bottom__cell');

  const menuSpan = document.createElement('span');
  menuSpan.textContent = spanText;

  const menuCellIcons = document.createElement('div');
  menuCellIcons.classList.add('cm-right--bottom__cell-icons');

  // Mailto button
  if (btnHref) {
    const menuLink = createLink(btnHref, 'Open Mail-to', 'cm-email-goto', null, '_self');
    const menuLinkImg = document.createElement('img');
    menuLinkImg.classList.add('icn-svg');
    menuLinkImg.src = svgIcons[platform];
    menuLinkImg.alt = platform;
    menuLink.append(menuLinkImg);
    menuCellIcons.append(menuLink);
  }

  // Copy button
  const menuBtn = createButton(null, `cm-copy ${btnClass}`, btnTitle, 'button');
  const menuBtnImg = document.createElement('img');
  menuBtnImg.classList.add('icn-svg');
  menuBtnImg.src = svgIcons['copy']; // Assuming copy icon is under `copy`
  menuBtnImg.alt = 'copy';

  menuBtn.addEventListener('click', () => {
    useCopyToClipboard(dataText);
    createToast(dataText, 'Copied!', 'success', 2);
  });

  menuBtn.append(menuBtnImg);
  menuCellIcons.append(menuBtn);
  menuCell.append(menuSpan, menuCellIcons);
  return menuCell;
};

/**
 * Contact menu creation
 */
const createContactMenu = () => {
  const { phone, email, badges } = contactData;

  const contactMenuWrapper = document.createElement('div');
  contactMenuWrapper.classList.add('cm-right');

  const contactMenuBody = document.createElement('div');
  contactMenuBody.classList.add('cm-right--top');

  for (const values of Object.values(badges)) {
    const badge = createBadge(...Object.values(values));
    contactMenuBody.append(badge);
  }

  const contactMenuFooter = document.createElement('div');
  contactMenuFooter.classList.add('cm-right--bottom', 'cm-right--bottom__body');

  contactMenuFooter.append(
    createCmBottomCell(
      phone,
      'cm-copy--phone',
      'Copy Phone Number',
      null,
      phone.replaceAll('-', ''),
      'phone' // platform icon key
    ),
    createCmBottomCell(
      email,
      'cm-copy--email',
      'Copy E-mail Address',
      `mailto:${email}`,
      email,
      'gmail' // platform icon key
    )
  );

  contactMenuWrapper.append(contactMenuBody, contactMenuFooter);
  contactMenuWrapper.firstElementChild.focus();
  return contactMenuWrapper;
};

export default createContactMenu;
