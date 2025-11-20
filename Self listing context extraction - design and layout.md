SELF-LISTING PAGE \- COMPREHENSIVE CONVERSION GUIDE

═══════════════════════════════════════════════════

OVERVIEW

The Page\_DownPage\_DownPage\_DownPage\_DownSelf-Listing page is a multi-step form interface that guides hosts through the process of submitting their property listings. The page features:

* A multi-section wizard-style interface with step navigation  
* • Progress indication through a visual navigation sidebar  
* • Conditional visibility for different sections based on user progress  
* • Form validation and error handling  
* • Address verification with Google Maps integration  
* • Dynamic form inputs with dropdown menus and text fields

═══════════════════════════════════════════════════

PAGE STRUCTURE & HIERARCHY

Root Container: “G: entire page”  
├─ Header Section: “Header-final A”  
├─ Navigation/Progress Sidebar (Left Side)  
│   ├─ Informational Text (Info modal trigger)  
│   ├─ Section Navigation Items:  
│   │   ├─ Lease Styles (with icon)  
│   │   ├─ Pricing (with icon)  
│   │   ├─ Rules (with icon)  
│   │   ├─ Photos (with icon)  
│   │   └─ Reviews and Optional (with icon)  
├─ Main Content Area: “G: All the Sections”  
│   ├─ Section: “G: space snapshot \- address”  
│   │   ├─ Header: “Space Snapshot”  
│   │   ├─ Subtitle: “Let’s start with the basics about your space”  
│   │   ├─ Info Alert (Address verification notice)  
│   │   ├─ Form Group: “Group Listing”  
│   │   │   ├─ Input: Listing Name\* (text, 35 char max)  
│   │   │   ├─ Row 1:  
│   │   │   │   ├─ Dropdown: Type of Space\*  
│   │   │   │   └─ Input: Bedrooms\* (number)  
│   │   │   ├─ Row 2:  
│   │   │   │   ├─ Dropdown: Type of Kitchen\*  
│   │   │   │   └─ Input: Beds (number)  
│   │   │   ├─ Row 3:  
│   │   │   │   ├─ Dropdown: Type of Parking\*  
│   │   │   │   └─ Input: Bathrooms\* (number, allows decimals like 2.5)  
│   │   │   └─ Address Section: “G: Address”  
│   │   │       ├─ Label: “Listing Address\* (private and will not be shared)”  
│   │   │       ├─ Input: Address field (123 Main St.)  
│   │   │       ├─ Error Message (conditional display)  
│   │   │       ├─ Address Confirmation Message  
│   │   │       ├─ Address Detail Inputs:  
│   │   │       │   ├─ Input: Number  
│   │   │       │   ├─ Input: Street Name  
│   │   │       │   ├─ Dropdown: State\*  
│   │   │       │   ├─ Input: City  
│   │   │       │   └─ Input: Zip  
│   │   │       └─ Neighborhood Section  
│   │   │           ├─ Label: “Neighborhood”  
│   │   │           ├─ Info: “These neighborhoods are identified based on the ZIP code you provided for your address”  
│   │   │           └─ Dropdown: Select a neighborhood  
│   ├─ Section: Details (T: Details)  
│   ├─ Section: Block Name 1 (T: Block Name 1\)  
│   ├─ \[Additional sections for Lease Styles, Pricing, Rules, Photos, Reviews\]  
├─ Footer/Navigation Buttons  
│   ├─ Button: Back (conditional visibility)  
│   └─ Button: Next/Continue  
└─ Overlays Layer  
    ├─ Error Popup: “\*P: Error Section 2 Feat…”  
    ├─ Error Popup: “\*P: Error Section 3 Style”  
    ├─ Error Popup: “\*P: Error Section 4 Pricing”  
    ├─ Error Popup: “\*P: Error Section 5 Rules”  
    ├─ Error Popup: “\*P: Additional Host R…”  
    ├─ Modal: “GF: Address Missing”  
    ├─ Error Popup: “\*P: Error Section 1 A…”  
    └─ Informational Modal (Info text display)

═══════════════════════════════════════════════════

