import React, { useState } from 'react';
import type { Rules, CancellationPolicy, GenderPreference, RentalType } from '../types/listing.types';
import { HOUSE_RULES } from '../types/listing.types';

interface Section5Props {
  data: Rules;
  rentalType: RentalType;
  onChange: (data: Rules) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Section5Rules: React.FC<Section5Props> = ({ data, rentalType, onChange, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Rules, value: any) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const toggleHouseRule = (rule: string) => {
    const updated = data.houseRules.includes(rule)
      ? data.houseRules.filter((r) => r !== rule)
      : [...data.houseRules, rule];
    handleChange('houseRules', updated);
  };

  const loadCommonRules = () => {
    const common = ['No Parties', 'No Smoking Inside', 'Quiet Hours', 'Wash Your Dishes', 'Lock Doors'];
    handleChange('houseRules', [...new Set([...data.houseRules, ...common])]);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.cancellationPolicy) {
      newErrors.cancellationPolicy = 'Cancellation policy is required';
    }

    if (data.idealMinDuration > data.idealMaxDuration) {
      newErrors.idealMaxDuration = 'Maximum duration must be greater than or equal to minimum';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const checkInTimes = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'];
  const checkOutTimes = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM'];

  // Determine duration unit based on rental type
  const getDurationUnit = () => {
    if (rentalType === 'Monthly') {
      return 'months';
    }
    // For Nightly and Weekly, use weeks
    return 'weeks';
  };

  const durationUnit = getDurationUnit();

  return (
    <div className="section-container rules-section">
      <h2 className="section-title">Rules</h2>
      <p className="section-subtitle">Set house rules and preferences</p>

      {/* Cancellation Policy */}
      <div className="form-group">
        <label htmlFor="cancellationPolicy">
          Cancellation Policy<span className="required">*</span>
        </label>
        <select
          id="cancellationPolicy"
          value={data.cancellationPolicy}
          onChange={(e) => handleChange('cancellationPolicy', e.target.value as CancellationPolicy)}
          className={errors.cancellationPolicy ? 'input-error' : ''}
        >
          <option value="">Choose an option…</option>
          <option value="Standard">Standard</option>
          <option value="Additional Host Restrictions">Additional Host Restrictions</option>
        </select>
        {errors.cancellationPolicy && <span className="error-message">{errors.cancellationPolicy}</span>}
        <button type="button" className="btn-link">Review Standard Policy</button>
      </div>

      {/* Guest Preferences */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="preferredGender">Preferred Gender</label>
          <select
            id="preferredGender"
            value={data.preferredGender}
            onChange={(e) => handleChange('preferredGender', e.target.value as GenderPreference)}
          >
            <option value="No Preference">No Preference</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other/Non Defined">Other/Non Defined</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numberOfGuests"># of Guests</label>
          <select
            id="numberOfGuests"
            value={data.numberOfGuests}
            onChange={(e) => handleChange('numberOfGuests', parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Check-in/Check-out Times */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="checkInTime">Check In Time</label>
          <select
            id="checkInTime"
            value={data.checkInTime}
            onChange={(e) => handleChange('checkInTime', e.target.value)}
          >
            {checkInTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="checkOutTime">Check Out Time</label>
          <select
            id="checkOutTime"
            value={data.checkOutTime}
            onChange={(e) => handleChange('checkOutTime', e.target.value)}
          >
            {checkOutTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ideal Rental Duration */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="idealMinDuration">Ideal rental duration (min {durationUnit})</label>
          <input
            type="number"
            id="idealMinDuration"
            min="2"
            max="12"
            value={data.idealMinDuration}
            onChange={(e) => handleChange('idealMinDuration', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="idealMaxDuration">Ideal rental duration (max {durationUnit})</label>
          <input
            type="number"
            id="idealMaxDuration"
            min="2"
            max="12"
            value={data.idealMaxDuration}
            onChange={(e) => handleChange('idealMaxDuration', parseInt(e.target.value))}
            className={errors.idealMaxDuration ? 'input-error' : ''}
          />
          {errors.idealMaxDuration && <span className="error-message">{errors.idealMaxDuration}</span>}
        </div>
      </div>

      {/* House Rules */}
      <div className="form-group">
        <div className="label-with-action">
          <label>House Rules</label>
          <button type="button" className="btn-link" onClick={loadCommonRules}>
            load common house rules
          </button>
        </div>
        <div className="checkbox-grid">
          {HOUSE_RULES.map((rule) => (
            <label key={rule} className="checkbox-label">
              <input
                type="checkbox"
                checked={data.houseRules.includes(rule)}
                onChange={() => toggleHouseRule(rule)}
              />
              <span>{rule}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Block Dates */}
      <div className="form-group">
        <label>Block Dates</label>
        <p className="field-info">Select dates when your property will not be available</p>
        <button type="button" className="btn-secondary">Add Date</button>
        {data.blockedDates.length > 0 && (
          <div className="blocked-dates-list">
            {data.blockedDates.map((date, index) => (
              <div key={index} className="blocked-date-item">
                <span>{date.toLocaleDateString()}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = data.blockedDates.filter((_, i) => i !== index);
                    handleChange('blockedDates', updated);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
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
