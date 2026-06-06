import os

html_path = "app/leadership-body.html"

# Load the file
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define the starting and ending boundaries
start_marker = '  <main id="main" class="main-wrapper">'
end_marker = '  </main>'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Error: Start marker not found!")
    exit(1)

end_idx = content.find(end_marker, start_idx)
if end_idx == -1:
    print("Error: End marker not found!")
    exit(1)

# New content to insert inside <main>
leadership_html = """
    <div class="display-contents">
      <!-- Leadership & Governance Header -->
      <section id="leadership" data-wf--global-section-wrapper--theme="white" class="section" data-full-width="0" data-bg-color="2">
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
          <div class="leadership-group-title">
            <h3>Faculty Mentors</h3>
            <div class="line-divider" style="margin: 1rem auto; max-width: 100px;"></div>
          </div>
          
          <div class="team_component" style="margin-bottom: 4rem;">
            <div class="display-contents w-dyn-list">
              <div data-columns="2" role="list" class="cards-grid w-dyn-items" style="grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                
                <!-- Faculty Mentor 1 -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <button data-dialog-open="kennedy-thomas" class="team-member_link"></button>
                    <div class="team-member_image-wrapper">
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Dr. Kennedy Andrew Thomas" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Dr. Sibi Shaji" class="team-member_image" />
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
          <div class="leadership-group-title">
            <h3>Student Coordinators</h3>
            <div class="line-divider" style="margin: 1rem auto; max-width: 100px;"></div>
          </div>
          
          <div class="team_component" style="margin-bottom: 4rem;">
            <div class="display-contents w-dyn-list">
              <div data-columns="2" role="list" class="cards-grid w-dyn-items" style="grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                
                <!-- Student Coordinator 1 -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <button data-dialog-open="aarav-mehta" class="team-member_link"></button>
                    <div class="team-member_image-wrapper">
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Aarav Mehta" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Diya Sharma" class="team-member_image" />
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
          <div class="leadership-group-title">
            <h3>Team Leads</h3>
            <div class="line-divider" style="margin: 1rem auto; max-width: 100px;"></div>
          </div>
          
          <div class="team_component">
            <div class="display-contents w-dyn-list">
              <div data-columns="4" role="list" class="cards-grid w-dyn-items" style="grid-template-columns: repeat(4, 1fr); gap: 2rem;">
                
                <!-- Lead 1: One on One Peer Training -->
                <div role="listitem" class="team_item w-dyn-item">
                  <div class="team-member_component">
                    <div class="team-member_image-wrapper">
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Rohan Das" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Neha Roy" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Kabir Malhotra" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Ananya Iyer" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Arjun Nair" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Riya Sen" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Siddharth Rao" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Meera Joshi" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Devika Krishnan" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Varun Dhawan" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Ishaan Sen" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Sneha Gupta" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Rahul Verma" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Priya Sharma" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Aditya Goel" class="team-member_image" />
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
                      <img loading="lazy" src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="Tanvi Shah" class="team-member_image" />
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
    </div>
"""

new_content = content[:start_idx + len(start_marker)] + leadership_html + content[end_idx:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("leadership-body.html successfully modified!")