SECTION 1: SPACE SNAPSHOT \- DETAILED SPECIFICATIONS

Layout Type: Column (Vertical Stack)  
Data Source: Current page’s Listing  
Background: White (\#FFFFFF)  
Border: 1px solid \#6B6B6B (visible when This Group is visible)

Child Elements:

1. Section Title  
2.    • Element: Text “Space Snapshot”  
3.    • Style: Large, bold heading  
4.    • Font: Black (\#000000)

2\. Subtitle

* Element: Text “Let’s start with the basics about your space”  
*    • Style: Regular body text

3\. Information Alert

* Element: Info icon \+ Text  
*    • Content: “We will check to see if the automatic system can verify the address and, if not, ask you to confirm the address in more detail.”  
*    • Style: Light blue background (\#E3F2FD or similar)  
*    • Icon: Info circle (left-aligned)

4\. Listing Name Input

* Label: “Listing Name\*”  
*    • Element: Text input  
*    • Placeholder: “Listing Name (35 character max)”  
*    • Validation: Required, Max 35 characters  
*    • Width: 100% of container  
*    • Border: Standard input border  
5. Property Details Row 1 (Two Columns)  
6.    Left Column:  
7.    • Label: “Type of Space\*”  
8.    • Element: Dropdown select  
9.    • Placeholder: “Choose an option…”  
10.    • Options: \[Needs API/data source\]  
11.    • Validation: Required  
12.      
13.    Right Column:  
14.    • Label: “Bedrooms\*”  
15.    • Element: Number input  
16.    • Default: 2  
17.    • Validation: Required  
18.    • Width: Fixed

6\. Property Details Row 2 (Two Columns)  
   Left Column:

* Label: “Type of Kitchen\*”  
*    • Element: Dropdown select  
*    • Placeholder: “Choose an option…”  
*    • Validation: Required  
*      
*    Right Column:  
*    • Label: “Beds”  
*    • Element: Number input  
*    • Default: 2

7\. Property Details Row 3 (Two Columns)  
   Left Column:

* Label: “Type of Parking\*”  
*    • Element: Dropdown select  
*    • Placeholder: “Choose an option…”  
*    • Validation: Required  
*      
*    Right Column:  
*    • Label: “Bathrooms\*”  
*    • Element: Number input (decimal support)  
*    • Default: 2.5  
*    • Validation: Required  
*    • Allows: .5 increments (1, 1.5, 2, 2.5, etc.)

8\. Address Section (Group Listing)

* Layout: Column  
*    • Width: 100%  
*    • Background: White (\#FFFFFF)  
*    • Data Source: Parent group’s Listing  
1. Address Input Header  
2.       • Label: “Listing Address\* (private and will not be shared)”  
3.       • Element: Text input  
4.       • Placeholder: “123 Main St.”  
5.       • Width: 100%  
6.       • Integration: Google Maps API for address verification

   B. Error Message (Conditional Display)

* Background: Light red (\#FFEBEE)  
*       • Icon: Error/warning icon (red)  
*       • Text: “This address cannot be located using Google Maps. Nevertheless, we will use it for processing. If you have any concerns, please contact our support team.”  
*       • Display Condition: When address validation fails

   C. Confirmation Message

* Icon: Info icon  
*       • Text: “Please confirm your address”  
*       • Style: Neutral/info styling

   D. Address Detail Inputs (Two Columns)  
      Row 1:

* Left: “Number” (text input)  
*       • Right: “Street Name” (text input)  
*         
*       Row 2:  
*       • Left: “City” (text input with dropdown suggestion)  
*       • Right: “State\*” (dropdown select, required)  
*         
*       Row 3:  
*       • Left: “Zip” (text input)

   E. Neighborhood Section

* Label: “Neighborhood”  
*       • Info Text: “These neighborhoods are identified based on the ZIP code you provided for your address”  
*       • Element: Dropdown select  
*       • Placeholder: “Select a neighborhood”  
*       • Options: Dynamically populated based on ZIP code  
*       • Style: Full width

═══════════════════════════════════════════════════

NAVIGATION SIDEBAR SPECIFICATIONS

Position: Fixed left side of page (approximately 300px width)  
Background: White with subtle shadow  
Layout: Vertical list

Navigation Items Structure:  
Each item consists of:

1. Icon (colored, custom icons for each section)  
2.    • Lease Styles: Document/paper icon (teal/purple gradient)  
3.    • Pricing: Dollar/pricing icon (green)  
4.    • Rules: Checklist icon (teal)  
5.    • Photos: Camera icon (purple/pink)  
6.    • Reviews and Optional: Star icon (purple)

2\. Label Text

* Font: Medium weight, 14-16px  
*    • Color: Dark gray (\#333333) for active/completed  
*    • Color: Light gray (\#999999) for incomplete

Visual States:

* Default: Gray text, outlined icon  
* • Active/Current: Bold text, colored icon, possible highlight background  
* • Completed: Checkmark indicator  
* • Locked/Unavailable: Grayed out, not clickable

Behavior:

* Click to navigate to section (if unlocked)  
* • Visual feedback on hover (if clickable)  
* • Scroll spy: Highlights current section as user scrolls

═══════════════════════════════════════════════════

CONDITIONALS & VISIBILITY LOGIC

1. Section Visibility  
2.    Conditional: Display section based on custom state or page progress  
3.    Logic: Show “G: space snapshot \- address” when user is on step 1  
4.    Implementation: Use state management (currentStep \=== 1\)

2\. Address Error Message  
   Conditional: Display when address validation fails  
   Logic: IF Google Maps API returns no results OR validation \=== false  
   Visual: Show error container with red background

3\. Address Confirmation  
   Conditional: Display when address needs manual confirmation  
   Logic: IF address found BUT needs user confirmation  
   Visual: Show confirmation message and detail inputs

4\. Back Button  
   Conditional: Hide on first section  
   Logic: IF currentStep \> 1, show back button  
   Position: Bottom left of form

5. Next Button  
6.    Conditional: Change label on last section  
7.    Logic: IF currentStep \< totalSteps, label \= “Next”  
8.           ELSE label \= “Submit” or “Complete”  
9.    Validation: Disabled if required fields are empty  
10.    Position: Bottom right of form

6\. Progress Indicator  
   Conditional: Update completion percentage  
   Logic: (currentStep / totalSteps) \* 100  
   Visual: Progress bar or step indicator

7\. Navigation Items  
   Conditional: Lock future sections until current section is complete  
   Logic: FOR each section, IF sectionIndex \> currentStep, add “locked” class  
   Visual: Gray out and disable click

═══════════════════════════════════════════════════

WORKFLOWS & INTERACTIONS

Key Workflows:

1. Page Load Workflow  
2.    Trigger: Page is loaded  
3.    Actions:  
4.    a) Initialize form with existing data (if editing)  
5.    b) Set currentStep \= 1 (or saved progress)  
6.    c) Load dropdown options from database  
7.    d) Set up address autocomplete  
8.    e) Show appropriate section

2\. Address Input Workflow  
   Trigger: User types in address field  
   Actions:

1) Debounce input (wait 300ms after typing stops)  
2)    b) Call Google Maps Autocomplete API  
3)    c) Display address suggestions  
4)    d) User selects address from suggestions  
5)    e) Auto-fill Number, Street, City, State, Zip  
6)    f) Validate address with Google Maps Geocoding API  
7)    g) IF valid: Show confirmation message  
8)    h) IF invalid: Show error message \+ manual input fields

