═══════════════════════════════════════════════════════════════════════

SELF-LISTING PAGE \- WORKFLOWS COMPREHENSIVE GUIDE  
BUBBLE TO CODE CONVERSION DOCUMENTATION

═══════════════════════════════════════════════════════════════════════

DOCUMENT PURPOSE:  
This comprehensive guide analyzes all 124 workflows in the self-listing page of the Bubble application, documenting their triggers, execution steps, custom events, backend API workflows, and providing detailed instructions for converting this Bubble logic into traditional code.

═══════════════════════════════════════════════════════════════════════

TABLE OF CONTENTS:

1. Workflow Architecture Overview  
2. 2\. Workflow Categories & Organization    
3. 3\. Detailed Workflow Documentation  
4. 4\. Custom Events System  
5. 5\. Backend API Workflows  
6. 6\. State Management  
7. 7\. Code Conversion Strategy  
8. 8\. Implementation Roadmap

═══════════════════════════════════════════════════════════════════════

SECTION 1: WORKFLOW ARCHITECTURE OVERVIEW

═══════════════════════════════════════════════════════════════════════

TOTAL WORKFLOWS: 124

The self-listing page orchestrates a complex multi-step form for hosts to create property listings. The workflow system is organized into functional categories that handle:

- User interactions (clicks, selections, inputs)  
- \- State management (custom states for UI control)  
- \- Data validation and error handling    
- \- Multi-section navigation  
- \- Database operations (creating/updating listings)  
- \- Backend API scheduling    
- \- Dynamic UI updates (show/hide elements)  
- \- Custom event triggering for reusable logic

KEY ARCHITECTURAL PATTERNS:

1. STATE-DRIVEN UI: Heavy use of custom states to control UI visibility and behavior  
2. 2\. EVENT-DRIVEN FLOW: Custom events act as reusable workflow modules  
3. 3\. SECTION-BASED PROGRESSION: Multi-step form with validation gates  
4. 4\. ERROR HANDLING: Dedicated error workflows for each section  
5. 5\. ASYNC OPERATIONS: Backend API workflows for heavy processing  
6. 6\. CONDITIONAL LOGIC: Extensive use of “Only when” conditions

═══════════════════════════════════════════════════════════════════════

SECTION 2: WORKFLOW CATEGORIES & ORGANIZATION

═══════════════════════════════════════════════════════════════════════

CATEGORY BREAKDOWN:

1. UNCATEGORIZED (11 workflows)  
2.    \- G: Monthly Rental is clicked  
3.    \- G: Nightly is clicked    
4.    \- G: Weekly Rental is clicked  
5.    \- JS2B: cummulative list event  
6.    \- JS2B: Prices event  
7.    \- JS2B: Prices nightly list event  
8.    \- Page is loaded  
9.    \- T: handoff mobile is clicked  
10.    \- T: maintenance label monthly is clicked  
11.    \- T: maintenance label nightly is clicked  
12.    \- T: Damage Deposit is clicked

2\. AI SUGGESTIONS (3 workflows)

- B: Accept AI Suggestion… (Disabled)  
-    \- B: Accept All AI Suggest… (Disabled)  
-    \- B: Ignore AI Suggestion… (Disabled)

3\. BACK BUTTON (5 workflows)

- B: Pricing Back is clicked \- Revert…

4\. CUSTOM EVENTS (14 workflows) \*\*\*CRITICAL\*\*\*

- Alerts general  
-    \- error handling section 1  
-    \- error handling section 2  
-    \- error handling section 3  
-    \- error handling section 5  
-    \- error-starting nightly-price  
-    \- proceed from section 1  
-    \- proceed from section 1 … (Disabled)  
-    \- proceed from section 2  
-    \- proceed from section 2 … (Disabled)  
-    \- proceed from section 3  
-    \- proceed from section 4 (Disabled)  
-    \- proceed from section 5  
-    \- Save Pricing

5\. DISABLED (1 workflow)

6\. DO WHEN CONDITIONS (6 workflows)

- Conditional workflows that execute when specific conditions are met

7\. HIDE ELEMENTS (10 workflows)

- Control visibility of UI components

8\. INFORMATIONAL TEXT (15 workflows)

- Dynamic text updates and messaging

9\. IONIC CHECKBOX (8 workflows)

- Checkbox interaction handlers

10\. LISTING (8 workflows)

- Core listing data manipulation

11\. LISTING FEATURES (8 workflows)

- Property features/amenities handling

12\. LISTING PHOTO (4 workflows)

- Image upload and management  
13. LISTING POLICY (1 workflow)  
14.     \- House rules and policies

14\. LISTING-ADDRESS (2 workflows)

- Address input and validation  
15. NAVIGATION (1 workflow)  
16.     \- Page navigation control

