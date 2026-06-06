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

/**
 * Replaces the inner HTML of a container identified by its start tag pattern.
 * It counts nested div elements to correctly locate the container's closing tag.
 */
export function replaceInnerDiv(html: string, classPattern: string, replacementContent: string): string {
  const startIndex = html.indexOf(classPattern);
  if (startIndex === -1) return html;

  // Find the end of the start tag
  const tagEndIndex = html.indexOf('>', startIndex);
  if (tagEndIndex === -1) return html;

  // Now, find the matching closing </div>
  let depth = 1;
  let cursor = tagEndIndex + 1;
  while (depth > 0 && cursor < html.length) {
    if (html.substring(cursor, cursor + 4).toLowerCase() === '<div') {
      depth++;
      cursor += 4;
    } else if (html.substring(cursor, cursor + 6).toLowerCase() === '</div>') {
      depth--;
      if (depth === 0) {
        break;
      }
      cursor += 6;
    } else {
      cursor++;
    }
  }

  if (depth === 0) {
    const before = html.substring(0, tagEndIndex + 1);
    const after = html.substring(cursor);
    return `${before}\n${replacementContent}\n${after}`;
  }

  return html;
}

/**
 * Injects self-guided modules into the modules page HTML structure.
 */
export function injectSelfGuidedModules(html: string, modules: any[]): string {
  const cardsHtml = modules.map(m => `
    <div data-wf--component-card-stack---card-item--variant="white" class="card-stack_card" data-category="${m.category}" style="transition: opacity 0.3s ease, transform 0.3s ease;">
      <div class="card-stack_card_icon-wrapper">
        <span data-wf--global-content-icon--icon="${m.icon_name || 'plant'}" aria-hidden="true" style="--width: 100%;" class="icon_content"></span>
      </div>
      <h4 class="card-stack_title">${m.title}</h4>
      <div data-columns="1" data-wf--global-rich-text-text-image--text-size="regular" class="rich-text w-richtext">
        <p>${m.description}</p>
      </div>
      ${m.resource_url ? `
      <div class="spacer-1"></div>
      <div data-link-fill-parent="0" data-size="0.8" data-wf--element-button--type="secondary" class="button_component">
        <a href="${m.resource_url}" target="_blank" class="button_link w-inline-block"></a>
        <div class="button_bg-hover"></div>
        <div data-icon-position="1" class="button_content-wrapper">
          <p class="button_text">Access Folder</p>
        </div>
      </div>
      ` : ''}
    </div>
  `).join('\n');

  return replaceInnerDiv(html, 'class="card-stack_cards-list"', cardsHtml);
}

/**
 * Injects reference materials (templates) into the reference materials page HTML structure.
 */
export function injectReferenceMaterials(html: string, materials: any[]): string {
  const cardsHtml = materials.map(m => `
    <div data-wf--component-card-stack---card-item--variant="white" class="card-stack_card">
      <div class="card-stack_card_icon-wrapper">
        <span data-wf--global-content-icon--icon="${m.icon_name || 'file'}" aria-hidden="true" style="--width: 100%;" class="icon_content"></span>
      </div>
      <h4 class="card-stack_title">${m.title}</h4>
      <div data-columns="1" data-wf--global-rich-text-text-image--text-size="regular" class="rich-text w-richtext">
        <p>${m.description}</p>
      </div>
      <div class="spacer-1"></div>
      <div data-link-fill-parent="0" data-size="0.8" data-wf--element-button--type="secondary" class="button_component">
        <a href="${m.download_url}" target="_blank" class="button_link w-inline-block"></a>
        <div class="button_bg-hover"></div>
        <div data-icon-position="1" class="button_content-wrapper">
          <p class="button_text">Download ${m.file_type.toUpperCase()} (${m.file_size})</p>
        </div>
      </div>
    </div>
  `).join('\n');

  return replaceInnerDiv(html, 'class="card-stack_cards-list"', cardsHtml);
}

/**
 * Injects FAQs into the FAQ page HTML structure.
 */
export function injectFAQs(html: string, faqs: any[]): string {
  const faqsHtml = faqs.map(f => `
    <details itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question" data-group="faq" class="accordions_item_component">
      <summary class="accordions_item_toggle">
        <p itemprop="name" class="accordions_item_title text-weight-medium">${f.question}</p>
        <div class="accordions_item_icon-wrapper">
          <div class="accordions_item_icon"><span data-wf--global-general-icon--icon="minus" aria-hidden="true" style="--width: 100%" class="icon_svg"></span></div>
          <div class="accordions_item_icon is-vertical"><span data-wf--global-general-icon--icon="minus" aria-hidden="true" style="--width: 100%" class="icon_svg"></span></div>
        </div>
      </summary>
      <div itemtype="https://schema.org/Answer" itemscope="" itemprop="acceptedAnswer" class="accordions_item_content-wrapper">
        <div class="rich-text w-richtext">
          <p>${f.answer}</p>
        </div>
        <div class="accordions_item_spacer"></div>
      </div>
    </details>
  `).join('\n');

  return replaceInnerDiv(html, 'class="faq_accordions"', faqsHtml);
}

/**
 * Injects timeline steps into the timeline page HTML structure.
 */
export function injectTimelineSteps(html: string, steps: any[]): string {
  const stepsHtml = `
    <div class="display-contents">
      ${steps.map(s => `
        <div class="steps-stagger_item is-timeline-step">
          <p class="academic-excellence_number">${s.step_number}</p>
          <div class="spacer-0d75"></div>
          <div class="line-divider"></div>
          <div class="spacer-1"></div>
          <h4>${s.step_title}</h4>
          <p>${s.step_description}</p>
        </div>
      `).join('\n')}
    </div>
  `;

  return replaceInnerDiv(html, 'class="steps-stagger_component is-timeline"', stepsHtml);
}

/**
 * Injects news updates into the home page updates slider.
 */
export function injectCampusUpdates(html: string, updates: any[]): string {
  const updatesHtml = updates.map(u => `
    <div role="listitem" class="latest-news_slider_slide swiper-slide w-dyn-item">
      <a href="#services" class="news_card_component w-inline-block">
        <div class="overflow-clip">
          ${u.image_url ? `
            <img src="${u.image_url}" class="news_card_image" alt="${u.title}" style="min-height: 180px; object-fit: cover;" />
          ` : `
            <img
              src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 16 9'%2F%3E"
              class="news_card_image img-placeholder-dashed"
              alt="[ Image Placeholder ]"
              style="
                background-color: rgba(148, 163, 184, 0.05);
                border: 2px dashed rgba(148, 163, 184, 0.25);
                min-height: 180px;
                object-fit: cover;
              "
            />
          `}
        </div>
        <div class="news_card_meta-wrap">
          <p class="news_card_category">${u.category || 'Campus Update'}</p>
          <p>${new Date(u.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div class="news_card_content-wrap">
          <h3 class="news_card_title">${u.title}</h3>
          <div class="spacer-0d5"></div>
          <p class="news_card_summary">${u.summary}</p>
        </div>
      </a>
    </div>
  `).join('\n');

  return replaceInnerDiv(html, 'class="latest-news_slider_wrapper swiper-wrapper"', updatesHtml);
}