3\. Next Button Click Workflow  
   Trigger: User clicks “Next” button  
   Actions:

1) Validate all required fields in current section  
2)    b) IF validation fails:  
3)       \- Show error messages below invalid fields  
4)       \- Scroll to first error  
5)       \- Display error popup overlay  
6)       \- Prevent navigation  
7)    c) IF validation succeeds:  
8)       \- Save form data to database  
9)       \- Increment currentStep by 1  
10)       \- Hide current section  
11)       \- Show next section  
12)       \- Update progress indicator  
13)       \- Scroll to top of form  
14)       \- Update URL parameter (optional)

4\. Back Button Click Workflow  
   Trigger: User clicks “Back” button  
   Actions:

1) Decrement currentStep by 1  
2)    b) Hide current section  
3)    c) Show previous section  
4)    d) Update progress indicator  
5)    e) Scroll to top of form  
6)    f) Pre-fill with saved data

5\. Navigation Sidebar Click Workflow  
   Trigger: User clicks on a section in sidebar  
   Conditions: Section must be unlocked  
   Actions:

1) Validate current section (if navigating forward)  
2)    b) IF validated OR navigating backward:  
3)       \- Save current form data  
4)       \- Set currentStep to clicked section  
5)       \- Show appropriate section  
6)       \- Update progress indicator  
7)    c) IF not validated:  
8)       \- Show validation errors  
9)       \- Prevent navigation