16\. NEXT BUTTONS (7 workflows)

- Section progression handlers  
17. ON PAGE LOAD (1 workflow)  
18.     \- Initial page setup

18\. RENTAL TYPE (1 workflow)

- Rental type selection  
19. SHOW ELEMENTS (11 workflows)  
20.     \- Display UI components

20\. SYSTEM (1 workflow)

- System-level operations  
21. TABS CLICKED (6 workflows)  
22.     \- Tab navigation handlers

═══════════════════════════════════════════════════════════════════════

SECTION 3: DETAILED WORKFLOW DOCUMENTATION

═══════════════════════════════════════════════════════════════════════

WORKFLOW GROUP 1: RENTAL TYPE SELECTION  
───────────────────────────────────────────────────────────────────────

WORKFLOW: G: Monthly Rental is clicked  
─────────────────────────────────────  
TRIGGER: Element “G: Monthly Rental” is clicked  
EXECUTION ORDER: Sequential

STEP 1: Set states rental selected… of G: three rental styles

- Action: Set State  
-   \- Element: G: three rental styles  
-   \- Custom State: “rental selected”    
-   \- Value: “Monthly”  
-   \- Purpose: Store user’s rental type selection

STEP 2: Set state Trigger recalc of Host Schedule Selector

- Action: Set State    
-   \- Element: Host Schedule Selector  
-   \- Custom State: “Trigger recalc”  
-   \- Value: “yes”  
-   \- Secondary State: “Selected Nights”  
-   \- Secondary Value: “All Nights”  
-   \- Purpose: Trigger recalculation in the schedule selector component

STEP 3: Make changes to Listing…

- Action: Make changes to a thing  
-   \- Thing to change: Parent group’s Listing  
-   \- Fields to change:  
-     \* rental type \= “Monthly”  
-     \* Weeks offered \= “Every week”  
-   \- Purpose: Persist rental type selection to database

CHRONOLOGICAL FLOW:

1. User clicks “Monthly Rental” button  
2. 2\. UI state updates immediately (rental selected \= “Monthly”)  
3. 3\. Schedule selector component is notified to recalculate    
4. 4\. Database record is updated with rental type  
5. 5\. UI reflects new state

CODE CONVERSION NOTES:

- Replace custom states with component state (React/Vue) or observables (RxJS)  
- \- Database update should be async with loading state  
- \- Schedule selector should watch for state changes using props/events  
- \- Add error handling for database operations

───────────────────────────────────────────────────────────────────────

WORKFLOW: G: Nightly is clicked    
─────────────────────────────────  
TRIGGER: Element “G: Nightly” is clicked  
EXECUTION ORDER: Sequential

Similar structure to Monthly Rental workflow, but sets:

- Rental selected \= “Nightly”  
- \- rental type \= “Nightly”    
- \- Different calculation logic for nightly rates

───────────────────────────────────────────────────────────────────────

WORKFLOW: G: Weekly Rental is clicked  
─────────────────────────────────  
TRIGGER: Element “G: Weekly Rental” is clicked    
EXECUTION ORDER: Sequential

Similar structure, sets:

- Rental selected \= “Weekly”  
- \- rental type \= “Weekly”

═══════════════════════════════════════════════════════════════════════

WORKFLOW GROUP 2: PAGE INITIALIZATION  
───────────────────────────────────────────────────────────────────────

WORKFLOW: Page is loaded  
─────────────────────────────────  
TRIGGER: Page is loaded (runs once when page first loads)  
EXECUTION ORDER: Sequential

STEP 1: Run Javascript

