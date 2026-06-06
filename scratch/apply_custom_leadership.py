import os

html_path = "app/leadership-body.html"

# Load the file
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define start and end marker substrings
start_marker = '<main id="main" class="main-wrapper">'
end_marker = '</main>'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Error: Start marker <main id=\"main\" class=\"main-wrapper\"> not found!")
    exit(1)

# Find end marker after start_idx
end_idx = content.find(end_marker, start_idx)
if end_idx == -1:
    print("Error: End marker </main> not found!")
    exit(1)

# New content to insert inside <main>
leadership_html = """<div page-slot="" class="display-contents">
      <!-- Leadership & Governance Header -->
      <section id="leadership-header" class="section_header padding-global padding-section-small">
        <div class="header_title-wrap">
          <div slot-accepts="Element / Breadcrumbs" class="breadcrumb-custom-slot hide-if-empty">
            <div itemtype="https://schema.org/BreadcrumbList" itemscope="" data-wf--element-breadcrumbs--style="normal" class="breadcrumb-wrapper eyebrow">
              <a itemtype="https://schema.org/ListItem" itemprop="itemListElement" itemscope="" href="/" class="breadcrumb-link w-inline-block">
                <span itemprop="name">Home</span>
                <meta itemprop="position" content="1" />
                <span data-wf--global-general-icon--icon="caret-right" aria-hidden="true" STYLE="--width: 1em; vertical-align: text-top;" class="icon_svg"></span>
              </a>
              <div itemtype="https://schema.org/ListItem" itemprop="itemListElement" itemscope="" class="breadcrumb-link">
                <span itemprop="name">About</span>
                <meta itemprop="position" content="2" />
                <span data-wf--global-general-icon--icon="caret-right" aria-hidden="true" STYLE="--width: 1em; vertical-align: text-top;" class="icon_svg"></span>
              </div>
              <div itemtype="https://schema.org/ListItem" itemprop="itemListElement" itemscope="" class="breadcrumb-link">
                <span itemprop="name">Leadership &amp; Governance</span>
                <span data-wf--global-general-icon--icon="caret-right" aria-hidden="true" STYLE="--width: 1em; vertical-align: text-top;" class="icon_svg"></span>
              </div>
            </div>
          </div>
          <h1><em>Leadership &amp; </em><em>Governance</em></h1>
        </div>
        <div class="header_image-wrapper">
          <div class="header_image-dark-overlay"></div>
          <div class="header_image-blur-overlay">
            <div STYLE="--blur-direction: to bottom left" class="gradient-blur">
              <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div data-wf--global-visual-image-video--styling-size="fill-parent" data-parallax="1" STYLE="--pos-y: 10%; --pos-x: 50%; --ratio: 16/9;" class="image-wrapper">
            <div STYLE="--opacity: 0" class="image-overlay-layer"></div>
            <figure>
              <img src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/6940bea975aca5e7b71540f6_17June2024-722.webp" loading="lazy" alt="" sizes="(max-width: 2000px) 100vw, 2000px" srcset="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/6940bea975aca5e7b71540f6_17June2024-722-p-500.webp 500w, https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/6940bea975aca5e7b71540f6_17June2024-722-p-800.webp 800w, https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/6940bea975aca5e7b71540f6_17June2024-722-p-1080.webp 1080w, https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/6940bea975aca5e7b71540f6_17June2024-722-p-1600.webp 1600w, https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/6940bea975aca5e7b71540f6_17June2024-722.webp 2000w" class="image" />
            </figure>
          </div>
          <div data-wf--element-blurred-gradient-bg-circle--variant="primary" STYLE="inset: 0 auto auto 0" class="circle-blur-wrapper">
            <div STYLE="--opacity: 0.25" class="circle-blur"></div>
          </div>
        </div>
      </section>

      <!-- School Leadership Content -->
      <section data-wf--global-section-wrapper--theme="white" class="section" data-full-width="0" data-bg-color="2">
        <div data-wf--global-section-padding--size="medium" class="section-padding"></div>
        <div data-wf--global-container--size="large" class="container">
          <div>
            <div>
              <div data-wf--component-content-intro-heading--variant="centered" class="content-intro_component">
                <div class="content-intro_wrap">
                  <div class="content-intro_title-wrapper">
                    <div data-wf--element-eyebrow--layout="horizontal" class="eyebrow_component">
                      <div class="eyebrow_icon"><span data-wf--global-general-icon--icon="flower" aria-hidden="true" class="icon_svg"></span></div>
                      <p class="text-style-eyebrow">leadership team</p>
                    </div>
                    <h2><em>Leadership &amp; Mentorship</em></h2>
                  </div>
                  <div class="content-intro_desc-wrapper">
                    <div data-columns="1" data-wf--global-rich-text-text-image--text-size="regular" class="rich-text w-richtext">
                      <p>CAPS Yeshwanthpur is guided by dedicated faculty mentors and student leaders. Our team works collaboratively to build a peer-to-peer support ecosystem that fosters learning, growth, and professional development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-wf--global-section-padding--size="medium" class="section-padding"></div>
      </section>

      <section data-wf--global-section-wrapper--theme="white" class="section" data-full-width="0" data-bg-color="1">
        <div data-wf--global-section-padding--size="medium" class="section-padding"></div>
        <div data-wf--global-container--size="medium" class="container">
          
          <!-- Group 1: Faculty Mentors -->
          <div class="leadership-group-title" style="text-align: center; margin-bottom: 2rem;">
            <h3>Faculty Mentors</h3>
            <div class="line-divider" style="margin: 1rem auto; max-width: 100px; height: 2px; background-color: var(--_color---accent-primary, #003366);"></div>
          </div>
          
          <div class="team_component" style="margin-bottom: 4rem;">
            <div class="display-contents w-dyn-list">
              <div data-columns="2" role="list" class="cards-grid w-dyn-items" style="grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                
                <!-- Faculty Mentor 1 -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <button data-dialog-open="kennedy-thomas" class="team-member_link"></button>
                    <div class="team-member_image-wrapper">
                       <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Director Image Placeholder</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Dr. Kennedy Andrew Thomas</h6>
                      <div class="spacer-0d25"></div>
                      <p>Professor &amp; Director, CAPS</p>
                      <p>PhD, MA, BEd</p>
                    </div>
                  </div>
                  <dialog data-dialog-id="kennedy-thomas" class="team_item_info">
                    <div class="team-item_content">
                      <div class="team-item_content-wrapper">
                        <div class="team-item_content-top">
                          <div class="team-item_title-wrap">
                            <p class="heading-style-h3 text-style-display">Dr. Kennedy Andrew Thomas</p>
                            <a href="#" class="team-item_linkedin-link hide-if-empty-link w-inline-block">
                              <span data-wf--global-social-icon--variant="linkedin" aria-hidden="true" class="icon_social"></span>
                            </a>
                          </div>
                          <div class="team-item_meta">
                            <p class="text-size-large">Professor &amp; Director, CAPS</p>
                            <p class="hide-if-empty">PhD, MA, BEd</p>
                          </div>
                        </div>
                        <div class="rich-text w-richtext">
                          <p>Dr. Kennedy Andrew Thomas oversees the strategic vision and operation of CAPS across Christ University campuses. With over 25 years of experience in educational leadership, pedagogy, and student support systems, he is dedicated to fostering academic excellence, peer-to-peer mentoring, and professional skills development.</p>
                        </div>
                      </div>
                    </div>
                    <button data-dialog-close="kennedy-thomas" class="team-item_close-trigger">
                      <span data-wf--global-general-icon--icon="x-cross" aria-hidden="true" STYLE="--width: 1.5rem;" class="icon_svg"></span>
                    </button>
                  </dialog>
                </div>
                
                <!-- Faculty Mentor 2 -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <button data-dialog-open="sibi-shaji" class="team-member_link"></button>
                    <div class="team-member_image-wrapper">
                       <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Coordinator Image Placeholder</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Dr. Sibi Shaji</h6>
                      <div class="spacer-0d25"></div>
                      <p>Coordinator, CAPS Yeshwanthpur</p>
                      <p>PhD, MSc</p>
                    </div>
                  </div>
                  <dialog data-dialog-id="sibi-shaji" class="team_item_info">
                    <div class="team-item_content">
                      <div class="team-item_content-wrapper">
                        <div class="team-item_content-top">
                          <div class="team-item_title-wrap">
                            <p class="heading-style-h3 text-style-display">Dr. Sibi Shaji</p>
                            <a href="#" class="team-item_linkedin-link hide-if-empty-link w-inline-block">
                              <span data-wf--global-social-icon--variant="linkedin" aria-hidden="true" class="icon_social"></span>
                            </a>
                          </div>
                          <div class="team-item_meta">
                            <p class="text-size-large">Coordinator, CAPS Yeshwanthpur</p>
                            <p class="hide-if-empty">PhD, MSc</p>
                          </div>
                        </div>
                        <div class="rich-text w-richtext">
                          <p>Dr. Sibi Shaji coordinates the day-to-day operations, mentor training, and wing activities at the Yeshwanthpur Campus. She works closely with student coordinators and team leads to design and implement impactful workshops, peer-mentoring sessions, and research initiatives that support student learning and wellbeing.</p>
                        </div>
                      </div>
                    </div>
                    <button data-dialog-close="sibi-shaji" class="team-item_close-trigger">
                      <span data-wf--global-general-icon--icon="x-cross" aria-hidden="true" STYLE="--width: 1.5rem;" class="icon_svg"></span>
                    </button>
                  </dialog>
                </div>
                
              </div>
            </div>
          </div>

          <!-- Group 2: Student Coordinators -->
          <div class="leadership-group-title" style="text-align: center; margin-bottom: 2rem;">
            <h3>Student Coordinators</h3>
            <div class="line-divider" style="margin: 1rem auto; max-width: 100px; height: 2px; background-color: var(--_color---accent-primary, #003366);"></div>
          </div>
          
          <div class="team_component" style="margin-bottom: 4rem;">
            <div class="display-contents w-dyn-list">
              <div data-columns="2" role="list" class="cards-grid w-dyn-items" style="grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                
                <!-- Student Coordinator 1 -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <button data-dialog-open="aarav-mehta" class="team-member_link"></button>
                    <div class="team-member_image-wrapper">
                       <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Aarav Image Placeholder</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Aarav Mehta</h6>
                      <div class="spacer-0d25"></div>
                      <p>Student Coordinator (Operations)</p>
                      <p>BBA (Decision Sciences)</p>
                    </div>
                  </div>
                  <dialog data-dialog-id="aarav-mehta" class="team_item_info">
                    <div class="team-item_content">
                      <div class="team-item_content-wrapper">
                        <div class="team-item_content-top">
                          <div class="team-item_title-wrap">
                            <p class="heading-style-h3 text-style-display">Aarav Mehta</p>
                            <a href="#" class="team-item_linkedin-link hide-if-empty-link w-inline-block">
                              <span data-wf--global-social-icon--variant="linkedin" aria-hidden="true" class="icon_social"></span>
                            </a>
                          </div>
                          <div class="team-item_meta">
                            <p class="text-size-large">Student Coordinator (Operations)</p>
                            <p class="hide-if-empty">BBA (Decision Sciences)</p>
                          </div>
                        </div>
                        <div class="rich-text w-richtext">
                          <p>Aarav coordinates overall logistics, schedules support sessions, and handles volunteer registration. He ensures that all operations across the wings and committees function seamlessly and efficiently.</p>
                        </div>
                      </div>
                    </div>
                    <button data-dialog-close="aarav-mehta" class="team-item_close-trigger">
                      <span data-wf--global-general-icon--icon="x-cross" aria-hidden="true" STYLE="--width: 1.5rem;" class="icon_svg"></span>
                    </button>
                  </dialog>
                </div>
                
                <!-- Student Coordinator 2 -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <button data-dialog-open="diya-sharma" class="team-member_link"></button>
                    <div class="team-member_image-wrapper">
                       <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Diya Image Placeholder</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Diya Sharma</h6>
                      <div class="spacer-0d25"></div>
                      <p>Student Coordinator (Academics)</p>
                      <p>BSc (Psychology)</p>
                    </div>
                  </div>
                  <dialog data-dialog-id="diya-sharma" class="team_item_info">
                    <div class="team-item_content">
                      <div class="team-item_content-wrapper">
                        <div class="team-item_content-top">
                          <div class="team-item_title-wrap">
                            <p class="heading-style-h3 text-style-display">Diya Sharma</p>
                            <a href="#" class="team-item_linkedin-link hide-if-empty-link w-inline-block">
                              <span data-wf--global-social-icon--variant="linkedin" aria-hidden="true" class="icon_social"></span>
                            </a>
                          </div>
                          <div class="team-item_meta">
                            <p class="text-size-large">Student Coordinator (Academics)</p>
                            <p class="hide-if-empty">BSc (Psychology)</p>
                          </div>
                        </div>
                        <div class="rich-text w-richtext">
                          <p>Diya manages academic quality, coordinates workshop modules, and leads peer training programs. She focuses on aligning learning objectives with peer support strategies to maximize student benefit.</p>
                        </div>
                      </div>
                    </div>
                    <button data-dialog-close="diya-sharma" class="team-item_close-trigger">
                      <span data-wf--global-general-icon--icon="x-cross" aria-hidden="true" STYLE="--width: 1.5rem;" class="icon_svg"></span>
                    </button>
                  </dialog>
                </div>
                
              </div>
            </div>
          </div>

          <!-- Group 3: Team Leads -->
          <div class="leadership-group-title" style="text-align: center; margin-bottom: 2rem;">
            <h3>Team Leads</h3>
            <div class="line-divider" style="margin: 1rem auto; max-width: 100px; height: 2px; background-color: var(--_color---accent-primary, #003366);"></div>
          </div>
          
          <div class="team_component">
            <div class="display-contents w-dyn-list">
              <div data-columns="4" role="list" class="cards-grid w-dyn-items" style="grid-template-columns: repeat(4, 1fr); gap: 2rem;">
                
                <!-- Lead 1: One on One Peer Training -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Rohan</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Rohan Das</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (One on One)</p>
                      <p>BBA</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 2: One on One Peer Training -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Neha</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Neha Roy</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (One on One)</p>
                      <p>BCom</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 3: Group Peer Training -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Kabir</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Kabir Malhotra</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Group GPT)</p>
                      <p>BCA</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 4: Group Peer Training -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Ananya</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Ananya Iyer</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Group GPT)</p>
                      <p>BSc (Psychology)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 5: Connect Wide -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Arjun</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Arjun Nair</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Connect Wide)</p>
                      <p>BA (Media Studies)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 6: Connect Wide -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Riya</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Riya Sen</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Connect Wide)</p>
                      <p>BBA</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 7: Research & Assessment -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Siddharth</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Siddharth Rao</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Research &amp; Asmt)</p>
                      <p>BSc (Economics)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 8: Research & Assessment -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Meera</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Meera Joshi</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Research &amp; Asmt)</p>
                      <p>BSc (Data Science)</p>
                    </div>
                  </div>
                </div>

                <!-- Lead 9: Media & PR -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Devika</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Devika Krishnan</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Media &amp; PR)</p>
                      <p>BA (English)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 10: Media & PR -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Varun</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Varun Dhawan</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Media &amp; PR)</p>
                      <p>BBA</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 11: Learning & Development -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Ishaan</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Ishaan Sen</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Learning &amp; Dev)</p>
                      <p>BCA</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 12: Learning & Development -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Sneha</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Sneha Gupta</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Learning &amp; Dev)</p>
                      <p>BCom</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 13: Operations & Analytics -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Rahul</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Rahul Verma</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Ops &amp; Analytics)</p>
                      <p>BBA (Decision Sciences)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 14: Operations & Analytics -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Priya</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Priya Sharma</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Ops &amp; Analytics)</p>
                      <p>BSc (Data Science)</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 15: Tech Tank -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Aditya</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Aditya Goel</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Tech Tank)</p>
                      <p>BCA</p>
                    </div>
                  </div>
                </div>
                
                <!-- Lead 16: Tech Tank -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">Tanvi</div>
                    </div>
                    <div class="team-member_info">
                      <h6>Tanvi Shah</h6>
                      <div class="spacer-0d25"></div>
                      <p>Team Lead (Tech Tank)</p>
                      <p>BTech (CS)</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
        <div data-wf--global-section-padding--size="medium" class="section-padding"></div>
      </section>
    </div>"""

# Reconstruct final content
new_content = content[:start_idx + len(start_marker)] + leadership_html + content[end_idx:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("leadership-body.html successfully modified with custom CAPS content!")