6\. Dropdown Change Workflow  
   Trigger: User selects option from dropdown  
   Actions:

1) Update form value  
2)    b) Trigger dependent field updates (if any)  
3)    c) Clear validation error (if present)  
4)    d) Auto-save (optional, with debounce)

7\. ZIP Code Change Workflow  
   Trigger: User enters or changes ZIP code  
   Actions:

1) Validate ZIP code format  
2)    b) Call API to fetch neighborhoods for ZIP  
3)    c) Populate Neighborhood dropdown with results  
4)    d) IF no neighborhoods found, hide dropdown or show message

8\. Form Auto-save Workflow  
   Trigger: User stops typing for 2-3 seconds  
   Actions:

1) Collect all form values  
2)    b) Send AJAX request to save as draft  
3)    c) Show “Saved” indicator briefly  
4)    d) Update last saved timestamp

9\. Information Icon Click Workflow  
   Trigger: User clicks info icon  
   Actions:

1) Display modal/popup with informational text  
2)    b) Overlay background with semi-transparent backdrop  
3)    c) Center modal on screen  
4)    d) Add close button (X) and ESC key listener  
5)    e) Close modal on backdrop click or close button click

10\. Error Popup Display Workflow  
    Trigger: Validation fails on section attempt  
    Actions:

1) Create error summary from failed validations  
2)     b) Display popup overlay  
3)     c) List all errors with section references  
4)     d) Provide “Go to Error” links for each  
5)     e) Close popup manually or after fixing errors

═══════════════════════════════════════════════════

STYLING & DESIGN SPECIFICATIONS

Typography:

* Headings (Section Titles):   
*   \- Font: Arial/Sans-serif, Bold  
*   \- Size: 24-28px  
*   \- Color: \#000000  
*   \- Margin: 0 0 16px 0  
* Labels:  
*   \- Font: Arial/Sans-serif, Medium  
*   \- Size: 14px  
*   \- Color: \#333333  
*   \- Margin: 0 0 8px 0  
*   \- Required indicator: Red asterisk \*  
* Body Text:  
*   \- Font: Arial/Sans-serif, Regular  
*   \- Size: 14px  
*   \- Color: \#666666  
*   \- Line Height: 1.5  
* Placeholder Text:  
*   \- Color: \#999999  
*   \- Font-style: italic (optional)

Form Inputs:

* Text Inputs:  
*   \- Height: 40px  
*   \- Padding: 10px 12px  
*   \- Border: 1px solid \#CCCCCC  
*   \- Border-radius: 4px  
*   \- Background: \#FFFFFF  
*   \- Font-size: 14px  
*   \- Focus state: Border color \#4A90E2, box-shadow  
* Dropdowns:  
*   \- Height: 40px  
*   \- Padding: 10px 12px  
*   \- Border: 1px solid \#CCCCCC  
*   \- Border-radius: 4px  
*   \- Background: \#FFFFFF with dropdown arrow icon  
*   \- Font-size: 14px  
* Number Inputs:  
*   \- Same as text inputs  
*   \- Width: Usually smaller (80-120px)  
*   \- Spinner controls (optional)

Buttons:

