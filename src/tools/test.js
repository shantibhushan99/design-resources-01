const CATEGORY = 'Icon Fonts';

const IconFonts = IconFont1.map((e, index) => ({
  ...e,
  category: CATEGORY,
  id: CATEGORY.toLowerCase().split(' ').join('') + index,
}));

export default IconFonts;
