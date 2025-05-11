import { loadCSSFromString } from '@/lib/utils';

/**
 * Dynamically loads the Roboto and Roboto Condensed fonts from Google Fonts
 */
export function loadFonts() {
  loadCSSFromString(`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Condensed:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  `);
}

export function loadMaterialIcons() {
  loadCSSFromString(`
    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
      vertical-align: middle;
    }
  `);
}