* Primary Button (Next/Submit):  
*   \- Background: \#6B46C1 (purple) or brand color  
*   \- Color: \#FFFFFF  
*   \- Padding: 12px 32px  
*   \- Border-radius: 4px  
*   \- Border: none  
*   \- Font-size: 16px  
*   \- Font-weight: Bold  
*   \- Hover: Darken background by 10%  
*   \- Disabled: Background \#CCCCCC, cursor not-allowed  
* Secondary Button (Back):  
*   \- Background: Transparent or \#F5F5F5  
*   \- Color: \#666666  
*   \- Border: 1px solid \#CCCCCC  
*   \- Same dimensions as primary  
*   \- Hover: Background \#E5E5E5

Layout Spacing:

* Section padding: 32px  
* • Input margin-bottom: 20px  
* • Row gap (between form rows): 16px  
* • Column gap: 16px

Alert/Info Boxes:

* Info Alert:  
*   \- Background: \#E3F2FD (light blue)  
*   \- Border: 1px solid \#90CAF9  
*   \- Border-radius: 4px  
*   \- Padding: 12px 16px  
*   \- Icon: Left-aligned, 20px, color \#2196F3  
* Error Alert:  
*   \- Background: \#FFEBEE (light red)  
*   \- Border: 1px solid \#EF9A9A  
*   \- Border-radius: 4px  
*   \- Padding: 12px 16px  
*   \- Icon: Left-aligned, 20px, color \#F44336

Responsive Considerations:

* Mobile (\< 768px):  
*   \- Stack two-column layouts to single column  
*   \- Full-width inputs  
*   \- Hide or collapse sidebar navigation  
*   \- Use hamburger menu or tabs for sections  
*     
* • Tablet (768px \- 1024px):  
*   \- Reduce sidebar width  
*   \- Maintain two-column form layouts  
*     
* • Desktop (\> 1024px):  
*   \- Full sidebar visible  
*   \- Optimal spacing and sizing

═══════════════════════════════════════════════════

DATA STRUCTURE & STATE MANAGEMENT

Form State Object:  
{  
  currentStep: 1,  
  listingId: “uuid-string”,  
  formData: {  
    spaceSnapshot: {  
      listingName: “”,  
      typeOfSpace: “”,  
      Bedrooms: 2,  
      typeOfKitchen: “”,  
      Beds: 2,  
      typeOfParking: “”,  
      Bathrooms: 2.5,  
      Address: {  
        fullAddress: “”,  
        Number: “”,  
        Street: “”,  
        City: “”,  
        State: “”,  
        Zip: “”,  
        Neighborhood: “”,  
        Validated: false,  
        Latitude: null,  
        Longitude: null  
      }  
    },  
    leaseStyles: {  
      // Section 2 data  
    },  
    Pricing: {  
      // Section 3 data  
    },  
    Rules: {  
      // Section 4 data  
    },  
    Photos: {  
      // Section 5 data  
    },  
    Reviews: {  
      // Section 6 data  
    }  
  },  
  validationErrors: {},  
  sectionCompletionStatus: {  
    spaceSnapshot: false,  
    leaseStyles: false,  
    Pricing: false,  
    Rules: false,  
    Photos: false,  
    Reviews: false  
  }  
}

Validation Rules:

* Listing Name: Required, Max 35 characters  
* • Type of Space: Required  
* • Bedrooms: Required, Number, Min 0  
* • Type of Kitchen: Required  
* • Bathrooms: Required, Number, Min 0, Allows 0.5 increments  
* • Address: Required, Must attempt validation  
* • State: Required

═══════════════════════════════════════════════════

API INTEGRATIONS

1. Google Maps Autocomplete API  
2.    Endpoint: Google Places Autocomplete  
3.    Purpose: Provide address suggestions as user types  
4.    Implementation:  
5.    \- Initialize autocomplete on address input field  
6.    \- Restrict to address types  
7.    \- Handle selection to populate fields

2\. Google Maps Geocoding API  
   Endpoint: Google Geocoding API  
   Purpose: Validate and get coordinates for address  
   Request: Send full address string  
   Response: 

- IF found: Return lat/lng, formatted address components  
-    \- IF not found: Return er

