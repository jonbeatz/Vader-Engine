/**
 * lint-staged — excludes paths ignored by biome.json (e.g. design_references).
 */
const DESIGN_REF = '.cursor/design_references';

function filterBiomePaths(filenames) {
  return filenames.filter((f) => !f.replace(/\\/g, '/').includes(DESIGN_REF));
}

export default {
  '*.{js,mjs,ts,tsx,jsx}': (filenames) => {
    const files = filterBiomePaths(filenames);
    return files.length > 0 ? [`biome check --write ${files.join(' ')}`] : [];
  },
  '!(package-lock)*.{json,css}': ['biome format --write'],
};
