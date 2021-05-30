import { generateThumb } from '@doodle3d/doodle3d-core/lib/utils/generateThumb.js';
import sketchDataToJSON from '@doodle3d/doodle3d-core/lib/shape/sketchDataToJSON';
import { VERSION } from '@doodle3d/doodle3d-core/lib/constants/general.js';

export const THUMBNAIL_WIDTH = 240 * 2; // multiply times 2 because retina
export const THUMBNAIL_HEIGHT = 200 * 2;
export async function sketchDataToDoc(name, sketcherState) {
  const imgBlob = await generateThumb(sketcherState, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, 'blob');
  const sketchData = JSON.stringify(sketchDataToJSON(sketcherState));
  const sketchBlob = new Blob([sketchData], { type: 'application/json' });

  return {
    name,
    appVersion: VERSION,
    _attachments: {
      img: { content_type: imgBlob.type, data: imgBlob },
      sketch: { content_type: sketchBlob.type, data: sketchBlob }
    }
  };
}

export function createUniqueName(name, names) {
  names = names.map(str => str.toUpperCase());

  if (!names.includes(name.toUpperCase())) return name;

  let counter = 1;
  while (names.includes(`${name.toUpperCase()} (${counter})`)) {
    counter ++;
  }
  return `${name} (${counter})`;
}