- Action: Run Javascript  
-   \- Script: Custom JavaScript for data injection  
-   \- Purpose: Initialize pricing widgets with database values  
-     
-   JavaScript Logic:  
-   \`\`\`javascript  
-   // Wait for widget to be available, then trigger reload with fresh data  
-   setTimeout(function() {  
-     Var widget \= document.getElementById(‘sl-price-widget’);  
-       
-     If (widget) {  
-       console.log(“=== BUBBLE WORKFLOW: Injecting fresh data \===”);  
-         
-       // Inject the database values  
-       widget.setAttribute(‘data-n2’, ‘Current page’s Listing’s Nightly Host Rate for 2 nights’);  
-       widget.setAttribute(‘data-n3’, ‘Current page’s Listing’s Nightly Host Rate for 3 nights’);  
-       widget.setAttribute(‘data-n4’, ‘Current page’s Listing’s Nightly Host Rate for 4 nights’);  
-       widget.setAttribute(‘data-n5’, ‘Current page’s Listing’s Nightly Host Rate for 5 nights’);  
-         
-       console.log(‘Data injected:’, {  
-         N2: widget.dataset.n2,  
-         N3: widget.dataset.n3,  
-         N4: widget.dataset.n4,  
-         N5: widget.dataset.n5  
-       });  
-         
-       // Trigger the widget to reload with new data  
-       widget.dispatchEvent(new Event(‘bubble-data-ready’));  
-       console.log(‘Triggered bubble-data-ready event’);  
-     } else {  
-       console.error(‘Price widget element not found\!’);  
-     }  
-   }, 0);  
-   \`\`\`

CHRONOLOGICAL FLOW:

1. Page loads  
2. 2\. JavaScript executes immediately    
3. 3\. Waits for DOM element with ID ‘sl-price-widget’  
4. 4\. Injects pricing data from database into widget attributes  
5. 5\. Dispatches custom event to notify widget of new data

CODE CONVERSION NOTES:

- Replace with useEffect (React) or mounted (Vue) lifecycle hook  
- \- Use proper data binding instead of DOM manipulation  
- \- Consider state management library (Redux, Vuex) for centralized data  
- \- Implement proper loading states while fetching initial data

═══════════════════════════════════════════════════════════════════════

SECTION 4: CUSTOM EVENTS SYSTEM (REUSABLE WORKFLOWS)

═══════════════════════════════════════════════════════════════════════

Custom events in Bubble are reusable workflows that can be triggered from multiple places. They act like functions that can be called with parameters.

CUSTOM EVENT: proceed from section 1  
─────────────────────────────────  
TYPE: Custom Event (Reusable Workflow)  
PARAMETERS: None defined  
CAN BE TRIGGERED FROM: Any workflow using “Trigger a custom event”

PURPOSE: Handle progression from Section 1 (Basic Details) to Section 2 (Features)

STEP 1: Set current block to features

- Action: Set State  
-   \- Purpose: Update UI to show Section 2

STEP 2: Set state listing details completed  

- Action: Set State  
-   \- Purpose: Mark Section 1 as complete for progress tracking

STEP 3: Schedule API Workflow 12-listing-saving-address

- Action: Schedule API Workflow (Backend)  
-   \- Workflow: “12-listing-saving-address”  
-   \- Purpose: Async save of address data to database  
-   \- Runs on: Backend server  
-   \- Note: This is a BACKEND WORKFLOW (see Section 5\)

STEP 4: Trigger create description template from load-templates-listing

- Action: Trigger a custom event    
-   \- Event: “create description template”  
-   \- Source: load-templates-listing element  
-   \- Purpose: START CREATING TEMPLATE, preprocess  
-   \- Note: This triggers ANOTHER custom event in a different element

STEP 5: reset current section error count back to 0

- Action: Set State  
-   \- Custom State: “current section error count”    
-   \- Value: 0  
-   \- Purpose: Clear any previous error counts

CHRONOLOGICAL FLOW:

1. Validation passes in Section 1  
2. 2\. “Proceed from section 1” custom event is triggered  
3. 3\. UI updates to show Features section  
4. 4\. Section 1 marked as completed  
5. 5\. Backend API workflow scheduled (async operation)  
6. 6\. Template creation workflow triggered    
7. 7\. Error counter reset  
8. 8\. User now sees Section 2

CODE CONVERSION NOTES:

- Convert to async function/method  
- \- Use Promise.all() for parallel operations where applicable    
- \- Implement proper error handling with try-catch  
- \- Use event bus or context for cross-component communication  
- \- Backend API call should be RESTful endpoint or GraphQL mutation

EXAMPLE CODE STRUCTURE (React):  
\`\`\`javascript  
Async function proceedFromSection1() {  
  Try {  
    // Update UI state  
    setCurrentBlock(‘features’);  
    setListingDetailsCompleted(true);  
      
    // Schedule backend workflow (API call)  
    Const addressSavePromise \= api.scheduleWorkflow(‘12-listing-saving-address’, {  
      listingId: [currentListing.id](http://currentListing.id)  
    });  
      
    // Trigger template creation    
    Const templatePromise \= triggerEvent(‘create-description-template’);  
      
    // Wait for both to complete  
    Await Promise.all(\[addressSavePromise, templatePromise\]);  
      
    // Reset error count  
    setErrorCount(0);  
      
    // Navigate to next section  
    scrollToSection(‘features’);  
  } catch (error) {  
    console.error(‘Error proceeding from section 1:’, error);  
    showErrorMessage(‘Failed to save data. Please try again.’);  
  }  
}  
\`\`\`

───────────────────────────────────────────────────────────────────────

CUSTOM EVENT: error handling section 1  
─────────────────────────────────  
TYPE: Custom Event (Error Handler)  
PARAMETERS: 

- Title (text, required)  
-   \- content (text, optional)    
-   \- time (ms) (number, optional)  
-   \- alert type (Alert Type, optional)  
-   \- Show on Live? (yes/no, optional)

PURPOSE: Display error messages and handle validation failures in Section 1

STEPS: (Would include showing error toasts, updating error counters, highlighting invalid fields)

CODE CONVERSION NOTES:

- Convert to error handling service/utility  
- \- Use toast notification library (react-toastify, vue-toastification)  
- \- Implement form validation library (Formik, VeeValidate)  
- \- Centralize error messages in constants file

───────────────────────────────────────────────────────────────────────

CUSTOM EVENT: Save Pricing    
─────────────────────────────────  
TYPE: Custom Event (Data Persistence)  
PURPOSE: Save all pricing information to the database

This would include steps for:

- Validating pricing inputs  
- \- Calculating derived values  
- \- Updating database records    
- \- Showing success/error messages  
- \- Potentially scheduling backend calculations

CODE CONVERSION NOTES:

- Create dedicated API endpoint for pricing updates  
- \- Implement optimistic updates for better UX  
- \- Add debouncing for real-time price calculations  
- \- Use transaction if multiple related records need updating

═══════════════════════════════════════════════════════════════════════

SECTION 5: BACKEND API WORKFLOWS

═══════════════════════════════════════════════════════════════════════

Backend API workflows in Bubble run on the server side and can be scheduled to run immediately or at a specific time. They’re used for:

- Heavy computations    
- \- Long-running processes  
- \- Operations requiring elevated permissions  
- \- Async data processing

IDENTIFIED BACKEND WORKFLOWS:

1. 12-listing-saving-address  
2.    \- Triggered from: proceed from section 1  
3.    \- Purpose: Save/validate address data  
4.    \- Runs: Asynchronously on backend  
5.      
6.    CODE CONVERSION:  
7.    Create REST endpoint: POST /api/listings/{id}/address  
8.    \- Validate address format  
9.    \- Geocode address (if needed)  
10.    \- Update listing record    
11.    \- Return success/error response

2\. (Additional backend workflows would be identified by examining Schedule API Workflow actions)

BACKEND WORKFLOW PATTERN:  
\`\`\`javascript  
// Backend API endpoint structure  
[app.post](http://app.post)(‘/api/workflows/listing-saving-address’, async (req, res) \=\> {  
  Try {  
    Const { listingId, addressData } \= req.body;  
      
    // Validate inputs  
    If (\!listingId || \!addressData) {  
      Return res.status(400).json({ error: ‘Missing required fields’ });  
    }  
      
    // Perform operation  
    Const result \= await saveListingAddress(listingId, addressData);  
      
    // Return response  
    res.json({ success: true, data: result });  
  } catch (error) {  
    console.error(‘Error in listing-saving-address workflow:’, error);  
    res.status(500).json({ error: ‘Internal server error’ });  
  }  
});  
\`\`\`

═══════════════════════════════════════════════════════════════════════

SECTION 6: STATE MANAGEMENT

═══════════════════════════════════════════════════════════════════════

The self-listing page uses extensive custom state management for UI control. Here are the key states identified:

STATE TRACKING:

1. Rental selected (on “G: three rental styles”)  
2.    \- Values: “Monthly” | “Nightly” | “Weekly”  
3.    \- Purpose: Track selected rental type  
4.    \- Used by: Multiple workflows for conditional logic

2\. Trigger recalc (on “Host Schedule Selector”)  

- Values: “yes” | null  
-    \- Purpose: Signal schedule selector to recalculate  
-    \- Pattern: Set to “yes” to trigger, component resets after processing

3\. Selected Nights (on “Host Schedule Selector”)

- Values: “All Nights” | custom selection  
-    \- Purpose: Track which nights are selected in calendar

4\. Listing details completed

- Type: Boolean  
-    \- Purpose: Track section 1 completion status  
5. Current block    
6.    \- Values: “details” | “features” | “photos” | “pricing” | “review”  
7.    \- Purpose: Control which section is currently visible

6\. Current section error count

- Type: Number  
-    \- Purpose: Track validation errors in current section

CODE CONVERSION \- STATE MANAGEMENT STRATEGY:

OPTION 1: Component State (Simple apps)  
\`\`\`javascript  
// React example  
Const \[rentalType, setRentalType\] \= useState(‘Monthly’);  
Const \[currentBlock, setCurrentBlock\] \= useState(‘details’);  
Const \[errorCount, setErrorCount\] \= useState(0);  
\`\`\`

OPTION 2: Context API (Medium complexity)  
\`\`\`javascript  
// React Context  
Const ListingContext \= createContext();

Const ListingProvider \= ({ children }) \=\> {  
  Const \[state, setState\] \= useState({  
    rentalType: ‘Monthly’,  
    currentBlock: ‘details’,    
    errorCount: 0,  
    completedSections: \[\]  
  });  
    
  Return (  
    \<ListingContext.Provider value={{ state, setState }}\>  
      {children}  
    \</ListingContext.Provider\>  
  );  
};  
\`\`\`

OPTION 3: State Management Library (Complex apps)  
\`\`\`javascript  
// Redux Toolkit example  
Const listingSlice \= createSlice({  
  Name: ‘listing’,  
  initialState: {  
    rentalType: ‘Monthly’,  
    currentBlock: ‘details’,  
    errorCount: 0,  
    isLoading: false,  
    completedSections: \[\]  
  },  
  Reducers: {  
    setRentalType: (state, action) \=\> {  
      state.rentalType \= action.payload;  
    },  
    setCurrentBlock: (state, action) \=\> {  
      state.currentBlock \= action.payload;  
    },  
    incrementErrorCount: (state) \=\> {  
      state.errorCount \+= 1;  
    },  
    resetErrorCount: (state) \=\> {  
      state.errorCount \= 0;  
    },  
    markSectionCompleted: (state, action) \=\> {  
      If (\!state.completedSections.includes(action.payload)) {  
        state.completedSections.push(action.payload);  
      }  
    }  
  }  
});  
\`\`\`

═══════════════════════════════════════════════════════════════════════

SECTION 7: CODE CONVERSION STRATEGY

═══════════════════════════════════════════════════════════════════════

OVERALL APPROACH:

The self-listing page should be converted into a multi-step form component with the following architecture:

1. FRONTEND STRUCTURE:  
2.    \`\`\`  
3.    /src  
4.      /components  
5.        /self-listing  
6.          SelfListingPage.jsx          (Main container)  
7.          /sections  
8.            Section1Details.jsx        (Basic details form)  
9.            Section2Features.jsx       (Features selection)  
10.            Section3Photos.jsx         (Photo upload)  
11.            Section4Pricing.jsx        (Pricing inputs)  
12.            Section5Review.jsx         (Review & submit)  
13.          /components  
14.            RentalTypeSelector.jsx  
15.            HostScheduleSelector.jsx  
16.            NavigationButtons.jsx  
17.            ProgressIndicator.jsx  
18.          /hooks  
19.            [useListingForm.js](http://useListingForm.js)          (Form state management)  
20.            [useValidation.js](http://useValidation.js)           (Validation logic)  
21.            [useWorkflows.js](http://useWorkflows.js)            (Workflow orchestration)  
22.      /api  
23.        /listings  
24.          [create.js](http://create.js)  
25.          [update.js](http://update.js)  
26.          [saveAddress.js](http://saveAddress.js)  
27.          [savePricing.js](http://savePricing.js)  
28.      /state  
29.        [listingSlice.js](http://listingSlice.js)                (Redux/Zustand store)  
30.      /utils  
31.        [validation.js](http://validation.js)  
32.        [errorHandling.js](http://errorHandling.js)  
33.        [customEvents.js](http://customEvents.js)  
34.    \`\`\`

2\. WORKFLOW CONVERSION PATTERNS:

   PATTERN A: Click Handlers  
   \`\`\`javascript  
   // Bubble: “Element is clicked” trigger  
   // Code: onClick event handler  
     
   Function handleMonthlyRentalClick() {  
     // Step 1: Set state  
     setRentalType(‘Monthly’);  
       
     // Step 2: Trigger recalculation    
     triggerScheduleRecalc();  
       
     // Step 3: Update database  
     Await updateListing({ rentalType: ‘Monthly’, weeksOffered: ‘Every week’ });  
   }  
   \`\`\`

   PATTERN B: Custom Events  
   \`\`\`javascript  
   // Bubble: “Trigger a custom event”  
   // Code: Function call or event emission  
     
   // Define custom event as function  
   Async function proceedFromSection(sectionNumber) {  
     switch(sectionNumber) {  
       Case 1:  
         Await proceedFromSection1();  
         Break;  
       Case 2:  
         Await proceedFromSection2();  
         Break;  
       // etc.  
     }  
   }  
     
   // Or use event emitter pattern  
   eventBus.emit(‘proceed-from-section’, { section: 1 });  
   \`\`\`

   PATTERN C: Conditional Workflows    
   \`\`\`javascript  
   // Bubble: “Only when” condition  
   // Code: if statement or guard clause  
     
   Function handleNextButton() {  
     // Check condition  
     If (\!validateCurrentSection()) {  
       showErrorMessage(‘Please complete all required fields’);  
       Return;  
     }  
       
     // Proceed with workflow  
     proceedToNextSection();  
   }  
   \`\`\`

   PATTERN D: Show/Hide Elements  
   \`\`\`javascript  
   // Bubble: “Show element” / “Hide element”    
   // Code: Conditional rendering  
     
   // React example  
   {showErrorMessage && (  
     \<ErrorAlert message={errorMessage} /\>  
   )}  
     
   {currentBlock \=== ‘features’ && (  
     \<Section2Features /\>  
   )}  
   \`\`\`

   PATTERN E: Backend API Workflows  
   \`\`\`javascript  
   // Bubble: “Schedule API Workflow”  
   // Code: Async API call  
     
   Async function scheduleSaveAddress(listingId, addressData) {  
     Try {  
       Const response \= await fetch(‘/api/workflows/listing-saving-address’, {  
         Method: ‘POST’,  
         Headers: { ‘Content-Type’: ‘application/json’ },  
         Body: JSON.stringify({ listingId, addressData })  
       });  
         
       If (\![response.ok](http://response.ok)) throw new Error(‘API call failed’);  
         
       Return await response.json();  
     } catch (error) {  
       console.error(‘Error saving address:’, error);  
       Throw error;  
     }  
   }  
   \`\`\`

3\. DATA FLOW:

   \`\`\`  
   User Interaction  
         ↓  
   Event Handler (onClick, onChange, onSubmit)  
         ↓  
   Validation Check  
         ↓  
   State Update (Local/Global)  
         ↓    
   UI Re-render  
         ↓  
   API Call (if needed)  
         ↓  
   Success/Error Handling  
         ↓  
   Navigate to Next Section (if applicable)  
   \`\`\`

4\. ERROR HANDLING STRATEGY:

   \`\`\`javascript  
   // Centralized error handling  
   Class WorkflowError extends Error {  
     constructor(message, section, field) {  
       super(message);  
       This.section \= section;  
       This.field \= field;  
     }  
   }  
     
   Function handleWorkflowError(error) {  
     // Log error  
     console.error(‘Workflow error:’, error);  
       
     // Show user-friendly message  
     showToast({  
       Type: ‘error’,  
       Title: ‘Something went wrong’,  
       Message: error.message || ‘Please try again’  
     });  
       
     // Increment error count  
     incrementErrorCount();  
       
     // Highlight invalid field if applicable  
     If (error.field) {  
       highlightField(error.field);  
     }  
   }  
   \`\`\`

5\. VALIDATION STRATEGY:

   \`\`\`javascript  
   // Section-based validation  
   Const validationRules \= {  
     Section1: {  
       propertyName: { required: true, minLength: 3 },  
       Address: { required: true },  
       Bedrooms: { required: true, min: 1, max: 50 },  
       Bathrooms: { required: true, min: 1, max: 20 }  
     },  
     Section2: {  
       Features: { required: true, minItems: 1 }  
     },  
     // etc.  
   };  
     
   Function validateSection(sectionNumber) {  
     Const rules \= validationRules\[\`section${sectionNumber}\`\];  
     Const errors \= \[\];  
       
     For (const \[field, rule\] of Object.entries(rules)) {  
       Const value \= getFieldValue(field);  
         
       If (rule.required && \!value) {  
         errors.push({ field, message: \`${field} is required\` });  
       }  
         
       If (rule.minLength && value.length \< rule.minLength) {  
         errors.push({ field, message: \`${field} must be at least ${rule.minLength} characters\` });  
       }  
         
       // Additional validation logic…  
     }  
       
     Return {  
       isValid: errors.length \=== 0,  
       Errors  
     };  
   }  
   \`\`\`

═══════════════════════════════════════════════════════════════════════

SECTION 8: IMPLEMENTATION ROADMAP

═══════════════════════════════════════════════════════════════════════

PHASE 1: FOUNDATION (Week 1-2)  
─────────────────────────────────  
✓ Set up project structure  
✓ Create component hierarchy  
✓ Implement state management (Redux/Zustand/Context)  
✓ Set up routing  
✓ Create base API client  
✓ Implement authentication/authorization

PHASE 2: CORE UI (Week 3-4)    
─────────────────────────────────  
✓ Build all 5 section components  
✓ Implement rental type selector  
✓ Create host schedule selector component  
✓ Build navigation/progress indicator  
✓ Implement show/hide logic for dynamic UI  
✓ Add loading states

PHASE 3: WORKFLOWS & LOGIC (Week 5-6)  
─────────────────────────────────  
✓ Convert all click handler workflows  
✓ Implement custom event system  
✓ Add validation for all sections  
✓ Implement error handling workflows  
✓ Add conditional logic workflows  
✓ Create proceed-from-section functions

PHASE 4: DATA PERSISTENCE (Week 7-8)  
─────────────────────────────────  
✓ Build all backend API endpoints  
✓ Implement database operations  
✓ Add auto-save functionality  
✓ Implement optimistic updates    
✓ Add draft saving capability  
✓ Create backend workflow equivalents

PHASE 5: ADVANCED FEATURES (Week 9-10)  
─────────────────────────────────  
✓ Implement pricing calculator  
✓ Add photo upload with preview  
✓ Implement address validation/geocoding  
✓ Add template generation system  
✓ Build analytics tracking  
✓ Implement A/B testing hooks (if needed)

PHASE 6: POLISH & TESTING (Week 11-12)  
─────────────────────────────────  
✓ Add loading animations  
✓ Implement error boundaries  
✓ Add comprehensive error messages  
✓ Write unit tests for workflows  
✓ Write integration tests  
✓ Perform user acceptance testing  
✓ Optimize performance  
✓ Add accessibility features

═══════════════════════════════════════════════════════════════════════

KEY TECHNICAL DECISIONS:

1. FRAMEWORK CHOICE:  
2.    \- React: Best for complex state management, large ecosystem  
3.    \- Vue: Simpler learning curve, good performance  
4.    \- Svelte: Best performance, smallest bundle size

2\. STATE MANAGEMENT:

- Redux Toolkit: Complex apps, time-travel debugging  
-    \- Zustand: Simpler API, less boilerplate  
-    \- Context API: Simple apps, no external dependencies

3\. FORM MANAGEMENT:

- Formik \+ Yup: Comprehensive, widely used  
-    \- React Hook Form: Better performance, smaller bundle  
-    \- VeeValidate: Best for [Vue.js](http://Vue.js)

4\. API LAYER:

- REST: Simple, widely understood  
-    \- GraphQL: Better for complex data fetching  
-    \- tRPC: Type-safe, great for TypeScript projects  
5. BACKEND:  
6.    \- [Node.js](http://Node.js) \+ Express: JavaScript everywhere  
7.    \- Python \+ FastAPI: Better for data processing  
8.    \- Go: Best performance for concurrent operations

═══════════════════════════════════════════════════════════════════════

CRITICAL CONVERSION NOTES:

1. ALL custom states must be converted to proper state management  
2. 2\. ALL “Trigger a custom event” must become function calls or event emissions  
3. 3\. ALL “Schedule API Workflow” must become async API calls  
4. 4\. ALL “Only when” conditions must become if statements or guards  
5. 5\. ALL “Show/Hide element” must become conditional rendering  
6. 6\. ALL database operations must be properly secured with authentication  
7. 7\. ALL validation must happen on both frontend AND backend  
8. 8\. ALL error handling must be user-friendly and informative

═══════════════════════════════════════════════════════════════════════

WORKFLOW EXECUTION PATTERNS:

SYNCHRONOUS PATTERN:

1. User interaction  
2. 2\. Immediate state update    
3. 3\. UI re-render  
4. 4\. Show result

ASYNCHRONOUS PATTERN:

1. User interaction  
2. 2\. Show loading state  
3. 3\. API call  
4. 4\. Wait for response  
5. 5\. Update state with response  
6. 6\. Hide loading state    
7. 7\. Show success/error message

COMPLEX PATTERN (Multiple operations):

1. User interaction  
2. 2\. Validate inputs (client-side)  
3. 3\. Show loading state  
4. 4\. Start multiple async operations in parallel  
5. 5\. Wait for all to complete (Promise.all)  
6. 6\. Update states with results  
7. 7\. Hide loading state  
8. 8\. Navigate to next section or show error

═══════════════════════════════════════════════════════════════════════

DETAILED WORKFLOW MAPPING TABLE:

WORKFLOW NAME                    | TRIGGER TYPE        | CONVERT TO  
────────────────────────────────────────────────────────────────────  
G: Monthly Rental is clicked     | Element Click       | onClick handler  
G: Nightly is clicked            | Element Click       | onClick handler  
G: Weekly Rental is clicked      | Element Click       | onClick handler  
Page is loaded                   | Page Load           | useEffect/mounted  
Proceed from section 1           | Custom Event        | async function  
Proceed from section 2           | Custom Event        | async function  
Proceed from section 3           | Custom Event        | async function  
Proceed from section 5           | Custom Event        | async function  
Error handling section 1         | Custom Event        | error handler fn  
Error handling section 2         | Custom Event        | error handler fn  
Error handling section 3         | Custom Event        | error handler fn  
Save Pricing                     | Custom Event        | async function  
Next button workflows (7x)       | Element Click       | onClick handlers  
Back button workflows (5x)       | Element Click       | onClick handlers  
Show/Hide element workflows (21x)| State Change        | Conditional render  
Validation workflows             | Do When Condition   | if statements  
Checkbox workflows (8x)          | Element Change      | onChange handlers  
Photo upload workflows (4x)      | File Upload         | file input handler  
Tab click workflows (6x)         | Element Click       | onClick handlers

═══════════════════════════════════════════════════════════════════════

SAMPLE COMPLETE WORKFLOW CONVERSION:

ORIGINAL BUBBLE WORKFLOW: “Next button section 1 is clicked”  
──────────────────────────────────────────────────────────

Trigger: B: Next Section 1 is clicked  
Steps:

1. Validate all required fields (Only when: validation passes)  
2. 2\. Set state “current section error count” to 0  
3. 3\. Trigger custom event “proceed from section 1”  
4. 4\. Show success message

CONVERTED CODE:  
───────────────

\`\`\`javascript  
Async function handleNextSection1Click() {  
  Try {  
    // Step 1: Validate all required fields  
    Const validation \= validateSection(1);  
      
    If (\!validation.isValid) {  
      // Show validation errors  
      validation.errors.forEach(error \=\> {  
        highlightField(error.field);  
        showToast({  
          Type: ‘error’,  
          Title: ‘Validation Error’,  
          Message: error.message  
        });  
      });  
        
      // Update error count  
      setErrorCount(validation.errors.length);  
        
      Return; // Stop execution  
    }  
      
    // Step 2: Reset error count  
    setErrorCount(0);  
      
    // Step 3: Trigger proceed workflow  
    Await proceedFromSection1();  
      
    // Step 4: Show success message  
    showToast({  
      Type: ‘success’,  
      Title: ‘Section Completed’,  
      Message: ‘Basic details saved successfully’  
    });  
      
  } catch (error) {  
    handleWorkflowError(error);  
  }  
}

Async function proceedFromSection1() {  
  // Update UI to next section  
  setCurrentBlock(‘features’);  
    
  // Mark section as completed  
  markSectionCompleted(1);  
    
  // Save to backend (async)  
  Const savePromise \= [api.post](http://api.post)(‘/api/listings/save-address’, {  
    listingId: [currentListing.id](http://currentListing.id),  
    addressData: getAddressData()  
  });  
    
  // Trigger template creation  
  Const templatePromise \= createDescriptionTemplate();  
    
  // Wait for both operations  
  Await Promise.all(\[savePromise, templatePromise\]);  
    
  // Scroll to next section  
  scrollToElement(‘section-features’);  
}  
\`\`\`

═══════════════════════════════════════════════════════════════════════

ADVANCED PATTERNS:

1. OPTIMISTIC UPDATES:  
2. \`\`\`javascript  
3. Async function updateListingOptimistically(updates) {  
4.   // Update UI immediately  
5.   Const previousState \= { …currentListing };  
6.   setCurrentListing({ …currentListing, …updates });  
7.     
8.   Try {  
9.     // Send to backend  
10.     Await api.patch(\`/api/listings/${[currentListing.id](http://currentListing.id)}\`, updates);  
11.   } catch (error) {  
12.     // Rollback on error  
13.     setCurrentListing(previousState);  
14.     showErrorMessage(‘Failed to save changes’);  
15.   }  
16. }  
17. \`\`\`

2\. DEBOUNCED AUTO-SAVE:  
\`\`\`javascript  
Const debouncedSave \= useMemo(  
  () \=\> debounce(async (data) \=\> {  
    Await api.patch(\`/api/listings/${listingId}\`, data);  
    showToast({ type: ‘success’, message: ‘Draft saved’ });  
  }, 2000),  
  \[listingId\]  
);

Function handleFieldChange(field, value) {  
  setFormData({ …formData, \[field\]: value });  
  debouncedSave({ \[field\]: value });  
}  
\`\`\`

3\. PROGRESS TRACKING:  
\`\`\`javascript  
Function calculateProgress() {  
  Const sections \= \[‘details’, ‘features’, ‘photos’, ‘pricing’\];  
  Const completed \= sections.filter(section \=\>   
    isSectionCompleted(section)  
  ).length;  
    
  Return (completed / sections.length) \* 100;  
}  
\`\`\`

═══════════════════════════════════════════════════════════════════════

END OF SELF-LISTING PAGE COMPREHENSIVE GUIDE

═══════════════════════════════════════════════════════════════════════

SUMMARY:

- Total Workflows Analyzed: 124  
- \- Workflow Categories: 21  
- \- Custom Events: 14  
- \- Backend API Workflows: Multiple (scheduled async operations)  
- \- Estimated Conversion Time: 10-12 weeks with 2-3 developers  
- \- Complexity Level: High (extensive state management, multi-step validation)

This guide provides a complete blueprint for converting the Bubble self-listing page into production-ready code using modern web development frameworks and best practices.  
