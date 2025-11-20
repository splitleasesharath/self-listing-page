import { useState } from 'react';
import './SpaceSnapshotSection.css';

interface SpaceSnapshotData {
  listingName: string;
  typeOfSpace: string;
  bedrooms: number;
  typeOfKitchen: string;
  beds: number;
  typeOfParking: string;
  bathrooms: number;
  address: {
    fullAddress: string;
    number: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
    validated: boolean;
    latitude: number | null;
    longitude: number | null;
  };
}

interface SpaceSnapshotSectionProps {
  data: SpaceSnapshotData;
  onChange: (data: SpaceSnapshotData) => void;
}

const SpaceSnapshotSection = ({ data, onChange }: SpaceSnapshotSectionProps) => {
  const [showAddressDetails, setShowAddressDetails] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleAddressChange = (field: string, value: any) => {
    onChange({
      ...data,
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleAddressChange('fullAddress', value);
    if (value.length > 3) {
      setShowAddressDetails(true);
    }
  };

  return (
    <div className="space-snapshot-section">
      <h2 className="section-title">Space Snapshot</h2>
      <p className="section-subtitle">Let's start with the basics about your space</p>

      <div className="info-alert">
        <span className="info-icon">ℹ️</span>
        <span>
          We will check to see if the automatic system can verify the address and, if not,
          ask you to confirm the address in more detail.
        </span>
      </div>

      <div className="form-group">
        <label className="form-label">
          Listing Name <span className="required">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Listing Name (35 character max)"
          maxLength={35}
          value={data.listingName}
          onChange={(e) => handleInputChange('listingName', e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Type of Space <span className="required">*</span>
          </label>
          <select
            className="form-select"
            value={data.typeOfSpace}
            onChange={(e) => handleInputChange('typeOfSpace', e.target.value)}
          >
            <option value="">Choose an option...</option>
            <option value="entire-place">Entire Place</option>
            <option value="private-room">Private Room</option>
            <option value="shared-room">Shared Room</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Bedrooms <span className="required">*</span>
          </label>
          <input
            type="number"
            className="form-input"
            min="0"
            value={data.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Type of Kitchen <span className="required">*</span>
          </label>
          <select
            className="form-select"
            value={data.typeOfKitchen}
            onChange={(e) => handleInputChange('typeOfKitchen', e.target.value)}
          >
            <option value="">Choose an option...</option>
            <option value="full-kitchen">Full Kitchen</option>
            <option value="kitchenette">Kitchenette</option>
            <option value="no-kitchen">No Kitchen</option>
            <option value="not-accessible">Kitchen Not Accessible</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Beds</label>
          <input
            type="number"
            className="form-input"
            min="0"
            value={data.beds}
            onChange={(e) => handleInputChange('beds', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Type of Parking <span className="required">*</span>
          </label>
          <select
            className="form-select"
            value={data.typeOfParking}
            onChange={(e) => handleInputChange('typeOfParking', e.target.value)}
          >
            <option value="">Choose an option...</option>
            <option value="street-parking">Street Parking</option>
            <option value="garage-parking">Garage Parking</option>
            <option value="driveway">Driveway</option>
            <option value="no-parking">No Parking</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Bathrooms <span className="required">*</span>
          </label>
          <input
            type="number"
            className="form-input"
            min="0"
            step="0.5"
            value={data.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="address-section">
        <label className="form-label">
          Listing Address <span className="required">*</span>{' '}
          <span className="label-note">(private and will not be shared)</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="123 Main St."
          value={data.address.fullAddress}
          onChange={handleAddressInput}
        />

        {showAddressDetails && (
          <>
            <div className="info-message">
              <span className="info-icon">ℹ️</span>
              <span>Please confirm your address</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.address.number}
                  onChange={(e) => handleAddressChange('number', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  State <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={data.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                >
                  <option value="">Select a state...</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  {/* Add more states as needed */}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Zip</label>
              <input
                type="text"
                className="form-input"
                maxLength={10}
                value={data.address.zip}
                onChange={(e) => handleAddressChange('zip', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Neighborhood</label>
              <div className="neighborhood-info">
                These neighborhoods are identified based on the ZIP code you provided for
                your address
              </div>
              <select
                className="form-select"
                value={data.address.neighborhood}
                onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
              >
                <option value="">Select a neighborhood</option>
                <option value="downtown">Downtown</option>
                <option value="midtown">Midtown</option>
                <option value="uptown">Uptown</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpaceSnapshotSection;
