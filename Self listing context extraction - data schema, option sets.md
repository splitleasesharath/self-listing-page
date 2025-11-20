\=====================  
SELF-LISTING PAGE \- DATA SCHEMA & WORKFLOW DOCUMENTATION  
\=====================

OVERVIEW  
\=====================  
This document provides a comprehensive guide for converting the Bubble self-listing page into a code-based implementation using Supabase. The self-listing page allows hosts to create and submit property listings by filling out a multi-step form.

\==================  
DATABASE SCHEMA  
\==================

1. LISTING TABLE (Main entity for property listings)  
2. —-------------------------------------------------  
3. Table Name: listings

Core Fields:

- Id: UUID (Primary Key)  
- \- created\_date: TIMESTAMP  
- \- modified\_date: TIMESTAMP  
- \- creator: UUID (Foreign Key to users table)  
- \- slug: TEXT (Unique identifier for URL)

Basic Information:

- Name: TEXT (Listing name, max 35 characters)  
- \- location\_address: GEOGRAPHY (Geographic address)  
- \- location\_city: TEXT (City name)  
- \- location\_state: TEXT (State)  
- \- location\_zip\_code: TEXT (Zip code)  
- \- location\_borough: TEXT (Borough/neighborhood)  
- \- location\_hood: TEXT (Hood medium level)  
- \- location\_hoods\_new: ARRAY (List of hood medium levels)  
- \- location\_slightly\_different: GEOGRAPHY (Alternative address if needed)

Property Features:

- Features\_qty\_bedrooms: NUMERIC (Number of bedrooms)  
- \- features\_qty\_beds: NUMERIC (Number of beds)  
- \- features\_qty\_bathrooms: NUMERIC (Number of bathrooms)  
- \- features\_qty\_guests: NUMERIC (Maximum guests)  
- \- features\_sqft\_area: NUMERIC (Square footage)  
- \- features\_sqft\_of\_room: NUMERIC (Room square footage)  
- \- kitchen\_type: TEXT (Option set reference \- see OPTION SETS section)

Amenities (Boolean flags or arrays):

- Features\_amenities\_included: ARRAY (List of amenity IDs)  
- \- features\_amenities\_indoor: ARRAY (List of indoor amenities)  
- \- features\_house\_rules: ARRAY (List of house rules)  
- \- features\_parking\_type: TEXT (Option set reference)  
- \- features\_secure\_storage: TEXT (Option set reference)  
- \- features\_safety: ARRAY (List of safety features)  
- \- features\_trial\_periods: BOOLEAN (Allows trial periods)

Availability & Scheduling:

- First\_available: DATE  
- \- last\_available: DATE  
- \- nights\_available\_list\_of: ARRAY (List of night objects)  
- \- nights\_available\_number: ARRAY (List of numeric night codes)  
- \- nights\_not\_available: ARRAY (List of unavailable nights)  
- \- dates\_blocked: ARRAY (List of blocked dates)  
- \- weeks\_offered: TEXT (Option set: “Every week”, “Every other week”, etc.)  
- \- weeks\_out\_to\_available: NUMERIC (Default: 2, how many weeks in advance)  
- \- minimum\_weeks: NUMERIC (Default: 6, minimum rental period)  
- \- new\_date\_checkin\_time: TIME (Check-in time, default: 2:00 PM)  
- \- new\_date\_checkout\_time: TIME (Check-out time, default: 11:00 AM)

Pricing:

- Monthly\_host\_rate: NUMERIC (Monthly rate for host)  
- \- damage\_deposit: NUMERIC (Default: 0\)  
- \- cleaning\_cost\_maintenance: NUMERIC (Default: 0\)  
- \- lister\_price\_display: NUMERIC (Display price)  
- \- price\_number\_for\_map: TEXT (Price for map display)  
- \- price\_suggestion: ARRAY (List of suggested prices)

Status & Approvals:

- Active: BOOLEAN (Is listing active)  
- \- approved: BOOLEAN (Default: no, admin approval status)  
- \- complete: BOOLEAN (Is listing setup complete)  
- \- confirmed\_availability: BOOLEAN (Availability confirmed)  
- \- showcase: BOOLEAN (Featured listing)  
- \- temp\_listing\_updated: BOOLEAN (Temporary update flag)  
- \- is\_for\_usability: BOOLEAN (For testing/usability)  
- \- ported\_from\_short\_term: BOOLEAN (Migrated from short-term)

