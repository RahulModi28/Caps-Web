import fs from 'fs';
import path from 'path';

/**
 * Dynamically assembles the full page HTML by combining the header, page body, and footer.
 * Also replaces navigation classes to style the current route link as active (w--current).
 */
export function assemblePage(bodyContentHtml: string, currentRoute: string): string {
  const headerPath = path.join(/*turbopackIgnore: true*/ process.cwd(), 'app/header.html');
  const footerPath = path.join(/*turbopackIgnore: true*/ process.cwd(), 'app/footer.html');

  let header = fs.readFileSync(headerPath, 'utf8');
  const footer = fs.readFileSync(footerPath, 'utf8');

  // 1. Add active class w--current to the active <a> tag
  // We match the <a> tag containing href="currentRoute"
  const anchorTagRegex = new RegExp(`(<a\\s+[^>]*href="${currentRoute}"[^>]*>)`, 'i');
  header = header.replace(anchorTagRegex, (match) => {
    if (match.includes('w--current')) return match;
    if (match.includes('class="')) {
      return match.replace(/class="([^"]*)"/i, 'class="$1 w--current"');
    } else {
      return match.replace(/<a/i, '<a class="w--current"');
    }
  });

  // 2. Remove default w--current on root link if not on homepage
  if (currentRoute !== '/') {
    header = header.replace('class="logo_component w-inline-block w--current"', 'class="logo_component w-inline-block"');
    header = header.replace('class="nav-menu_link-group-tab_link w-inline-block w--current"', 'class="nav-menu_link-group-tab_link w-inline-block"');
  }

  return `${header}\n${bodyContentHtml}\n${footer}`;
}

/**
 * Loads the raw HTML body content of a page from the project workspace.
 */
export function loadBodyContent(relativeFilePath: string): string {
  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativeFilePath);
  return fs.readFileSync(fullPath, 'utf8');
}
