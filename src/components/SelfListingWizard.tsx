import { useState } from 'react';
import './SelfListingWizard.css';
import NavigationSidebar from './NavigationSidebar';
import SpaceSnapshotSection from './sections/SpaceSnapshotSection';
import { ListingFormData, SectionStatus } from '../types/listing';

const SelfListingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>({
    spaceSnapshot: {
      listingName: '',
      typeOfSpace: '',
      bedrooms: 2,
      typeOfKitchen: '',
      beds: 2,
      typeOfParking: '',
      bathrooms: 2.5,
      address: {
        fullAddress: '',
        number: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        neighborhood: '',
        validated: false,
        latitude: null,
        longitude: null,
      },
    },
    leaseStyles: {},
    pricing: {},
    rules: {},
    photos: {},
    reviews: {},
  });

  const [sectionStatus, setSectionStatus] = useState<SectionStatus>({
    spaceSnapshot: false,
    leaseStyles: false,
    pricing: false,
    rules: false,
    photos: false,
    reviews: false,
  });

  const sections = [
    { id: 1, name: 'Space Snapshot', key: 'spaceSnapshot' },
    { id: 2, name: 'Lease Styles', key: 'leaseStyles' },
    { id: 3, name: 'Pricing', key: 'pricing' },
    { id: 4, name: 'Rules', key: 'rules' },
    { id: 5, name: 'Photos', key: 'photos' },
    { id: 6, name: 'Reviews and Optional', key: 'reviews' },
  ];

  const handleNext = () => {
    if (currentStep < sections.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSectionNavigate = (stepId: number) => {
    setCurrentStep(stepId);
    window.scrollTo(0, 0);
  };

  const updateFormData = (section: keyof ListingFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <div className="wizard-container">
      <header className="wizard-header">
        <h1>Create Your Listing</h1>
      </header>

      <div className="wizard-content">
        <NavigationSidebar
          sections={sections}
          currentStep={currentStep}
          sectionStatus={sectionStatus}
          onNavigate={handleSectionNavigate}
        />

        <main className="wizard-main">
          <div className="section-container">
            {currentStep === 1 && (
              <SpaceSnapshotSection
                data={formData.spaceSnapshot}
                onChange={(data) => updateFormData('spaceSnapshot', data)}
              />
            )}

            {currentStep === 2 && (
              <div className="section-placeholder">
                <h2>Lease Styles Section</h2>
                <p>This section will contain lease style options.</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="section-placeholder">
                <h2>Pricing Section</h2>
                <p>This section will contain pricing information.</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="section-placeholder">
                <h2>Rules Section</h2>
                <p>This section will contain house rules.</p>
              </div>
            )}

            {currentStep === 5 && (
              <div className="section-placeholder">
                <h2>Photos Section</h2>
                <p>This section will contain photo uploads.</p>
              </div>
            )}

            {currentStep === 6 && (
              <div className="section-placeholder">
                <h2>Reviews and Optional Section</h2>
                <p>This section will contain optional information.</p>
              </div>
            )}
          </div>

          <div className="wizard-navigation">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={handleBack}>
                Back
              </button>
            )}
            <button className="btn-primary" onClick={handleNext}>
              {currentStep < sections.length ? 'Next' : 'Submit'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SelfListingWizard;