Media & Content:

- Jingle: FILE (Audio/video tour)  
- \- video\_tour: FILE (Video file)  
- \- storage\_instructions: TEXT (Storage instructions)  
- \- neighborhood\_manual: TEXT (Neighborhood information)  
- \- time\_to\_station\_commute: TEXT (Transit time information)

Lists & Curation:

- Listing\_curation: ARRAY (Curation parameters)  
- \- ai\_suggestions\_list: ARRAY (AI-generated suggestions)  
- \- nearby\_suggestions\_from: ARRAY (Nearby suggestions)  
- \- errors: ARRAY (Important errors list)

Search & Discovery:

- Search\_ranking: NUMERIC (Default: 0, for search algorithm)  
- \- clicks\_to\_view\_ratio: NUMERIC (Click-through rate metric)  
- \- desirability\_times\_received: NUMERIC (Desirability score)

Preferences:

- Preferred\_gender: TEXT (Type: Gender option set, default: “No Preference”)  
- \- allow\_alternating\_roommates: BOOLEAN (Allow room alternation)

Other:

- Source\_link: TEXT (Original listing source if ported)  
- \- site\_source: TEXT (Platform source)  
- \- not\_found\_location\_address: TEXT (Error field for address issues)  
- \- standardized\_minimum: NUMERIC (Standardized min value)  
- \- listing\_code\_op: TEXT (Operational listing code)  
- \- bulk\_upload\_id: TEXT (Batch upload identifier)  
- \- cancel\_features\_email\_id: TEXT (Cancellation email ID)

Relationships:

- Users\_with\_permission: ARRAY (Users who can edit)  
- \- users\_that\_favorite: ARRAY (Users who favorited)  
- \- viewers: ARRAY (Users who viewed)  
- \- clickers: ARRAY (Users who clicked)

2\. LISTING\_PHOTOS TABLE  
—-------------------------------------------------  
Table Name: listing\_photos

Fields:

- Id: UUID (Primary Key)  
- \- listing\_id: UUID (Foreign Key to listings)  
- \- photo\_url: TEXT (Image URL)  
- \- display\_order: INTEGER (Order for display)  
- \- caption: TEXT (Photo caption)  
- \- created\_date: TIMESTAMP

3\. ACCOUNT\_HOST TABLE (Host/User Information)  
—-------------------------------------------------  
Table Name: account\_host

Fields:

- Id: UUID (Primary Key)  
- \- email: TEXT  
- \- user\_id: UUID (Foreign Key to users table)  
- \- created\_date: TIMESTAMP  
- \- modified\_date: TIMESTAMP

\==================  
OPTION SETS (Enums/Reference Tables)  
\==================

These should be implemented as ENUM types or reference tables in Supabase:

1. \#Bathrooms  
2. Values: 1 Bath, 2 Baths, 2.5 Baths, 3 Baths, 3.5 Baths, 4 Baths, 4.5 Baths, 5 Baths, 6 Baths  
3. Attributes:  
4.   \- Numeric: NUMBER  
5.   \- Display: TEXT (built-in)

2\. \#Bedrooms  
Values: Similar structure to bathrooms (1, 2, 3, 4, 5, 6, 7, 8+)  
Attributes:

- Numeric: NUMBER  
-   \- Display: TEXT

3\. \#Beds  
Values: Similar structure (1, 2, 3, 4, 5, 6+)  
Attributes:

- Numeric: NUMBER  
-   \- Display: TEXT

4\. Kitchen Types  
Values: Full Kitchen, Kitchenette, No kitchen, Kitchen Not Accessible  
Attributes:

- Display: TEXT (built-in)

5\. Rental Type  
Values: Nightly, Weekly, Monthly  
Attributes:

- Display per period: TEXT  
-   \- First Selection Idea: TEXT  
-   \- Radio Button Text: TEXT  
-   \- Display: TEXT (built-in)  
6. Weekly Selection options  
7. Values: Every week, Every other week, etc.  
8. Attributes:  
9.   \- Display: TEXT

7\. ZAT-Features \- Parking Options  
Values: Street Parking, Garage Parking, Driveway, No Parking, etc.  
Attributes:

- Display: TEXT

8\. ZAT-Features \- Amenity s  
Values: WiFi, Air Conditioning, Heating, Washer, Dryer, Dishwasher, TV, Desk/Workspace, etc.  
Attributes:

