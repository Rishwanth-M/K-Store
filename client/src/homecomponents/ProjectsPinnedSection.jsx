import React from 'react';

// ProjectsPinnedSection (loader removed)
export default function ProjectsPinnedSection({
  sectionTitle = 'Train Hard,\nLive Bold.',
  description = "Our performance sportswear collection is made for young athletes who demand comfort, agility, and the confidence to take on any challenge.",
  cta = { label: 'Explore Collection', href: 'https://kreedentials.in/' },
  projects = null,
}) {
  const defaultProjects = [
    { id: 1, href: 'project-details.html', previewClass: 'preview-image-1', tags: ['Moisture Wicking', 'UV Resistant', 'Anti-Microbial'], title: 'High-performance sportswear built for movement.', anim: true },
    { id: 2, href: 'project-details.html', previewClass: 'preview-image-2', tags: ['Moisture Wicking', 'UV Resistant', 'Anti Microbial'], title: 'High-performance  sportswear built for mindset.', anim: true },
    { id: 3, href: 'project-details.html', previewClass: 'preview-image-3', tags: ['Moisture Wicking', 'UV Resistant', 'Ultra Soft'], title: 'High-performance sportswear built to make a statement', anim: false },
    { id: 4, href: 'project-details.html', previewClass: 'preview-image-4', tags: ['Moisture Wicking', 'Anti Microbial', 'UV Resistant'], title: 'High performance sportswear built for the spotlight', anim: true },
    { id: 5, href: 'project-details.html', previewClass: 'preview-image-5', tags: ['Moisture Wicking', 'UV Resistant', 'Anti Microbial'], title: 'High performance sportswear built for game day and everyday', anim: true }
  ];

  const items = projects || defaultProjects;

  return (
    <div id="projects" className="mxd-section padding-pre-stack">
      <div className="mxd-container grid-container">
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-pinned-projects__static">
                  <div className="mxd-pinned-projects__static-inner no-margin">
                    <div className="mxd-section-title no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title anim-uni-in-up">
                              <h2 className="reveal-type">
                                {sectionTitle.split('\n').map((line, idx, arr) => (
                                  <React.Fragment key={idx}>
                                    {line}
                                    {idx < arr.length - 1 && <br />}
                                  </React.Fragment>
                                ))}
                              </h2>
                            </div>
                          </div>

                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__descr anim-uni-in-up">
                              <p>{description}</p>
                            </div>
                          </div>

                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__controls anim-uni-in-up">
                              <a className="btn btn-anim btn-default btn-outline slide-right-up" href={cta.href}>
                                <span className="btn-caption">{cta.label}</span>
                                <i className="ph-bold ph-arrow-up-right" />
                              </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-xl-7 mxd-pinned-projects__scroll">
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {items.map((p) => (
                      <div key={p.id} className="mxd-project-item">
                        <a className={`mxd-project-item__media ${p.anim ? 'anim-uni-in-up' : ''}`} href={p.href}>
                          <div className={`mxd-project-item__preview ${p.previewClass} parallax-img-small`} />
                          <div className="mxd-project-item__tags">
                            {p.tags.map((t, i) => <span key={i} className="tag tag-default tag-permanent">{t}</span>)}
                          </div>
                        </a>

                        <div className="mxd-project-item__promo">
                          <div className="mxd-project-item__name">
                            <a className="anim-uni-in-up" href={p.href}><span>{p.title}</span></a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
