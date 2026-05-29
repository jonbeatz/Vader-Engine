/**
 * lint-staged — excludes paths ignored by biome.json (e.g. design_references).
 */
const DESIGN_REF = 'media/design-references';
const TEMPLATES = 'templates/';
const ARCHIVE = '_archive/';

function filterBiomePaths(filenames) {
  return filenames.filter((f) => {
    const normalized = f.replace(/\\/g, '/');
    return (
      !normalized.includes(DESIGN_REF) &&
      !normalized.includes(TEMPLATES) &&
      !normalized.includes(ARCHIVE)
    );
  });
}

export default {
  '*.{js,mjs,ts,tsx,jsx}': (filenames) => {
    const files = filterBiomePaths(filenames);
    return files.length > 0 ? [`biome check --write ${files.join(' ')}`] : [];
  },
  '!(package-lock)*.{json,css}': (filenames) => {
    const files = filterBiomePaths(filenames);
    return files.length > 0 ? [`biome format --write ${files.join(' ')}`] : [];
  },
};
