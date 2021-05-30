import { platform } from 'src/js/constants/envs.js';

export function processContent(text) {
  if (platform === 'ios-app') text = makeImagesRelative(text);
  return text;
}

const MAKE_IMAGES_RELATIVE_REG_EXP = /src="\/([^"]+)"/g;
function makeImagesRelative(text) {
  return text.replace(MAKE_IMAGES_RELATIVE_REG_EXP, 'src="./$1"');
}
