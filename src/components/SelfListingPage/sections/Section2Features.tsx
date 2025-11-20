import React, { useState } from 'react';
import type { Features } from '../types/listing.types';
import { AMENITIES_INSIDE, AMENITIES_OUTSIDE } from '../types/listing.types';

interface Section2Props {
  data: Features;
  onChange: (data: Features) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Section2Features: React.FC<Section2Props> = ({
  data,
  onChange,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Features, value: any) => {
    onChange({ ...data, [field]: value });
    // Clear error when field is updated
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const toggleAmenity = (amenity: string, isInside: boolean) => {
    const field = isInside ? 'amenitiesInsideUnit' : 'amenitiesOutsideUnit';
    const currentAmenities = data[field];

    const updated = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];

    handleChange(field, updated);
  };

  const loadCommonAmenities = () => {
    const common = [
      'WiFi',
      'Air Conditioned',
      'Heating',
      'Washer',
      'Dryer',
      'TV',
      'Bedding',
      'Essentials'
    ];
    handleChange('amenitiesInsideUnit', [...new Set([...data.amenitiesInsideUnit, ...common])]);
  };

  const loadTemplate = () => {
    const template = `Welcome to our comfortable and well-appointed space! This listing offers a great location with easy access to local amenities and transportation.

The space features modern furnishings and all the essentials you need for a pleasant stay. You'll have access to [list specific areas/amenities].

The neighborhood is [describe neighborhood characteristics - quiet, vibrant, family-friendly, etc.] with [mention nearby attractions, restaurants, shops, or transit].

We look forward to hosting you!`;

    handleChange('descriptionOfLodging', template);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.descriptionOfLodging || data.descriptionOfLodging.trim().length === 0) {
      newErrors.descriptionOfLodging = 'Description of lodging is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="section-container features-section">
      <h2 className="section-title">Features</h2>
      <p className="section-subtitle">Describe your property's amenities and features</p>

      {/* Amenities Inside Unit */}
      <div className="form-group">
        <div className="label-with-action">
          <label>Amenities inside Unit</label>
          <button
            type="button"
            className="btn-link"
            onClick={loadCommonAmenities}
          >
            load common
          </button>
        </div>
        <div className="checkbox-grid">
          {AMENITIES_INSIDE.map((amenity) => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={data.amenitiesInsideUnit.includes(amenity)}
                onChange={() => toggleAmenity(amenity, true)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description of Lodging */}
      <div className="form-group">
        <div className="label-with-action">
          <label htmlFor="descriptionOfLodging">
            Description of Lodging<span className="required">*</span>
          </label>
          <button
            type="button"
            className="btn-link"
            onClick={loadTemplate}
          >
            load template
          </button>
        </div>
        <textarea
          id="descriptionOfLodging"
          rows={8}
          placeholder="Describe your space in detail..."
          value={data.descriptionOfLodging}
          onChange={(e) => handleChange('descriptionOfLodging', e.target.value)}
          className={errors.descriptionOfLodging ? 'input-error' : ''}
        />
        {errors.descriptionOfLodging && (
          <span className="error-message">{errors.descriptionOfLodging}</span>
        )}
      </div>

      {/* Amenities Outside Unit */}
      <div className="form-group">
        <label>Amenities outside Unit (Optional)</label>
        <div className="checkbox-grid">
          {AMENITIES_OUTSIDE.map((amenity) => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={data.amenitiesOutsideUnit.includes(amenity)}
                onChange={() => toggleAmenity(amenity, false)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Neighborhood Description */}
      <div className="form-group">
        <label htmlFor="neighborhoodDescription">
          Describe Life in the Neighborhood (Optional)
        </label>
        <textarea
          id="neighborhoodDescription"
          rows={6}
          placeholder="Tell guests about the neighborhood..."
          value={data.neighborhoodDescription}
          onChange={(e) => handleChange('neighborhoodDescription', e.target.value)}
        />
      </div>

      {/* Navigation */}
      <div className="section-navigation">
        <button type="button" className="btn-back" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
