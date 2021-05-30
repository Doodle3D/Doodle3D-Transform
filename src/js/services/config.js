import createDebug from 'debug';
const debug = createDebug('d3d:config');

const NAME = 'doodle3d_config';

const defaultConfig = {
  experimentalColorPicker: false,
  experimentalStampTool: false,
  experimentalColorUnionExport: false,
  d3ArrowHelpers: false,
  gaDebug: false,
  exportLineWidth: 2.0 // in mm
};

let parsedConfig = {};
try {
  const rawConfig = localStorage.getItem(NAME);
  if (rawConfig) {
    parsedConfig = JSON.parse(rawConfig);
  }
} catch (error) {
  /* eslint-disable no-console */
  console.error('Parsing doodle3d config from localStorage failed, falling back to default');
  /* eslint-enable no-console */
}

let config = {
  ...defaultConfig,
  ...parsedConfig
};
debug('config: ', config);

export const get = () => config;
export const set = (newConfig) => {
  config = newConfig;
  localStorage.setItem(NAME, JSON.stringify(config));
  return config;
};
export const extend = (newConfig) => set({ ...config, ...newConfig });
export const reset = () => set(defaultConfig);

window.config = { get, set, extend, reset };
