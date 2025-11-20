# Self-Listing Page Component

A comprehensive 7-section wizard for property hosts to create rental listings on Split Lease. This component was built based on the Bubble.io self-listing page and converted to React/TypeScript for deployment on Cloudflare.

## Features

### Multi-Section Wizard
- **Section 1: Space Snapshot** - Basic property information and address
- **Section 2: Features** - Amenities and property description
- **Section 3: Lease Styles** - Choose between Nightly, Weekly, or Monthly rentals
- **Section 4: Pricing** - Dynamic pricing interface based on lease style
- **Section 5: Rules** - House rules, cancellation policy, and guest preferences
- **Section 6: Photos** - Image upload with drag-and-drop support
- **Section 7: Review & Submit** - Final review and submission

### Key Functionality

#### Three Distinct Lease Styles
1. **Nightly Rentals**
   - Interactive day-of-week selector
   - Advanced pricing calculator with decay rates
   - Dynamic 5-night pricing table
   - Real-time rate calculations

2. **Weekly Rentals**
   - Simple pattern selection (1 week on/off, 2 weeks on/off, etc.)
   - Straightforward weekly compensation input

3. **Monthly Rentals**
   - Subsidy agreement modal
   - Traditional month-to-month pricing
   - Business logic validation

#### Smart Features
- **Auto-save**: Form data automatically saves to localStorage
- **Progress Tracking**: Visual progress indicator in sidebar
- **Section Validation**: Comprehensive validation for each section
- **Navigation**: Jump to any completed section via sidebar
- **Responsive Design**: Mobile, tablet, and desktop layouts

## Usage

### Basic Implementation

```typescript
import { SelfListingPage } from './components/SelfListingPage';

function App() {
  return <SelfListingPage />;
}
```

### Integration with Routing

```typescript
// With React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SelfListingPage } from './components/SelfListingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-listing" element={<SelfListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Data Structure

### ListingFormData Type

```typescript
interface ListingFormData {
  id?: string;
  userId?: string;
  spaceSnapshot: SpaceSnapshot;
  features: Features;
  leaseStyles: LeaseStylesConfig;
  pricing: Pricing;
  rules: Rules;
  photos: Photos;
  review: ReviewData;
  currentSection: number;
  completedSections: number[];
  isDraft: boolean;
  isSubmitted: boolean;
}
```

### Example Data

```typescript
const sampleListing = {
  spaceSnapshot: {
    listingName: 'Cozy Downtown Studio',
    typeOfSpace: 'Entire Place',
    bedrooms: 1,
    bathrooms: 1,
    address: {
      fullAddress: '123 Main St, San Francisco, CA 94102',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102'
    }
  },
  leaseStyles: {
    rentalType: 'Monthly'
  },
  pricing: {
    monthlyCompensation: 1850,
    damageDeposit: 500
  }
  // ... more fields
};
```

## Validation

Each section has comprehensive validation:

### Section 1 (Space Snapshot)
- Listing name: Required, max 35 characters
- Type of space: Required
- Bedrooms/Bathrooms: Required, numeric
- Address: Required with Google Maps validation

### Section 2 (Features)
- Description: Required, minimum length

### Section 3 (Lease Styles)
- Rental type selection required
- Weekly: Pattern selection required
- Monthly: Subsidy agreement required

### Section 4 (Pricing)
- Damage deposit: Minimum $500
- Rental rate: Required based on lease style
- Non-negative values enforced

### Section 5 (Rules)
- Cancellation policy: Required
- Duration validation: Max >= Min

### Section 6 (Photos)
- Minimum 3 photos required
- Supported formats: JPG, PNG, HEIC

### Section 7 (Review)
- Terms and conditions: Must agree
- Final validation of all sections

## Styling

The component includes comprehensive CSS with:
- Modern, clean design
- Responsive breakpoints for mobile/tablet/desktop
- Smooth transitions and animations
- Accessible color contrast
- Focus states for keyboard navigation

### Customization

You can customize the theme by modifying the CSS variables:

```css
/* In your global CSS or SelfListingPage.css */
:root {
  --primary-color: #6b46c1;
  --primary-hover: #553399;
  --border-color: #e0e0e0;
  --text-color: #1a1a1a;
}
```

## API Integration

### Required API Endpoints

You'll need to implement these endpoints for full functionality:

```typescript
// Submit listing
POST /api/listings
Body: ListingFormData
Response: { success: boolean, listingId: string }

