import React, { useState, useEffect } from 'react';
import type { Pricing, NightlyPricing, RentalType } from '../types/listing.types';

interface Section4Props {
  data: Pricing;
  rentalType: RentalType;
  onChange: (data: Pricing) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Section4Pricing: React.FC<Section4Props> = ({
  data,
  rentalType,
  onChange,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate nightly pricing table
  const calculateNightlyRates = (basePrice: number, decay: number): NightlyPricing => {
    const night1 = basePrice;
    const night2 = Math.round(night1 * decay);
    const night3 = Math.round(night2 * decay);
    const night4 = Math.round(night3 * decay);
    const night5 = Math.round(night4 * decay);

    return {
      oneNightPrice: basePrice,
      decayPerNight: decay,
      fiveNightTotal: night1 + night2 + night3 + night4 + night5,
      calculatedRates: {
        night1,
        night2,
        night3,
        night4,
        night5,
        cumulativeNight2: night1 + night2,
        cumulativeNight3: night1 + night2 + night3,
        cumulativeNight4: night1 + night2 + night3 + night4,
        cumulativeNight5: night1 + night2 + night3 + night4 + night5
      }
    };
  };

  // Update nightly pricing when base price or decay changes
  useEffect(() => {
    if (rentalType === 'Nightly' && data.nightlyPricing) {
      const recalculated = calculateNightlyRates(
        data.nightlyPricing.oneNightPrice,
        data.nightlyPricing.decayPerNight
      );
      if (JSON.stringify(recalculated) !== JSON.stringify(data.nightlyPricing)) {
        onChange({
          ...data,
          nightlyPricing: recalculated
        });
      }
    }
  }, [rentalType, data.nightlyPricing?.oneNightPrice, data.nightlyPricing?.decayPerNight]);

  const handleChange = (field: keyof Pricing, value: any) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleNightlyChange = (field: keyof NightlyPricing, value: number) => {
    if (data.nightlyPricing) {
      const updated = { ...data.nightlyPricing, [field]: value };
      const recalculated = calculateNightlyRates(updated.oneNightPrice, updated.decayPerNight);
      onChange({ ...data, nightlyPricing: recalculated });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate damage deposit
    if (data.damageDeposit < 500) {
      newErrors.damageDeposit = 'Damage deposit must be at least $500';
    }

    // Rental type specific validation
    if (rentalType === 'Monthly') {
      if (!data.monthlyCompensation || data.monthlyCompensation <= 0) {
        newErrors.monthlyCompensation = 'Monthly compensation is required';
      }
    } else if (rentalType === 'Weekly') {
      if (!data.weeklyCompensation || data.weeklyCompensation <= 0) {
        newErrors.weeklyCompensation = 'Weekly compensation is required';
      }
    } else if (rentalType === 'Nightly') {
      if (!data.nightlyPricing || data.nightlyPricing.oneNightPrice <= 0) {
        newErrors.nightlyPricing = '1-night price is required';
      }
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
    <div className="section-container pricing-section">
      <h2 className="section-title">Pricing</h2>
      <p className="section-subtitle">Set your rental rates and fees</p>

      {/* Nightly Pricing Interface */}
      {rentalType === 'Nightly' && (
        <div className="nightly-pricing">
          <h3>Nightly Rate Calculator</h3>

          {/* 1-Night Price */}
          <div className="form-group">
            <label htmlFor="oneNightPrice">1-Night Price</label>
            <div className="price-input-group">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="oneNightPrice"
                min="1"
                value={data.nightlyPricing?.oneNightPrice || 99}
                onChange={(e) =>
                  handleNightlyChange('oneNightPrice', parseInt(e.target.value) || 99)
                }
              />
              <div className="spinner-buttons">
                <button
                  type="button"
                  onClick={() =>
                    handleNightlyChange(
                      'oneNightPrice',
                      (data.nightlyPricing?.oneNightPrice || 99) + 1
                    )
                  }
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleNightlyChange(
                      'oneNightPrice',
                      Math.max(1, (data.nightlyPricing?.oneNightPrice || 99) - 1)
                    )
                  }
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Decay Per Additional Night */}
          <div className="form-group">
            <label htmlFor="decayPerNight">
              Decay Per Additional Night (70% - 100%)
            </label>
            <div className="decay-input-group">
              <input
                type="number"
                id="decayPerNight"
                min="0.700"
                max="1.000"
                step="0.001"
                value={data.nightlyPricing?.decayPerNight || 0.956}
                onChange={(e) =>
                  handleNightlyChange('decayPerNight', parseFloat(e.target.value) || 0.956)
                }
              />
              <span className="percentage">
                {Math.round((data.nightlyPricing?.decayPerNight || 0.956) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.700"
              max="1.000"
              step="0.001"
              value={data.nightlyPricing?.decayPerNight || 0.956}
              onChange={(e) =>
                handleNightlyChange('decayPerNight', parseFloat(e.target.value))
              }
              className="decay-slider"
            />
          </div>

          {/* 5-Night Total */}
          <div className="form-group">
            <label>5-Night Total</label>
            <div className="price-display">
              ${data.nightlyPricing?.fiveNightTotal || 456}
            </div>
          </div>

          {/* Dynamic Pricing Table */}
          {data.nightlyPricing && (
            <div className="pricing-table">
              <h4>Nightly Rate Breakdown</h4>
              <table>
                <thead>
                  <tr>
                    <th>Night</th>
                    <th>Price That Night</th>
                    <th>Cumulative Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>${data.nightlyPricing.calculatedRates.night1}</td>
                    <td>${data.nightlyPricing.calculatedRates.night1}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>${data.nightlyPricing.calculatedRates.night2}</td>
                    <td>${data.nightlyPricing.calculatedRates.cumulativeNight2}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>${data.nightlyPricing.calculatedRates.night3}</td>
                    <td>${data.nightlyPricing.calculatedRates.cumulativeNight3}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>${data.nightlyPricing.calculatedRates.night4}</td>
                    <td>${data.nightlyPricing.calculatedRates.cumulativeNight4}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>${data.nightlyPricing.calculatedRates.night5}</td>
                    <td>${data.nightlyPricing.calculatedRates.cumulativeNight5}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Weekly Pricing Interface */}
      {rentalType === 'Weekly' && (
        <div className="weekly-pricing">
          <div className="form-group">
            <label htmlFor="weeklyCompensation">
              Weekly Compensation<span className="required">*</span>
            </label>
            <div className="price-input-group">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="weeklyCompensation"
                placeholder="600 (example)"
                value={data.weeklyCompensation || ''}
                onChange={(e) =>
                  handleChange('weeklyCompensation', parseInt(e.target.value) || 0)
                }
                className={errors.weeklyCompensation ? 'input-error' : ''}
              />
            </div>
            {errors.weeklyCompensation && (
              <span className="error-message">{errors.weeklyCompensation}</span>
            )}
          </div>
        </div>
      )}

      {/* Monthly Pricing Interface */}
      {rentalType === 'Monthly' && (
        <div className="monthly-pricing">
          <div className="form-group">
            <label htmlFor="monthlyCompensation">
              Monthly Compensation<span className="required">*</span>
            </label>
            <div className="price-input-group">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                id="monthlyCompensation"
                value={data.monthlyCompensation || 1850}
                onChange={(e) =>
                  handleChange('monthlyCompensation', parseInt(e.target.value) || 0)
                }
                className={errors.monthlyCompensation ? 'input-error' : ''}
              />
            </div>
            {errors.monthlyCompensation && (
              <span className="error-message">{errors.monthlyCompensation}</span>
            )}
          </div>
        </div>
      )}

      {/* Common Fields for All Rental Types */}
      <div className="common-pricing-fields">
        <div className="form-group">
          <label htmlFor="damageDeposit">
            Damage Deposit<span className="required">*</span>
            <span className="field-note"> (minimum $500)</span>
          </label>
          <div className="price-input-group">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="damageDeposit"
              min="500"
              value={data.damageDeposit}
              onChange={(e) => handleChange('damageDeposit', parseInt(e.target.value) || 500)}
              className={errors.damageDeposit ? 'input-error' : ''}
            />
          </div>
          {errors.damageDeposit && (
            <span className="error-message">{errors.damageDeposit}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="maintenanceFee">Monthly Maintenance/Cleaning Fee (Optional)</label>
          <div className="price-input-group">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="maintenanceFee"
              min="0"
              placeholder="0"
              value={data.maintenanceFee}
              onChange={(e) => handleChange('maintenanceFee', parseInt(e.target.value) || 0)}
            />
          </div>
          <small className="field-hint">This fee will be charged monthly</small>
        </div>
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