- Display: TEXT  
-   \- Category: TEXT (e.g., “Essential”, “Comfort”, “Convenience”)

9\. ZAT-Features \- HouseRules  
Values: No Smoking, No Pets, No Parties, Quiet Hours, etc.  
Attributes:

- Display: TEXT  
10. ZAT-Features \- Storage Options  
11. Values: Closet, Shelf Space, Under-bed Storage, etc.  
12. Attributes:  
13.   \- Display: TEXT

11\. zFUT-Safety Featureses  
Values: Smoke Detector, Carbon Monoxide Detector, Fire Extinguisher, First Aid Kit, etc.  
Attributes:

- Display: TEXT

12\. Type: Gender  
Values: Male, Female, Non-binary, No Preference  
Attributes:

- Display: TEXT

13\. Check-In and Check-Out Times  
Values: Various times throughout the day  
Attributes:

- Display: TEXT (e.g., “2:00 pm”, “11:00 am”)

\==================  
WORKFLOW & DATA MANIPULATION  
\==================

USER ACTION FLOW:  
\==================

STEP 1: Page Load (Page is loaded workflow)

- Initialize form with empty listing object  
- \- Set default values:  
-   \* weeks\_out\_to\_available \= 2  
-   \* minimum\_weeks \= 6  
-   \* damage\_deposit \= 0  
-   \* cleaning\_cost \= 0  
-   \* new\_date\_checkin\_time \= “2:00 PM”  
-   \* new\_date\_checkout\_time \= “11:00 AM”  
-   \* approved \= false  
- \- Load current user context  
- \- If URL contains listing parameter, load existing listing data

STEP 2: Form Input Changes (Real-time data manipulation)  
\==================

When user interacts with form fields, data is stored in the page’s “Parent group’s Listing” custom state or directly in a temporary listing record.

1. Basic Information Section:  
2.    User fills: Listing Name, Address, Space Type, Bedrooms, Beds, Bathrooms  
3.      
4.    Data Handling:  
5.    \- On “Listing Name” input: Set Parent group’s Listing’s Name \= Input value  
6.    \- On “Address” input:   
7.      \* Geocode address using Bubble’s geocoding  
8.      \* Set location\_address \= geocoded result  
9.      \* Extract city, state, zip from geocoded data  
10.      \* Set location\_city, location\_state, location\_zip\_code  
11.      \* Determine borough/hood based on coordinates  
12.      
13.    \- On dropdown selections (Bedrooms, Beds, Bathrooms, Kitchen):  
14.      \* Set features\_qty\_bedrooms \= Selected option’s Numeric value  
15.      \* Set features\_qty\_beds \= Selected option’s Numeric value  
16.      \* Set features\_qty\_bathrooms \= Selected option’s Numeric value  
17.      \* Set kitchen\_type \= Selected option’s Display value

B. Rental Type Selection:  
   User selects: Nightly, Weekly, or Monthly  
     
   Data Handling:

- On selection: Set page state “SelectedRentalType” \= Option  
-    \- This affects which fields are shown/required  
-    \- Update weeks\_offered based on selection  
-      
- C. Lease Styles Section (for monthly rentals):  
-    Options: Traditional lease, Flex lease, etc.  
-      
-    Data Handling:  
-    \- Store selection in custom state  
-    \- This affects pricing calculations

D. Pricing Section:  
   User inputs: Monthly rate, Damage Deposit, Cleaning Fee  
     
   Data Handling:

- On “Monthly Rate” input:  
-      \* Set monthly\_host\_rate \= Input value  
-      \* Calculate lister\_price\_display (may include platform fees)  
-      \* Update price\_number\_for\_map for map display  
-      
-    \- On “Damage Deposit” input:  
-      \* Set damage\_deposit \= Input value (default 0\)  
-      
-    \- On “Cleaning Cost” input:  
-      \* Set cleaning\_cost\_maintenance \= Input value (default 0\)

E. Features & Amenities:  
   User selects from checkboxes/multi-select:  
     
   Data Handling:

- Create an array of selected amenity IDs  
-    \- On amenity selection:  
-      \* If checked: Add to features\_amenities\_included array  
-      \* If unchecked: Remove from features\_amenities\_included array  
-      
-    \- Similar logic for:  
-      \* features\_house\_rules (checkboxes)  
-      \* features\_safety (checkboxes)  
-      \* features\_parking\_type (dropdown)  
-      \* features\_secure\_storage (dropdown)