// Save draft
PUT /api/listings/:id/draft
Body: Partial<ListingFormData>

// Upload photos
POST /api/listings/:id/photos
Body: FormData with image files
Response: { urls: string[] }

// Validate address (Google Maps integration)
POST /api/geocode/validate
Body: { address: string }
Response: { validated: boolean, coordinates: { lat, lng } }
```

### Example API Implementation

```typescript
// In your backend (Node.js/Express example)
app.post('/api/listings', async (req, res) => {
  const listingData = req.body;

  // Validate data
  const errors = validateListing(listingData);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Save to database (Supabase example)
  const { data, error } = await supabase
    .from('listings')
    .insert([listingData])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, listingId: data.id });
});
```

## Workflow Logic

### Section Navigation

1. User fills out form fields in current section
2. Clicks "Next" button
3. Validation runs for current section
4. If valid: Section marked as complete, navigate to next section
5. If invalid: Error messages displayed, navigation blocked

### Data Persistence

- **Auto-save**: Every change triggers localStorage save
- **Draft Recovery**: On page load, checks for saved draft
- **Final Submit**: Sends to API and clears draft

### Conditional UI

Different interfaces based on selections:

```typescript
// Pricing section adapts to rental type
{rentalType === 'Nightly' && <NightlyPricingInterface />}
{rentalType === 'Weekly' && <WeeklyPricingInterface />}
{rentalType === 'Monthly' && <MonthlyPricingInterface />}
```

## Google Maps Integration

For address validation and autocomplete, you'll need to add Google Maps API:

```html
<!-- In your index.html -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

```typescript
// In Section1SpaceSnapshot.tsx, add autocomplete
useEffect(() => {
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('fullAddress'),
    { types: ['address'] }
  );

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    // Update form data with place details
  });
}, []);
```

## Testing

### Unit Testing Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Section1SpaceSnapshot } from './sections/Section1SpaceSnapshot';

test('validates required fields', () => {
  const handleChange = jest.fn();
  const handleNext = jest.fn();

  render(
    <Section1SpaceSnapshot
      data={emptyData}
      onChange={handleChange}
      onNext={handleNext}
    />
  );

  // Click next without filling required fields
  fireEvent.click(screen.getByText('Next'));

  // Should show error messages
  expect(screen.getByText(/Listing name is required/i)).toBeInTheDocument();
  expect(handleNext).not.toHaveBeenCalled();
});
```

## Performance Optimization

### Current Optimizations
- LocalStorage for draft persistence
- Conditional rendering of sections
- Debounced auto-save (can be added)
- Lazy loading for photo thumbnails

### Recommended Improvements

```typescript
// Add debounced save
import { debounce } from 'lodash';

const debouncedSave = useCallback(
  debounce((data: ListingFormData) => {
    localStorage.setItem('selfListingDraft', JSON.stringify(data));
  }, 1000),
  []
);

useEffect(() => {
  debouncedSave(formData);
}, [formData]);
```

## Accessibility

The component includes:
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Error announcements
- High contrast colors

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS 13+, Android 8+

## Known Issues & Future Enhancements

### Current Limitations
1. Google Maps API integration needs to be added
2. Photo upload uses base64 (should upload to cloud storage)
3. No real-time collaboration features
4. Limited offline support

### Planned Features
1. Address autocomplete with Google Maps
2. Drag-and-drop photo upload
3. Template library for descriptions
4. AI-powered listing optimization suggestions
5. Multi-language support
6. Export to PDF functionality

## Troubleshooting

### Photos not uploading
- Check file size limits (recommend max 10MB per photo)
- Verify file format (JPG, PNG, HEIC supported)
- Ensure browser has file access permissions

### Form data not saving
- Check localStorage availability
- Verify no private browsing mode
- Check browser console for errors

### Validation not working
- Ensure all required fields have proper IDs
- Check that error messages are rendering
- Verify validation functions are being called

## Contributing

To contribute to this component:

1. Follow the existing code structure
2. Add TypeScript types for new features
3. Include validation for new form fields
4. Update this README with changes
5. Test on multiple screen sizes
6. Ensure accessibility standards are met

## License

Copyright (c) 2025 Split Lease. All rights reserved.

---

## Contact & Support

For questions or issues:
- GitHub Issues: [Link to repo]
- Email: support@split.lease
- Documentation: [Link to full docs]
