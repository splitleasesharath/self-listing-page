import './NavigationSidebar.css';
import { SectionStatus } from '../types/listing';

interface Section {
  id: number;
  name: string;
  key: string;
}

interface NavigationSidebarProps {
  sections: Section[];
  currentStep: number;
  sectionStatus: SectionStatus;
  onNavigate: (stepId: number) => void;
}

const NavigationSidebar = ({
  sections,
  currentStep,
  sectionStatus,
  onNavigate,
}: NavigationSidebarProps) => {
  const getSectionIcon = (sectionKey: string) => {
    const icons: { [key: string]: string } = {
      spaceSnapshot: '📍',
      leaseStyles: '📄',
      pricing: '💰',
      rules: '✓',
      photos: '📷',
      reviews: '⭐',
    };
    return icons[sectionKey] || '📋';
  };

  const getSectionClass = (sectionId: number, sectionKey: string) => {
    const classes = ['nav-item'];
    if (sectionId === currentStep) {
      classes.push('active');
    }
    if (sectionStatus[sectionKey as keyof SectionStatus]) {
      classes.push('completed');
    }
    if (sectionId > currentStep) {
      classes.push('locked');
    }
    return classes.join(' ');
  };

  return (
    <aside className="navigation-sidebar">
      <div className="sidebar-content">
        <div className="info-section">
          <button className="info-button">ℹ️ Information</button>
        </div>

        <nav className="section-navigation">
          {sections.map((section) => (
            <div
              key={section.id}
              className={getSectionClass(section.id, section.key)}
              onClick={() => {
                if (section.id <= currentStep) {
                  onNavigate(section.id);
                }
              }}
            >
              <span className="nav-icon">{getSectionIcon(section.key)}</span>
              <span className="nav-label">{section.name}</span>
              {sectionStatus[section.key as keyof SectionStatus] && (
                <span className="completion-check">✓</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default NavigationSidebar;