F. Availability Section:  
   User selects available nights, date ranges  
     
   Data Handling:

- Use custom night selector element (similar to Host Schedule Selector)  
-    \- On night selection:  
-      \* Update nights\_available\_list\_of array with selected night objects  
-      \* Update nights\_available\_number array with numeric codes  
-      
-    \- On date picker:  
-      \* Set first\_available \= Selected start date  
-      \* Set last\_available \= Selected end date  
-      
-    \- On blocked dates selection:  
-      \* Add to dates\_blocked array

G. Photos Upload:  
   User uploads multiple photos  
     
   Data Handling:

- On file upload:  
-      \* Upload file to storage (e.g., Supabase Storage bucket)  
-      \* Create record in listing\_photos table:  
-        \- listing\_id \= current listing ID  
-        \- photo\_url \= uploaded file URL  
-        \- display\_order \= next available order number  
-      \* Update features\_photos array in listing table with photo IDs

H. House Rules & Optional Settings:  
   User selects rules, preferences  
     
   Data Handling:

- On selection:  
-      \* Set features\_trial\_periods \= checkbox value  
-      \* Set allow\_alternating\_roommates \= checkbox value  
-      \* Set preferred\_gender \= dropdown selection

STEP 3: Save/Update Listing (Intermediate saves)  
\==================

Triggered by: “Save” button clicks, “Next” button (moving between sections)

Workflow: “B: Save is clicked-Updates Host Account’s listing”  
     
Actions:

1. Validate current section’s required fields  
2.    \- Check if mandatory fields are filled  
3.    \- If validation fails: Show error, prevent save  
4.      
5. 2\. If listing doesn’t exist (new listing):  
6.    \- Create new record in listings table:  
7.      \* creator \= Current User  
8.      \* created\_date \= Current date/time  
9.      \* approved \= false  
10.      \* active \= false  
11.      \* complete \= false  
12.    \- Set listing\_id for subsequent operations  
13.      
14. 3\. If listing exists:  
15.    \- Update existing record with Make changes to thing:  
16.      \* modified\_date \= Current date/time  
17.      \* Update all changed fields from form inputs  
18.      
19. 4\. Update custom state:  
20.    \- Parent group’s Listing \= Updated listing object

5\. UI Feedback:

- Show success message  
-    \- Enable next section  
-    \- Update progress indicator

STEP 4: Submit Listing (Final submission)  
\==================

Triggered by: “B: Submit Listing is clicked” button

Frontend Workflow: “B: Submit Listing is clicked”

Actions in sequence:

1. Schedule API Workflow l2-submit-listing:  
2.    Parameters:  
3.    \- listing: Parent group’s Listing  
4.    \- host\_user: Current User  
5.    \- page\_come\_from\_text: This URL  
6.    \- Scheduled date: Current date/time  
7.    \- Ignore privacy rules: Yes (checked)

2\. Trigger Alerts general SUCCESS

- Show success notification to user  
-    \- Message: “Your listing has been submitted for review”

3\. Set state of submit listing button to not be clickable again

- Prevent duplicate submissions  
-    \- Button state: disabled \= true

4\. Set states complete… of G: Photos

- Mark photos section as complete  
-    \- complete\_photos \= true

5\. Set states block toggle… of self-listing

- Lock form from further editing  
-    \- block\_editing \= true

6\. Scroll to G: rules/optional settings

- Smooth scroll to final section  
-    \- Show confirmation message

7\. Set states button locked?... of B: Submit Listing

- Permanently lock submit button  
-    \- locked \= true  
8. Terminate this workflow when there are more than 2 listings completed  
9.    Only when: Current User’s Account \- Submission failed’);  
10.   Return response.json();  
11. }

