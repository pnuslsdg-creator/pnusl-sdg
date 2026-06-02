import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams,
  Navigate,
} from "react-router-dom";
import { homeContent, sdgs } from "./data/sdgData";

const asset = (fileName) => `/assets/${fileName}`;

function MobileHeader({ onOpen }) {
  return (
    <header className="mobile-header">
      <div className="mobile-brand">
        <div>
          <strong>PNUSL SDG</strong>
          <span>Philippine Normal University South Luzon</span>
        </div>
      </div>

      <button className="mobile-menu-btn" type="button" onClick={onOpen}>
        ☰
      </button>
    </header>
  );
}

function Header() {
  return (
    <header className="top-header">
      <div className="header-brand">
        <div className="header-text">
          <p>Philippine Normal University South Luzon</p>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <div>
            <p>PHILIPPINE NORMAL UNIVERSITY</p>
            <p>SOUTH LUZON</p>
          </div>
        </div>

        <button className="mobile-close-btn" type="button" onClick={onClose}>
          ×
        </button>
      </div>

      <nav className="side-nav">
        <NavLink to="/" end className="home-link" onClick={onClose}>
          <div className="home-icon">▦</div>

          <div>
            <strong>Institutional Commitment</strong>
            <strong>to the SDGs</strong>
            <span></span>
          </div>
        </NavLink>

        <div className="sdg-links">
          {sdgs.map((sdg) => (
            <NavLink
              key={sdg.id}
              to={`/sdg/${sdg.id}`}
              className="sdg-link"
              style={{ "--sdg-color": sdg.color }}
              onClick={onClose}
            >
              <img
                src={asset(`sdg-${sdg.id}.png`)}
                alt={`SDG ${sdg.id}`}
                className="sdg-small-icon"
              />

              <span>
                SDG {sdg.id}: {sdg.title}
              </span>

              <b>›</b>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-block footer-school">
        <img src={asset("pnu-logo.png")} alt="PNU Logo" />

        <p>
          PHILIPPINE NORMAL UNIVERSITY
          <br />
          SOUTH LUZON
        </p>
      </div>

      <div className="footer-block footer-address">
        <span>●</span>

        <p>
          Mañago Ext. Brgy. Magsaysay,
          <br />
          Lopez, Quezon, Philippines, 4316
        </p>
      </div>

      <div className="footer-socials">
        <a
         href="https://www.facebook.com/pnusouthluzon"
         target="_blank"
         rel="noopener noreferrer"
        >
          <span>f</span>
       </a>

        <span>▶</span>
        <span>◎</span>
      </div>

      <div className="footer-right">
        <p>© 2026 Philippine Normal University South Luzon.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main className="page-content home-page">
      <section className="title-section center-title">
        <h1>{homeContent.title}</h1>
        <div className="gold-line"></div>
      </section>

      <section className="content-card home-card">
        {homeContent.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className="sdg-full-card">
        <img src={asset("sdg-full.png")} alt="Sustainable Development Goals" />
      </section>

      <section className="sdg-directory-section">
        <h2>Sustainable Development Goals</h2>

        <div className="sdg-card-grid">
          {sdgs.map((sdg) => (
            <NavLink
              key={sdg.id}
              to={`/sdg/${sdg.id}`}
              className="sdg-home-card"
              style={{ "--card-color": sdg.color }}
            >
              <img src={asset(`sdg-${sdg.id}.png`)} alt={`SDG ${sdg.id}`} />

              <div className="sdg-home-card-text">
                <span>SDG {sdg.id}</span>
                <strong>{sdg.title}</strong>
                <p>View Details →</p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="institutional-summary">
        <div>
          <h2>Institutional Summary Statement</h2>

          <p>
            At PNUSL, sustainability is more than compliance — it is a shared
            responsibility. Through quality education, research, extension,
            innovation, environmental stewardship, and community engagement, the
            university continues to nurture future educators and leaders who act
            with integrity, compassion, and responsibility for people and the planet.
          </p>
        </div>
      </section>
    </main>
  );
}

function SDGPage() {
  const { id } = useParams();
  const sdg = sdgs.find((item) => item.id === Number(id));

  if (!sdg) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="page-content sdg-page" style={{ "--active-color": sdg.color }}>
      <section className="sdg-heading">
        <img
          src={asset(`sdg-${sdg.id}.png`)}
          alt={sdg.title}
          className="sdg-main-icon"
        />

        <div>
          <h1>{sdg.title}</h1>
          <div className="sdg-line"></div>
        </div>
      </section>

      <section className="content-card sdg-content-card">
        {sdg.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {(sdg.sections || []).length > 0 && (
        <section className="sdg-evidence-area">
          {sdg.sections.map((section, sectionIndex) => (
            <div className="sdg-evidence-section" key={sectionIndex}>
              <h2>
                {sdg.id}.{sectionIndex + 1} {section.title}
              </h2>

              <div className="evidence-list">
                {section.items.map((item, itemIndex) => (
                  <div className="evidence-card" key={itemIndex}>
                    <strong>
                      {sdg.id}.{sectionIndex + 1}.{itemIndex + 1} {item}
                    </strong>

                    <button className="pdf-button" type="button" disabled>
                      View PDF <span>▣</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="site-shell">
      <MobileHeader onOpen={openSidebar} />

      {isSidebarOpen && <div className="mobile-overlay" onClick={closeSidebar}></div>}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="main-area">
        <Header />

        <div className="main-scroll">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sdg/:id" element={<SDGPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}