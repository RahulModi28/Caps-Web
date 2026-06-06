import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "CAPS - Centre for Academic and Professional Support | Christ University Yeshwanthpur",
  description:
    "The Centre for Academic and Professional Support (CAPS) at Christ University Yeshwanthpur Campus fosters students' holistic growth by offering training, mentoring, and support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wf-domain="caps.christuniversity.in"
      data-wf-page="689b9231663a4f08a91a5edb"
      data-wf-site="689b9231663a4f08a91a5f03"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <link href="/css/caps-shared.css" rel="stylesheet" type="text/css" />
        <link href="/css/caps-layout.css" rel="stylesheet" type="text/css" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html.w-mod-js:not(.w-mod-ix3) :is(.hero-special_bg-visual-wrapper, .hero-special_title .hero-special_title-normal, .hero-special_title .hero-special_title-accent, .hero-special_subtitle, .hero-special_video-card, .steps-stagger_component .steps-stagger_item, [data-fade], .nav-menu_container .navbar_logo-wrapper, .nav-menu_crest-wrapper, .nav-menu_cta-wrapper, .nav-menu_links-wrapper, .nav-menu_quicklinks_component, .nav-menu_footer-socials_list, .nav-menu_footer-credits_component, .nav-menu_link-group-tab_link-item, .nav-menu_left-bg, .nav-menu_search-wrapper, .nav-menu_link-group-tab_title-text, .section_hero-special .image_scroll-overlay, .cards-fly_card-list .cards-fly_card_component:nth-child(1), .cards-fly_card-list .cards-fly_card_component:nth-child(2), .cards-fly_card-list .cards-fly_card_component:nth-child(3), .cards-fly_card-list .cards-fly_card_component:nth-child(4), .cards-fly_card-list .cards-fly_card_component) {
            visibility: hidden !important;
          }
        `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          !function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);
        `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html {
            scroll-behavior: smooth;
          }
          .swiper {
            width: 100%;
          }
          @property --fill {
            syntax: "<percentage>";
            inherits: true;
            initial-value: 0%;
          }
        `,
          }}
        />
        <script src="/js/caps-entry.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.loadScript = window.loadScript || function(src, opts) {
            const s = document.createElement('script');
            s.src = '/js/' + src;
            if (opts && opts.placement === 'head') {
              document.head.appendChild(s);
            } else {
              document.body.appendChild(s);
            }
          };
          window.loadScript('global.js', {name: 'global', placement: 'head'});
        `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}

        {/* Local jQuery, GSAP and Interaction scripts */}
        <script
          src="/js/jquery-3.5.1.min.js"
          type="text/javascript"
          defer
        ></script>
        <script
          src="/js/caps-interactions.js"
          type="text/javascript"
          defer
        ></script>
        <script src="/js/gsap.min.js" type="text/javascript" defer></script>
        <script
          src="/js/ScrollTrigger.min.js"
          type="text/javascript"
          defer
        ></script>
        <script
          src="/js/SplitText.min.js"
          type="text/javascript"
          defer
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            // Check GSAP periodically until scripts are fully loaded
            const initGsap = () => {
              if (window.gsap && window.ScrollTrigger && window.SplitText) {
                window.gsap.registerPlugin(window.ScrollTrigger, window.SplitText);
              } else {
                setTimeout(initGsap, 100);
              }
            };
            if (typeof window !== 'undefined') {
              initGsap();
            }
          `,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (typeof window !== 'undefined') {
              window.conditionalLoadScript = window.conditionalLoadScript || function() {};
              const initConfetti = () => {
                if (window.conditionalLoadScript) {
                  window.conditionalLoadScript('[data-confetti]', 'components/confetti.js');
                } else {
                  setTimeout(initConfetti, 100);
                }
              };
              initConfetti();
            }
          `,
          }}
        ></script>
        <script
          async
          type="module"
          src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
          data-fs-list="true"
          data-fs-toc="true"
          data-fs-socialshare="true"
        ></script>
      </body>
    </html>
  );
}