Export async function uploadListingPhoto(listingId: string, file: File, displayOrder: number) {  
  // Upload to Supabase Storage  
  Const fileExt \= [file.name](http://file.name).split(‘.’).pop();  
  Const fileName \= \`${listingId}/${Date.now()}.${fileExt}\`;  
    
  Const { data: uploadData, error: uploadError } \= await supabase.storage  
    .from(‘listing-photos’)  
    .upload(fileName, file);

  If (uploadError) throw uploadError;

  // Get public URL  
  Const { data: { publicUrl } } \= supabase.storage  
    .from(‘listing-photos’)  
    .getPublicUrl(fileName);

  // Create photo record  
  Const { data: photo, error: dbError } \= await supabase  
    .from(‘listing\_photos’)  
    .insert(\[{  
      Listing\_id: listingId,  
      Photo\_url: publicUrl,  
      Display\_order: displayOrder,  
    }\])  
    .select()  
    .single();

  If (dbError) throw dbError;  
  Return photo;  
}  
\`\`\`

4\. Backend API Route (for submission workflow):

\`\`\`typescript  
// /pages/api/listings/[submit.ts](http://submit.ts) or /app/api/listings/submit/[route.ts](http://route.ts)  
Import { createClient } from ‘@supabase/supabase-js’;  
Import { NextApiRequest, NextApiResponse } from ‘next’;

Const supabase \= createClient(  
  process.env.SUPABASE\_URL\!,  
  process.env.SUPABASE\_SERVICE\_ROLE\_KEY\! // Use service role for backend  
);

Export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  If (req.method \!== ‘POST’) {  
    Return res.status(405).json({ error: ‘Method not allowed’ });  
  }

  Const { listingId } \= req.body;

  Try {  
    // 1\. Validate listing data  
    Const { data: listing, error: fetchError } \= await supabase  
      .from(‘listings’)  
      .select(‘\*’)  
      .eq(‘id’, listingId)  
      .single();

    If (fetchError || \!listing) {  
      Return res.status(404).json({ error: ‘Listing not found’ });  
    }

    // 2\. Validate required fields  
    Const requiredFields \= \[‘name’, ‘location\_address’, ‘features\_qty\_bedrooms’,   
                           ‘Features\_qty\_bathrooms’, ‘monthly\_host\_rate’\];  
    Const missingFields \= requiredFields.filter(field \=\> \!listing\[field\]);  
      
    If (missingFields.length \> 0\) {  
      Return res.status(400).json({   
        Error: ‘Missing required fields’,   
        Fields: missingFields   
      });  
    }

    // 3\. Update listing status  
    Const { error: updateError } \= await supabase  
      .from(‘listings’)  
      .update({  
        Complete: true,  
        Temp\_listing\_updated: true,  
        Modified\_date: new Date().toISOString(),  
      })  
      .eq(‘id’, listingId);

    If (updateError) throw updateError;

    // 4\. Send notifications  
    Await sendSubmissionEmail(listing);  
    Await notifyAdminTeam(listing);

    // 5\. Update search index  
    Await updateSearchIndex(listing);

    // 6\. Generate nearby suggestions  
    Await generateNearbySuggestions(listing);

    Return res.status(200).json({   
      Success: true,   
      listingId,  
      Message: ‘Listing submitted successfully’   
    });

  } catch (error) {  
    console.error(‘Submission error:’, error);  
    Return res.status(500).json({ error: ‘Submission failed’ });  
  }  
}

Async function sendSubmissionEmail(listing: any) {  
  // Implement email sending logic  
  // Use services like SendGrid, Resend, or Supabase Edge Functions  
}

Async function notifyAdminTeam(listing: any) {  
  // Send notification to admin team for review  
}

Async function updateSearchIndex(listing: any) {  
  // Update search ranking, add to search index  
  Await supabase  
    .from(‘listings’)  
    .update({   
      Search\_ranking: calculateSearchRanking(listing)   
    })  
    .eq(‘id’, [listing.id](http://listing.id));  
}

Async function generateNearbySuggestions(listing: any) {  
  // Query nearby listings based on location  
  Const { data: nearby } \= await supabase.rpc(‘find\_nearby\_listings’, {  
    Lat: listing.location\_address.coordinates\[1\],  
    Lng: listing.location\_address.coordinates\[0\],  
    Radius\_miles: 5,  
    Limit\_count: 10  
  });

  If (nearby) {  
    Await supabase  
      .from(‘listings’)  
      .update({   
        Nearby\_suggestions\_from: nearby.map((l: any) \=\> [l.id](http://l.id))   
      })  
      .eq(‘id’, [listing.id](http://listing.id));  
  }  
}

Function calculateSearchRanking(listing: any): number {  
  Let score \= 0;  
    
  // Completeness score  
  If ([listing.name](http://listing.name)) score \+= 10;  
  If (listing.location\_address) score \+= 10;  
  If (listing.features\_qty\_bedrooms) score \+= 5;  
  If (listing.monthly\_host\_rate) score \+= 10;  
  // … add more criteria  
    
  Return score;  
}  
\`\`\`

DATA FLOW SUMMARY:  
\==================

1. USER FILLS FORM  Local state updates (React state)  
2. 2\. USER CLICKS “SAVE” → Database upsert (create or update)  
3. 3\. USER CLICKS “NEXT” → Save current section \+ load next section  
4. 4\. USER UPLOADS PHOTOS → File upload to storage \+ create photo records  
5. 5\. USER CLICKS “SUBMIT” →   
6.    \- Frontend: Disable button, show loading  
7.    \- Backend API: Validate, process, update status  
8.    \- Database: Set complete=true, trigger notifications  
9.    \- Return: Success response \+ listing ID  
10. 6\. POST-SUBMISSION →  
11.    \- Email confirmations sent  
12.    \- Admin notified for review  
13.    \- Search index updated  
14.    \- AI suggestions generated (optional)

OPTION SETS IMPLEMENTATION:  
\==================

Instead of hardcoding option sets in the frontend, fetch them from reference tables:

\`\`\`typescript  
// services/[optionSetsService.ts](http://optionSetsService.ts)  
Export async function getKitchenTypes() {  
  Const { data, error } \= await supabase  
    .from(‘kitchen\_type\_enum’)  
    .select(‘\*’);  
  Return data;  
}

Export async function getAmenityOptions() {  
  Const { data, error } \= await supabase  
    .from(‘amenity\_options’)  
    .select(‘\*’)  
    .order(‘category, display\_name’);  
  Return data;  
}

Export async function getHouseRuleOptions() {  
  Const { data, error } \= await supabase  
    .from(‘house\_rule\_options’)  
    .select(‘\*’);  
  Return data;  
}

// Use in component  
Const BasicInfoSection \= () \=\> {  
  Const \[kitchenTypes, setKitchenTypes\] \= useState(\[\]);

  useEffect(() \=\> {  
    getKitchenTypes().then(setKitchenTypes);  
  }, \[\]);

  Return (  
    \<select\>  
      {kitchenTypes.map(type \=\> (  
        \<option key={[type.id](http://type.id)} value={[type.id](http://type.id)}\>  
          {type.display\_name}  
        \</option\>  
      ))}  
    \</select\>  
  );  
};  
\`\`\`

VALIDATION RULES:  
\==================

Implement validation at multiple levels:

1. Frontend Validation (Immediate feedback):  
2. \`\`\`typescript  
3. Const validateBasicInfo \= (data: Partial\<ListingFormData\>) \=\> {  
4.   Const errors: string\[\] \= \[\];  
5.     
6.   If (\![data.name](http://data.name) || [data.name](http://data.name).length \> 35\) {  
7.     errors.push(‘Listing name must be between 1 and 35 characters’);  
8.   }  
9.     
10.   If (\!data.location\_address) {  
11.     errors.push(‘Address is required’);  
12.   }  
13.     
14.   If (\!data.features\_qty\_bedrooms || data.features\_qty\_bedrooms \< 1\) {  
15.     errors.push(‘Number of bedrooms is required’);  
16.   }  
17.     
18.   // … more validations  
19.     
20.   Return errors;  
21. };  
22. \`\`\`

2\. Database Constraints (Enforced by Supabase):

- NOT NULL constraints  
- \- CHECK constraints  
- \- Foreign key constraints  
- \- Unique constraints

3\. Backend Validation (API route):

- Business logic validation  
- \- Cross-field validation  
- \- Authorization checks

REAL-TIME UPDATES (Optional):  
\==================

If you want real-time collaboration or live updates:

\`\`\`typescript  
// Subscribe to listing changes  
useEffect(() \=\> {  
  Const channel \= supabase  
    .channel(‘listing-updates’)  
    .on(‘postgres\_changes’,   
      {   
        Event: ‘UPDATE’,   
        Schema: ‘public’,   
        Table: ‘listings’,  
        Filter: \`id=eq.${listingId}\`   
      },   
      (payload) \=\> {  
        // Update local state with changes  
        setFormData(payload.new);  
      }  
    )  
    .subscribe();

  Return () \=\> {  
    supabase.removeChannel(channel);  
  };  
}, \[listingId\]);  
\`\`\`

TESTING CONSIDERATIONS:  
\==================

1. Unit Tests:  
2.    \- Form validation logic  
3.    \- Data transformation functions  
4.    \- Option set mappings

2\. Integration Tests:

- Database operations (CRUD)  
-    \- File uploads  
-    \- API endpoints

3\. E2E Tests:

- Complete listing creation flow  
-    \- Form navigation  
-    \- Submission process

MIGRATION FROM BUBBLE:  
\==================

If migrating existing data from Bubble:

1. Export Bubble database to JSON/CSV  
2. 2\. Transform data to match Supabase schema:  
3. \`\`\`typescript  
4. Const transformBubbleToSupabase \= (bubbleListing: any) \=\> {  
5.   Return {  
6.     Name: bubbleListing.\_name,  
7.     Location\_address: \`POINT(${bubbleListing.\_location\_lng} ${bubbleListing.\_location\_lat})\`,  
8.     Features\_qty\_bedrooms: bubbleListing.\_features\_qty\_bedrooms,  
9.     // … map all fields  
10.     Created\_date: bubbleListing.Created Date,  
11.     Modified\_date: bubbleListing.Modified Date,  
12.     Creator: mapBubbleUserToSupabaseUser(bubbleListing.Creator),  
13.   };  
14. };  
15. \`\`\`  
16. 3\. Bulk import using Supabase API or SQL  
17. 4\. Migrate files to Supabase Storage  
18. 5\. Update references and IDs

SECURITY CONSIDERATIONS:  
\==================

1. Row Level Security (RLS) Policies:

\`\`\`sql  
– Users can only view their own listings or approved listings  
CREATE POLICY “Users can view own listings”  
ON listings FOR SELECT  
USING (  
  Creator \= auth.uid()   
  OR approved \= true  
);

– Users can only insert listings for themselves  
CREATE POLICY “Users can create own listings”  
ON listings FOR INSERT  
WITH CHECK (creator \= auth.uid());

– Users can only update their own listings  
CREATE POLICY “Users can update own listings”  
ON listings FOR UPDATE  
USING (creator \= auth.uid());

– Admins can do anything  
CREATE POLICY “Admins can do anything”  
ON listings FOR ALL  
USING (  
  EXISTS (  
    SELECT 1 FROM auth.users  
    WHERE id \= auth.uid()  
    AND raw\_user\_meta\_data-\>\>’role’ \= ‘admin’  
  )  
);  
\`\`\`

2. API Authentication:  
3. \- Require authenticated requests  
4. \- Validate JWT tokens  
5. \- Rate limiting

3\. File Upload Security:

- Validate file types  
- \- Limit file sizes  
- \- Scan for malware (optional)

PERFORMANCE OPTIMIZATION:  
\==================

1. Database Indexes (already included above)  
2. Caching:  
3. \`\`\`typescript  
4. // Cache option sets in localStorage or React Query  
5. Const { data: amenities, isLoading } \= useQuery(  
6.   \[‘amenities’\],  
7.   getAmenityOptions,  
8.   { staleTime: 1000 \* 60 \* 60 } // Cache for 1 hour  
9. );  
10. \`\`\`

3\. Lazy Loading:

- Load form sections on demand  
- \- Virtualize long lists (amenities, etc.)

4\. Image Optimization:

- Compress uploads  
- \- Generate thumbnails  
- \- Use CDN

5\. Debouncing:  
\`\`\`typescript  
// Debounce save operations  
Const debouncedSave \= useMemo(  
  () \=\> debounce((data) \=\> saveListing(listingId, data), 1000),  
  \[listingId\]  
);

useEffect(() \=\> {  
  If (formData) {  
    debouncedSave(formData);  
  }  
}, \[formData, debouncedSave\]);  
\`\`\`

ANALYTICS & MONITORING:  
\==================

Track key events:

- Listing creation started  
- \- Section completed  
- \- Listing submitted  
- \- Submission errors  
- \- Time to complete

\`\`\`typescript  
// Example with analytics service  
Const trackEvent \= (eventName: string, properties?: any) \=\> {  
  analytics.track(eventName, {  
    listingId,  
    userId,  
    Timestamp: new Date(),  
    …properties,  
  });  
};

// Usage  
trackEvent(‘listing\_section\_completed’, { section: ‘basic\_info’ });  
t