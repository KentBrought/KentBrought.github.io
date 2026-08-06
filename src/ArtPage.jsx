import { useEffect, useRef, useState } from 'react';
import './art.css';

export default function ArtPage() {
  const [query, setQuery] = useState('');
  const [selectedArt, setSelectedArt] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    rootRef.current?.querySelectorAll('.art-item').forEach((item) => {
      const searchable = [item.dataset.title, item.dataset.description, item.dataset.category].join(' ').toLowerCase();
      item.hidden = !searchable.includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedArt(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const openArt = (event) => {
    const item = event.target.closest('.art-item');
    if (!item) return;
    setSelectedArt({ image: item.dataset.image, title: item.dataset.title, description: item.dataset.description });
  };

  return (
    <div className="art-page" ref={rootRef}>
      <header className="header container">
              <a href="/" className="back-link">← Back to Home</a>      
          </header>      
            
          <section className="art-catalog">      
              <div className="container">      
                  <h2 className="section-title">Art & Assets Catalog</h2>      
                  <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '-2rem', marginBottom: '3rem', fontSize: '1.1rem' }}>      
                      These are just some of my favorites.      
                  </p>      
                        
                  <div className="search-bar">      
                      <input type="text" id="searchInput" className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by character or keyword..." />      
                  </div>      
            
                  <div className="art-grid" id="artGrid" onClick={openArt}>      
            
                      <div className="art-item" data-title="Mole Maker Logo" data-description="Logo design for the educational chemistry game, Mole Maker." data-category="UI/UX" data-image="art/molemakerlogo.png">      
                          <img src="art/molemakerlogo.png" alt="Mole Maker Logo" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Mole Maker Logo</h3>      
                              <p>Logo design for the educational chemistry game, Mole Maker.</p>      
                              <span className="category-label">UI/UX</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Mole Maker Synthesis Station" data-description="The main crafting interface for combining atoms in Mole Maker." data-category="UI/UX" data-image="art/synthesisstationbg.png">      
                          <img src="art/synthesisstationbg.png" alt="Mole Maker Synthesis Station" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Mole Maker Synthesis Station</h3>      
                              <p>The main crafting interface for combining atoms in Mole Maker.</p>      
                              <span className="category-label">UI/UX</span>      
                          </div>      
                      </div>      
                            
                      <div className="art-item" data-title="Mole Maker Atom Assembler Wireframe" data-description="Early wireframe for the atom assembly UI." data-category="Wireframe" data-image="art/atomassemblerwireframe.png">      
                          <img src="art/atomassemblerwireframe.png" alt="Mole Maker Wireframe" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Atom Assembler Wireframe</h3>      
                              <p>Early wireframe for the atom assembly UI.</p>      
                              <span className="category-label">Wireframe</span>      
                          </div>      
                      </div>      
                            
                      <div className="art-item" data-title="Lab Level Background" data-description="Background art for the lab level selector in Mole Maker." data-category="Asset" data-image="art/lablevelbackground.png">      
                          <img src="art/lablevelbackground.png" alt="Lab Level Background" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Lab Level Background</h3>      
                              <p>Background art for the lab level selector in Mole Maker.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Mole NPC 1" data-description="A friendly mole non-player character." data-category="Character" data-image="art/molenpc1.png">      
                          <img src="art/molenpc1.png" alt="Mole NPC 1" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Mole NPC 1</h3>      
                              <p>A friendly mole non-player character.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Mole NPC with Soap" data-description="A mole NPC holding a bar of soap, for a special level." data-category="Character" data-image="art/molenpcsoap.png">      
                          <img src="art/molenpcsoap.png" alt="Mole NPC with Soap" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Mole NPC with Soap</h3>      
                              <p>A mole NPC holding a bar of soap, for a special level.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Mole NPC with Firework" data-description="A mole NPC holding a firework." data-category="Character" data-image="art/molenpcfirework.png">      
                          <img src="art/molenpcfirework.png" alt="Mole NPC with Firework" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Mole NPC with Firework</h3>      
                              <p>A mole NPC holding a firework.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Bond Busters Logo" data-description="Logo for the 'Bond Busters' card game, inspired by Bomb Busters." data-category="UI/UX" data-image="art/bondbusterslogo.png">      
                          <img src="art/bondbusterslogo.png" alt="Bond Busters Logo" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters Logo</h3>      
                              <p>Logo for the 'Bond Busters' card game, inspired by Bomb Busters.</p>      
                              <span className="category-label">UI/UX</span>      
                          </div>      
                      </div>      
                            
                      <div className="art-item" data-title="Bond Buster Card - Back" data-description="The reverse side of a Bond Busters card." data-category="Asset" data-image="art/bbback.png">      
                          <img src="art/bbback.png" alt="Bond Buster Card - Back" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Buster Card - Back</h3>      
                              <p>The reverse side of a Bond Busters card.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
                            
                      <div className="art-item" data-title="Bond Busters: Captain Card" data-description="A captain card design for the Bond Busters game, featuring a confident Shiba character with lab gear." data-category="Character" data-image="art/bb1.png">      
                          <img src="art/bb1.png" alt="Bond Busters: Captain Card" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Captain Card</h3>      
                              <p>A captain card design for the Bond Busters game, featuring a confident Shiba character with lab gear.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Bond Busters: Captain Card (No Frame)" data-description="Frameless asset version of the Bond Busters captain card for in-game use." data-category="Asset" data-image="art/bb1asset.png">      
                          <img src="art/bb1asset.png" alt="Bond Busters: Captain Card (No Frame)" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Captain Card (No Frame)</h3>      
                              <p>Frameless asset version of the Bond Busters captain card for in-game use.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="Bond Busters: Explosive Bear Card" data-description="A character card featuring a bear chemist mid-experiment, surrounded by bubbling equipment." data-category="Character" data-image="art/bb2.png">      
                          <img src="art/bb2.png" alt="Bond Busters: Explosive Bear Card" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Explosive Bear Card</h3>      
                              <p>A character card featuring a bear chemist mid-experiment, holding bubbling equipment.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Bond Busters: Explosive Bear (No Frame)" data-description="Frameless version of the Bond Busters bear character card." data-category="Asset" data-image="art/bb2asset.png">      
                          <img src="art/bb2asset.png" alt="Bond Busters: Explosive Bear (No Frame)" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Explosive Bear (No Frame)</h3>      
                              <p>Frameless version of the Bond Busters bear character card.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="Bond Busters: Dual-Wielder Card" data-description="A character card showing a fast-moving cat with a chemistry pipette, ready to react." data-category="Character" data-image="art/bb3.png">      
                          <img src="art/bb4.png" alt="Bond Busters: Dual-Wielder Card" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Dual-Wielder Card</h3>      
                              <p>A character card showing a fast-moving cat with a chemistry pipette, ready to react.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Bond Busters: Dual-Wielder (No Frame)" data-description="Frameless version of the cat character from Bond Busters." data-category="Asset" data-image="art/bb3asset.png">      
                          <img src="art/bb4asset.png" alt="Bond Busters: Dual-Wielder (No Frame)" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Dual-Wielder (No Frame)</h3>      
                              <p>Frameless version of the cat character from Bond Busters.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="Bond Busters: Cool Bunny Card" data-description="A bunny scientist character card for Bond Busters, with stylish goggles and a confident pose." data-category="Character" data-image="art/bb4.png">      
                          <img src="art/bb5.png" alt="Bond Busters: Cool Bunny Card" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Cool Bunny Card</h3>      
                              <p>A bunny scientist character card for Bond Busters, with goggles and a confident pose.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Bond Busters: Cool Bunny (No Frame)" data-description="Frameless asset of the bunny scientist character." data-category="Asset" data-image="art/bb4asset.png">      
                          <img src="art/bb5asset.png" alt="Bond Busters: Cool Bunny (No Frame)" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Cool Bunny (No Frame)</h3>      
                              <p>Frameless asset of the bunny scientist character.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="Bond Busters: Investigator Bunny Card" data-description="Detective-style bunny card with sunglasses and magnifying glass for Bond Busters." data-category="Character" data-image="art/bb5.png">      
                          <img src="art/bb3.png" alt="Bond Busters: Investigator Bunny Card" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Investigator Bunny Card</h3>      
                              <p>Bunny card with sunglasses and magnifying glass for Bond Busters.</p>      
                              <span className="category-label">Character</span>      
                          </div>      
                      </div>      
            
                      <div className="art-item" data-title="Bond Busters: Investigator Bunny (No Frame)" data-description="Frameless asset of the detective bunny character from Bond Busters." data-category="Asset" data-image="art/bb5asset.png">      
                          <img src="art/bb3asset.png" alt="Bond Busters: Investigator Bunny (No Frame)" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Bond Busters: Investigator Bunny (No Frame)</h3>      
                              <p>Frameless asset of the detective bunny character from Bond Busters.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Badge – Millionaire" data-description="Earned by users who accumulate 1 million KayBits through platform activity." data-category="Badge" data-image="art/millionaire.png">      
                          <img src="art/millionaire.png" alt="Badge – Millionaire" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Badge – Millionaire</h3>      
                              <p>Given to users who earn 1M+ KayBits through posts, activity, and engagement.</p>      
                              <span className="category-label">Badge</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Badge – Pioneer" data-description="Given to early users and testers of the KayBer platform." data-category="Badge" data-image="art/pioneer.png">      
                          <img src="art/pioneer.png" alt="Badge – Pioneer" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Badge – Pioneer</h3>      
                              <p>Special badge to honor early adopters and contributors during the beta phase.</p>      
                              <span className="category-label">Badge</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Badge – Well-Liked" data-description="Awarded to users who receive high engagement on their posts in KayBer." data-category="Badge" data-image="art/well-liked.png">      
                          <img src="art/well-liked.png" alt="Badge – Well-Liked" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Badge – Well-Liked</h3>      
                              <p>Awarded to users whose posts receive a high number of likes and positive feedback.</p>      
                              <span className="category-label">Badge</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Empty State – 404 Not Found" data-description="A playful 404 error page illustration featuring a bear explorer with a lantern and signpost." data-category="Empty State" data-image="art/404.png">      
                          <img src="art/404.png" alt="404 Not Found" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Empty State – 404 Not Found</h3>      
                              <p>Used for unknown or broken routes in the app or website with a bear explorer design.</p>      
                              <span className="category-label">Empty State</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Empty State – History" data-description="Empty state for the 'History' page when a user has not interacted with anyone yet." data-category="Empty State" data-image="art/history.png">      
                          <img src="art/history.png" alt="Empty State – History" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Empty State – History</h3>      
                              <p>Appears when the history page has no call records or message logs yet.</p>      
                              <span className="category-label">Empty State</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Empty State – Home" data-description="Art used when the Home feed has no content to show yet, often for new users." data-category="Empty State" data-image="art/home.png">      
                          <img src="art/home.png" alt="Empty State – Home" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Empty State – Home</h3>      
                              <p>Displayed when the user's Home feed is empty, typically during onboarding.</p>      
                              <span className="category-label">Empty State</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Empty State – Friends" data-description="Empty state image used when a user has no added friends yet in the app." data-category="Empty State" data-image="art/friends.png">      
                          <img src="art/friends.png" alt="Empty State – Friends" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Empty State – Friends</h3>      
                              <p>Used when the friends list is empty to encourage users to connect with others.</p>      
                              <span className="category-label">Empty State</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="KayBer Badge – Team Member" data-description="A badge given to official KayBer contributors and team members." data-category="Badge" data-image="art/teammember.png">      
                          <img src="art/teammember.png" alt="Badge – Team Member" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>KayBer Badge – Team Member</h3>      
                              <p>A badge given to official KayBer contributors and team members.</p>      
                              <span className="category-label">Badge</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="MacLea Poster – Teach Kids ML" data-description="Promotional poster created to showcase MacLea’s mission of teaching machine learning to elementary school students." data-category="Poster" data-image="art/Poster1.png">      
                          <img src="art/Poster1.png" alt="MacLea Poster – Teach Kids ML" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>MacLea Poster – Teach Kids ML</h3>      
                              <p>Promotional poster created to showcase MacLea’s mission of teaching machine learning to elementary school students.</p>      
                              <span className="category-label">Poster</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="MacLea Poster – AI Made Easy" data-description="Poster encouraging viewers to explore how MacLea makes artificial intelligence accessible for everyone." data-category="Poster" data-image="art/Poster2.png">      
                          <img src="art/Poster3.png" alt="MacLea Poster – AI Made Easy" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>MacLea Poster – AI Made Easy</h3>      
                              <p>Poster encouraging viewers to explore how MacLea makes artificial intelligence accessible for everyone.</p>      
                              <span className="category-label">Poster</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="MacLea Poster – Learning by Doing" data-description="Poster designed to promote hands-on learning in machine learning through the MacLea tool." data-category="Poster" data-image="art/Poster3.png">      
                          <img src="art/Poster2.png" alt="MacLea Poster – Learning by Doing" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>MacLea Poster – Learning by Doing</h3>      
                              <p>Poster designed to promote hands-on learning in machine learning through the MacLea tool.</p>      
                              <span className="category-label">Poster</span>      
                          </div>      
                      </div>      
                      <div className="art-item" data-title="Mole Maker – Blueprint Lab Background" data-description="Background art for Mole Maker’s lab interface where players assemble molecules using chemistry tools." data-category="Asset" data-image="art/moleculemakerbg.png">      
                          <img src="art/moleculemakerbg.png" alt="Mole Maker Lab Background" className="art-item-image" />      
                          <div className="art-item-content">      
                              <h3>Mole Maker – Blueprint Lab Background</h3>      
                              <p>Background art for Mole Maker’s lab interface where players assemble molecules.</p>      
                              <span className="category-label">Asset</span>      
                          </div>      
                      </div>      
            
            
            
            
            
            
            
                  </div>      
              </div>      
          </section>      
            
          <footer>      
              <div className="container">      
                  <p>© 2025–2026 Kent Brought. <a href="https://github.com/KentBrought/KentBrought.github.io" target="_blank">View Source Code</a></p>
              </div>      
          </footer>      
            
          
      {selectedArt && (
        <div className="modal" style={{ display: 'flex' }} onClick={() => setSelectedArt(null)} role="dialog" aria-modal="true" aria-label={selectedArt.title}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-btn" onClick={() => setSelectedArt(null)} aria-label="Close">&times;</button>
            <img src={selectedArt.image} alt={selectedArt.title} className="modal-image" />
            <h2>{selectedArt.title}</h2>
            <p>{selectedArt.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
