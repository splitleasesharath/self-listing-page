COMPREHENSIVE GUIDE: NIGHTLY PRICE SLIDER CONTROL \- BUBBLE APP

This document provides a complete guide to replicate the HTML-based nightly price slider control functionality used on the self-listing page.

════════════════════════════════════════════════════════════════

1. OVERVIEW

The nightly price slider control is a custom HTML element that allows users to:

- Set a base 1-night price  
- \- Adjust a decay rate slider (0.700-1.000) that automatically calculates prices for 2, 3, 4, and 5-night stays  
- \- Manually override prices for each night duration  
- \- View calculated totals in real-time  
- \- Save pricing data to Bubble’s database through custom states

════════════════════════════════════════════════════════════════

2. COMPONENT ARCHITECTURE  
1. Main Elements:  
2.    1\. HTML element (named: “HTML price slider control”)  
3.    2\. Group container (named: “G: slider container”)   
4.    3\. JavaScript event handlers (JS2B: Prices, JS2B: Prices nightly list, JS2B: cummulative list)  
5.    4\. Bubble workflows triggered by JavaScript events

B. Data Flow:  
   JavaScript ➔ Custom Events ➔ Bubble Workflows ➔ Custom States ➔ Database Fields

════════════════════════════════════════════════════════════════

III. CUSTOM STATES (on “G: slider container”)

The following custom states must be created on the container group:

1. P1 (type: number) \- Stores the 1-night price  
2. 2\. Decay (type: number) \- Stores the decay rate (0.700-1.000)  
3. 3\. Total (type: number) \- Stores the calculated 5-night total  
4. 4\. Nightly\_list (type: list of numbers) \- Stores individual nightly prices \[night1, night2, night3, night4, night5\]  
5. 5\. Cummulative\_list (type: list of numbers) \- Stores cumulative totals  
6. 6\. Prices\_json (type: text) \- Stores the JSON representation of all prices

════════════════════════════════════════════════════════════════

IV. DATA ATTRIBUTES (for Bubble connection)

The HTML element uses these data attributes to connect with Bubble fields:

Data-n2 \= “Current page’s Listing’s 🔥 Nightly Host Rate for 2 nights”  
Data-n3 \= “Current page’s Listing’s 🔥 Nightly Host Rate for 3 nights”    
Data-n4 \= “Current page’s Listing’s 🔥 Nightly Host Rate for 4 nights”  
Data-n5 \= “Current page’s Listing’s 🔥 Nightly Host Rate for 5 nights”  
Data-p1 \= “”  
Data-decay \= “”  
Data-emit-initial \= “0”

These attributes load existing saved prices when the page loads and provide default values.

════════════════════════════════════════════════════════════════

V. COMPLETE HTML CODE

Copy and paste this HTML code into an HTML element in Bubble:

NOTE: Due to the length of the HTML code (containing full styling and JavaScript), I’ll describe the key sections below. The actual HTML can be copied from the Bubble editor’s HTML element.

════════════════════════════════════════════════════════════════

VI. HTML STRUCTURE OVERVIEW

The HTML contains these main sections:

1. STYLE SECTION:  
2.    \- CSS for the container, rows, fields, labels, number inputs  
3.    \- Styling for the decay slider and range inputs  
4.    \- Responsive grid layouts and visual design  
5.    \- Button styling for increment/decrement controls

B. WIDGET CONTAINER:  
   \<div id=”sl-price-widget” data-n2=”...” data-n3=”...” data-n4=”...” data-n5=”...” data-p1=”” data-decay=”” data-emit-initial=”0”\>

C. INTERACTIVE ELEMENTS:

1. 1-night price input field  
2.    2\. Decay slider (range 0.700-1.000)  
3.    3\. Buttons to increase/decrease decay  
4.    4\. 5-night total display (readonly)  
5.    5\. Price sliders for nights 1-5  
6.    6\. Pricing table with 3 columns (Night | Price That Night | Cumulative)

════════════════════════════════════════════════════════════════

VII. JAVASCRIPT FUNCTIONS

The script section includes these key functions:

1. INITIALIZATION:  
2.    \- preloadFromAttributes(): Loads existing prices from data attributes  
3.    \- performInit(): Sets default values (p1=100, decay=0.95) if no saved data  
4.    \- Detects if running in Bubble vs standalone environment

B. CALCULATION FUNCTIONS:

- solveDecay(p1, d): Calculates geometric decay series  
-    \- sumSeries(p1, d): Calculates total for decay series  
-    \- clamp(x, lo, hi): Constrains values to min/max range  
-    \- asNum(v): Safely parses numbers from strings

C. SYNC FUNCTIONS:

- syncUI(): Updates all display elements when data changes  
-    \- updateBounds(): Recalculates pricing when p1 or decay changes  
-    \- commitDecay(): Broadcasts decay changes to Bubble  
-    \- rebuildFromP1(), currentDecay: Handles manual overrides

D. EVENT DISPATCHING TO BUBBLE:

- window.bubble\_fn\_prices(JSON.stringify(payload))  
-    \- window.bubble\_fn\_nightly\_list(payload.nightly)  
-    \- window.bubble\_fn\_cumulative\_list(cumulative)  
-    \- Uses window.dispatchEvent(new CustomEvent(‘pricing-update’, …))  
-    \- window.getNightlyPrices(): Exposes data to parent window  
5. EVENT LISTENERS:  
6.    \- Input change handlers for p1, decay, and manual price overrides  
7.    \- Button click handlers for increment/decrement  
8.    \- ResizeObserver for responsive layout  
9.    \- DOMContentLoaded initialization

════════════════════════════════════════════════════════════════

VIII. BUBBLE WORKFLOWS SETUP

Create THREE custom events that will be triggered by the JavaScript:

1. EVENT: “JS2B: Prices event”  
2.    Element: JS2B: Prices (created as custom element type)  
3.      
4.    Workflow Actions:  
5.    Step 1: Set states prices\_json of G: slider container  
6.            Value: Get data from page URL \> prices\_json  
7.      
8.    Step 2: Trigger Alerts (or other follow-up actions)  
9.            Condition: Only when Current…

B. EVENT: “JS2B: Prices nightly list event”  
   Element: JS2B: Prices nightly list  
     
   Workflow Actions:  
   Step 1: Set state nightly\_list of G: slider container  
           Value: Get data from page URL \> nightly\_list  
     
C. EVENT: “JS2B: cummulative list event”    
   Element: JS2B: cummulative list  
     
   Workflow Actions:  
   Step 1: Set state cummulative\_list of G: slider container  
           Value: Get data from page URL \> cumulative\_list

════════════════════════════════════════════════════════════════

IX. DATA FLOW DIAGRAM

1. USER INTERACTION (Slider/Input Change)  
2.    ↓  
3. 2\. JAVASCRIPT CALCULATES (solveDecay, sumSeries, syncUI)  
4.    ↓  
5. 3\. JAVASCRIPT DISPATCHES EVENT  
6.    window.bubble\_fn\_prices(payload)  
7.    window.bubble\_fn\_nightly\_list(nightly)  
8.    window.bubble\_fn\_cumulative\_list(cumulative)  
9.    ↓  
10. 4\. BUBBLE CUSTOM EVENT TRIGGERS  
11.    “JS2B: Prices event”  
12.    “JS2B: Prices nightly list event”    
13.    “JS2B: cummulative list event”  
14.    ↓  
15. 5\. WORKFLOW UPDATES CUSTOM STATES  
16.    G: slider container’s prices\_json  
17.    G: slider container’s nightly\_list  
18.    G: slider container’s cummulative\_list  
19.    G: slider container’s p1  
20.    G: slider container’s decay  
21.    G: slider container’s total  
22.    ↓  
23. 6\. DATABASE SAVE (from custom states)  
24.    Listing’s 🔥 Nightly Host Rate for 2 nights  
25.    Listing’s 🔥 Nightly Host Rate for 3 nights  
26.    Listing’s 🔥 Nightly Host Rate for 4 nights  
27.    Listing’s 🔥 Nightly Host Rate for 5 nights

════════════════════════════════════════════════════════════════

X. STEP-BY-STEP REPLICATION GUIDE

STEP 1: Create the Container Group

- Add a Group element named “G: slider container”  
- \- Set Type of content: Listing  
- \- Set Data source: Parent group’s Listing (or appropriate source)

STEP 2: Create Custom States on “G: slider container”

- P1 (number)  
- \- decay (number)  
- \- total (number)  
- \- nightly\_list (list of numbers)  
- \- cummulative\_list (list of numbers)  
- \- prices\_json (text)

STEP 3: Add HTML Element

- Drag an HTML element inside “G: slider container”  
- \- Name it “HTML price slider control”  
- \- Copy the entire HTML code from the original element  
- \- Ensure data attributes are set:  
-   \* data-n2: Current page’s Listing’s 🔥 Nightly Host Rate for 2 nights  
-   \* data-n3: Current page’s Listing’s 🔥 Nightly Host Rate for 3 nights  
-   \* data-n4: Current page’s Listing’s 🔥 Nightly Host Rate for 4 nights  
-   \* data-n5: Current page’s Listing’s 🔥 Nightly Host Rate for 5 nights  
-   \* data-p1: (leave empty for default 100\)  
-   \* data-decay: (leave empty for default 0.95)  
-   \* data-emit-initial: “0”

STEP 4: Create Custom Elements for JavaScript Events

- Go to Settings \> Element Types  
- \- Create three new element types (or use existing):  
-   \* JS2B: Prices  
-   \* JS2B: Prices nightly list  
-   \* JS2B: cummulative list

STEP 5: Create Bubble Workflows

- Go to Workflow tab  
- \- Create workflow: “JS2B: Prices event”  
-   Event: JS2B: Prices  
-   Action: Set state prices\_json of G: slider container  
-     
- \- Create workflow: “JS2B: Prices nightly list event”  
-   Event: JS2B: Prices nightly list  
-   Action: Set state nightly\_list of G: slider container  
-     
- \- Create workflow: “JS2B: cummulative list event”  
-   Event: JS2B: cummulative list    
-   Action: Set state cummulative\_list of G: slider container

STEP 6: Add Database Save Workflow (Optional)

- Create a workflow that saves custom states to the database  
- \- Can be triggered on a “Save” button click  
- \- Map custom states to Listing fields:  
-   \* nightly\_list item \#2 → Nightly Host Rate for 2 nights  
-   \* nightly\_list item \#3 → Nightly Host Rate for 3 nights  
-   \* nightly\_list item \#4 → Nightly Host Rate for 4 nights  
-   \* nightly\_list item \#5 → Nightly Host Rate for 5 nights

STEP 7: Test the Implementation

- Preview the page  
- \- Adjust the 1-night price  
- \- Move the decay slider  
- \- Verify prices update in real-time  
- \- Check that custom states are being set  
- \- Verify database saves correctly

════════════════════════════════════════════════════════════════

XI. KEY CONCEPTS EXPLAINED

1. DECAY RATE:  
2.    The decay rate (0.700-1.000) represents a discount multiplier applied to each additional night.  
3.    \- 1.000 \= no discount (all nights same price)  
4.    \- 0.950 \= 5% discount per additional night  
5.    \- 0.700 \= 30% discount per additional night  
6.      
7.    Formula: Night N price \= p1 × (decay^(N-1))  
8.    Example with p1=$100, decay=0.95:  
9.    \- Night 1: $100  
10.    \- Night 2: $100 × 0.95 \= $95  
11.    \- Night 3: $100 × 0.95² \= $90.25  
12.    \- Night 4: $100 × 0.95³ \= $85.74  
13.    \- Night 5: $100 × 0.95⁴ \= $81.45

B. MANUAL OVERRIDES:  
   Users can manually adjust individual night prices using the sliders.  
   When a night is manually adjusted, the system:

- Updates that specific price  
-    \- Recalculates the total  
-    \- Preserves the manual override  
-    \- Does NOT recalculate from decay formula

C. BUBBLE INTEGRATION:  
   The JavaScript code checks for Bubble’s environment:

- window.bubble\_fn\_prices() sends data to Bubble  
-    \- Falls back to window.parent.postMessage() for iframe contexts  
-    \- Uses CustomEvent for non-Bubble environments

════════════════════════════════════════════════════════════════

XII. TROUBLESHOOTING

PROBLEM: Prices not updating in Bubble  
SOLUTION: 

- Verify custom events are created (JS2B: Prices, etc.)  
- \- Check that workflows are assigned to correct events  
- \- Ensure G: slider container has all custom states defined  
- \- Check browser console for JavaScript errors

PROBLEM: Initial prices not loading  
SOLUTION:

- Verify data attributes (data-n2, data-n3, etc.) are properly set  
- \- Check that Listing fields contain valid numbers  
- \- Ensure preloadFromAttributes() function is executing

PROBLEM: Slider doesn’t move smoothly  
SOLUTION:

- Check CSS styling hasn’t been overridden  
- \- Verify range input step=”0.001” attribute is present  
- \- Ensure no conflicting JavaScript is preventing updates

PROBLEM: Custom states not saving to database  
SOLUTION:

- Create explicit “Save” workflow that writes custom states to database  
- \- Map each nightly\_list item to correct Listing field  
- \- Verify permissions allow database modifications

════════════════════════════════════════════════════════════════

XIII. CUSTOMIZATION OPTIONS

1. Change Decay Range:  
2.    Modify: \<input id=”slw-decay-slider” min=”0.700” max=”1.000”\>  
3.    To: \<input id=”slw-decay-slider” min=”0.500” max=”1.000”\>

B. Change Default Values:  
   In JavaScript section, modify:  
   P1 \= 100; → p1 \= 150;  
   currentDecay \= 0.95; → currentDecay \= 0.90;

C. Add More Nights:

- Extend nightly array: let nightly \= Array(7).fill(0);  
-    \- Add more data attributes: data-n6, data-n7  
-    \- Update HTML table to include additional rows  
-    \- Modify solveDecay() loop: for (let k=1; k\<N; k++)  
4. Change Styling:  
5.    Modify the \<style\> section to match your brand:  
6.    \- Colors: \#e5e7eb, \#3b82f6, etc.  
7.    \- Fonts: font-family, font-size  
8.    \- Layout: grid-template-columns, gap, padding

════════════════════════════════════════════════════════════════

XIV. COMPLETE FILE REFERENCE

FILES REQUIRED:  
✓ HTML element code (contains HTML, CSS, JavaScript)  
✓ Bubble group container with custom states  
✓ Three custom element types for JS events  
✓ Three Bubble workflows

BUBBLE DATABASE FIELDS:  
✓ Listing Type → 🔥 Nightly Host Rate for 2 nights (number)  
✓ Listing Type → 🔥 Nightly Host Rate for 3 nights (number)  
✓ Listing Type → 🔥 Nightly Host Rate for 4 nights (number)  
✓ Listing Type → 🔥 Nightly Host Rate for 5 nights (number)

════════════════════════════════════════════════════════════════

XV. IMPORTANT NOTES

1. ELEMENT NAMING:  
2.    \- The HTML element MUST be named “HTML price slider control”  
3.    \- The container group MUST be named “G: slider container”  
4.    \- Custom event elements must match: “JS2B: Prices”, etc.  
5.    \- These names are referenced in the JavaScript code

2\. DATA ATTRIBUTES CONNECTION:

- Bubble expressions in data attributes load saved values  
-    \- When the page loads, preloadFromAttributes() reads these  
-    \- If empty, defaults to p1=100, decay=0.95  
-    \- data-emit-initial=”0” prevents duplicate initial events

3\. CUSTOM STATES vs DATABASE:

- Custom states hold temporary UI state  
-    \- JavaScript updates custom states in real-time  
-    \- Database save happens separately (on button click, etc.)  
-    \- This separation allows for “preview” before saving

4\. JAVASCRIPT-BUBBLE COMMUNICATION:

- JavaScript dispatches events → Bubble workflows receive them  
-    \- Bubble functions (window.bubble\_fn\_\*) are checked first  
-    \- If not in Bubble, falls back to postMessage/CustomEvent  
-    \- This allows testing outside of Bubble environment

5\. LAYOUT CONSIDERATIONS:

- HTML element should have sufficient height (min 400px recommended)  
-    \- Container group should have overflow visible  
-    \- HTML element works best inside a group with fixed width  
-    \- Responsive design handles mobile views automatically

════════════════════════════════════════════════════════════════

XVI. TESTING CHECKLIST

Before deploying, verify:

□ HTML element displays correctly on page  
□ Initial 1-night price shows default (100) or loaded value  
□ Decay slider moves smoothly from 0.700 to 1.000  
□ Changing decay updates all night prices automatically  
□ 5-night total calculates correctly  
□ Manual price overrides work for individual nights  
□ Custom states update in debugger when values change  
□ Database fields save correctly when triggered  
□ Saved prices reload correctly on page refresh  
□ Mobile/responsive layout looks good  
□ No JavaScript errors in browser console  
□ Workflows trigger correctly (check with debugger)

════════════════════════════════════════════════════════════════

XVII. COMMON USE CASES

1. SET PRICING WITH DISCOUNT:  
2.    1\. Enter base 1-night price (e.g., $100)  
3.    2\. Adjust decay slider for desired discount (e.g., 0.95 for 5% off)  
4.    3\. Review calculated prices in table  
5.    4\. Click save button to persist to database

B. MANUALLY CUSTOMIZE EACH NIGHT:

1. Set initial prices with decay slider  
2.    2\. Use individual night sliders to override specific nights  
3.    3\. System preserves manual overrides  
4.    4\. Total updates automatically

C. LOAD EXISTING PRICING:

1. Page loads with data-n2, n3, n4, n5 populated from database  
2.    2\. preloadFromAttributes() reads these values  
3.    3\. System reverse-calculates decay rate if possible  
4.    4\. UI displays existing pricing structure

D. RAPID TESTING:

1. Use increment/decrement buttons for quick decay adjustments  
2.    2\. Watch real-time price updates  
3.    3\. Experiment with different discount strategies  
4.    4\. Reset by changing 1-night price

════════════════════════════════════════════════════════════════

XVIII. ADVANCED: HOW IT WORKS UNDER THE HOOD

GEOMETRIC DECAY FORMULA:  
The pricing model uses a geometric series where each night’s price   
Is calculated as: price\[n\] \= p1 × (decay^(n-1))

This creates a declining price structure that rewards longer stays:

- Night 1: p1 × decay⁰ \= p1  
- \- Night 2: p1 × decay¹    
- \- Night 3: p1 × decay²  
- \- Night 4: p1 × decay³  
- \- Night 5: p1 × decay⁴

The solveDecay() function implements this using ordinary least squares  
(OLS) in log-space to optimize the decay rate when users manually  
Override prices.

BUBBLE EVENT MECHANISM:

1. JavaScript detects window.bubble\_fn\_prices exists (Bubble environment)  
2. 2\. Calls function with JSON payload  
3. 3\. Bubble receives this via custom event mechanism  
4. 4\. Triggers workflow with matching event name  
5. 5\. Workflow extracts data and updates custom states  
6. 6\. Custom states can then be saved to database

INITIALIZATION LOGIC:

- Checks for preloaded data (from database via data attributes)  
- \- If found: loads saved pricing structure  
- \- If not found: uses defaults (p1=100, decay=0.95)  
- \- data-emit-initial controls whether to immediately broadcast  
- \- Allows for “silent” loading vs “active” initialization

════════════════════════════════════════════════════════════════

XIX. CONCLUSION

This nightly price slider control provides a sophisticated yet   
User-friendly interface for dynamic pricing. The combination of:

✓ Real-time calculations  
✓ Visual slider controls  
✓ Manual override capability  
✓ Automatic discount application  
✓ Seamless Bubble integration  
✓ Database persistence

Makes it a powerful tool for hosts to optimize their pricing   
Strategy while maintaining full control over individual night rates.

The HTML/JavaScript approach ensures smooth, responsive interactions  
Without page reloads, while Bubble workflows handle the backend  
Data management securely and reliably.

════════════════════════════════════════════════════════════════

Explicit HTML code:  
\<\!DOCTYPE html\>  
\<html lang="en"\>  
\<head\>  
  \<meta charset="utf-8" /\>  
  \<meta name="viewport" content="width=device-width, initial-scale=1" /\>  
  \<title\>Nightly Pricing Simulator — Shadow DOM (Bubble-safe)\</title\>  
\</head\>  
\<body\>  
  \<\!-- Host container: replace data-\* with Bubble dynamic expressions \--\>  
  \<div id="sl-price-widget"  
       data-n2="Current page's Listing's 💰Nightly Host Rate for 2 nights"  
       data-n3="Current page's Listing's 💰Nightly Host Rate for 3 nights"  
       data-n4="Current page's Listing's 💰Nightly Host Rate for 4 nights"  
       data-n5="Current page's Listing's 💰Nightly Host Rate for 5 nights"  
       data-p1=""  
       data-decay=""  
       data-emit-initial="0"\>  
  \</div\>

  \<script\>  
  (() \=\> {  
    const N \= 5;  
    const DECAY\_MIN \= 0.7;  
    const DECAY\_MAX \= 1.0;

    const host \= document.getElementById('sl-price-widget');  
    if (\!host) return;  
    const root \= host.attachShadow({ mode: 'open' });

    // Build UI inside Shadow DOM to avoid interfering with Bubble styles/scripts  
    root.innerHTML \= \`  
      \<style\>  
        :host { all: initial; }  
        .app{ font-family: ui-sans-serif, system-ui, \-apple-system, Segoe UI, Roboto, Helvetica, Arial; color:\#111827; background:\#fff; max-width:1100px; width:100%; margin:0; padding:12px; box-sizing:border-box; }  
        .row{ display:grid; grid-template-columns: 1fr auto auto; gap:16px; align-items:end; margin: 8px 0 16px; }  
        .field{ display:grid; gap:6px; min-width:0; }  
        .label{ font-size:13px; color:\#6b7280; }  
        .num{ font: inherit; padding:10px 12px; border-radius:12px; border:1px solid \#e5e7eb; width:100%; box-sizing:border-box; }  
        .spin{ display:inline-flex; align-items:center; gap:8px; width:100%; }  
        .spin .buttons{ display:flex; flex-direction:column; }  
        .spin .btn{ width:32px; height:24px; border:1px solid \#e5e7eb; border-radius:8px; background:\#fff; cursor:pointer; line-height:1; font-size:12px; }  
        .spin .btn \+ .btn{ margin-top:6px; }

        .track-wrap{ position:relative; height:64px; }  
        .track{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); height:10px; background:linear-gradient(\#9ea0a3,\#9ea0a3) center/100% 10px no-repeat, \#c9c9c9; border-radius:999px; }  
        .ranges{ position:absolute; inset:0; display:grid; place-items:center; pointer-events:none; }  
        .ranges input\[type=range\]{ pointer-events:auto; \-webkit-appearance:none; appearance:none; position:absolute; top:50%; transform:translateY(-50%); background:transparent; height:36px; width:auto; }  
        \#slw-r1{ left:0; width:49%; }  
        \#slw-r5{ right:0; width:49%; }  
        .ranges input\[type=range\]::-webkit-slider-runnable-track{ height:10px; background:transparent; }  
        .ranges input\[type=range\]::-moz-range-track{ height:10px; background:transparent; }  
        .ranges input\[type=range\]::-webkit-slider-thumb{ \-webkit-appearance:none; appearance:none; width:34px; height:34px; border-radius:10px; background:\#5b3bb3; border:0; box-shadow:0 6px 16px rgba(0,0,0,.12); cursor:pointer; margin-top:-12px; }  
        .ranges input\[type=range\]::-moz-range-thumb{ width:34px; height:34px; border-radius:10px; background:\#5b3bb3; border:0; box-shadow:0 6px 16px rgba(0,0,0,.12); cursor:pointer; }  
        .tag{ position:absolute; top:0; transform:translateX(-50%); color:\#111827; font-size:12px; font-weight:700; white-space:nowrap; }  
        .value{ position:absolute; bottom:-18px; transform:translateX(-50%); font-size:14px; font-weight:600; }

        .grid{ margin-top:20px; border:1px solid \#f1f5f9; border-radius:14px; overflow-x:auto; \-webkit-overflow-scrolling:touch; }  
        table{ width:100%; min-width:420px; border-collapse:collapse; font-variant-numeric: tabular-nums; }  
        th, td{ padding:12px 14px; text-align:right; border-top:1px solid \#f1f5f9; }  
        th:first-child, td:first-child{ text-align:left; }  
        thead th{ background:\#fafafa; color:\#4b5563; font-weight:600; }

        @media (max-width: 640px){  
          .row{ grid-template-columns: 1fr; gap:12px; }  
          .spin{ gap:10px; }  
          .spin .btn{ width:40px; height:32px; font-size:14px; }  
          .track-wrap{ height:80px; }  
          .ranges input\[type=range\]{ height:44px; }  
          .ranges input\[type=range\]::-webkit-slider-thumb{ width:40px; height:40px; border-radius:12px; margin-top:-15px; }  
          .ranges input\[type=range\]::-moz-range-thumb{ width:40px; height:40px; border-radius:12px; }  
          .value{ bottom:-30px; font-size:15px; }  
        }  
        \#slw-decay::-webkit-outer-spin-button,  
        \#slw-decay::-webkit-inner-spin-button{ \-webkit-appearance:none; margin:0; }  
        \#slw-decay{ \-moz-appearance:textfield; appearance:textfield; }  
      \</style\>

      \<div class="app"\>  
        \<div class="row"\>  
          \<div class="field"\>  
            \<div class="label"\>1-night price\</div\>  
            \<div class="spin"\>  
              \<input id="slw-p1" class="num" type="number" min="0" step="1" inputmode="numeric" value="100" /\>  
              \<div class="buttons"\>  
                \<button class="btn" id="slw-p1-up" aria-label="Increase 1-night"\>▲\</button\>  
                \<button class="btn" id="slw-p1-down" aria-label="Decrease 1-night"\>▼\</button\>  
              \</div\>  
            \</div\>  
          \</div\>  
          \<div class="field"\>  
            \<div class="label"\>Decay per additional night (0.700–1.000)\</div\>  
            \<div class="spin"\>  
              \<input id="slw-decay" class="num" type="number" min="0.7" max="1" step="0.001" inputmode="decimal" value="0.950" /\>  
              \<div class="buttons"\>  
                \<button class="btn" id="slw-decay-up" aria-label="Increase decay"\>▲\</button\>  
                \<button class="btn" id="slw-decay-down" aria-label="Decrease decay"\>▼\</button\>  
              \</div\>  
            \</div\>  
          \</div\>  
          \<div class="field"\>  
            \<div class="label"\>5-night total\</div\>  
            \<input id="slw-total" class="num" type="text" inputmode="numeric" value="" readonly /\>  
          \</div\>  
        \</div\>

        \<div class="track-wrap"\>  
          \<div class="track"\>\</div\>  
          \<div class="ranges"\>  
            \<input id="slw-r1" type="range" min="0" max="600" step="1" value="100" aria-label="1-night price" /\>  
            \<input id="slw-r5" type="range" min="0" max="2000" step="1" value="0" aria-label="5-night total" /\>

            \<div id="slw-tag1" class="tag"\>1 night price\</div\>  
            \<div id="slw-val1" class="value"\>$100\</div\>  
            \<div id="slw-tag5" class="tag"\>5 night total\</div\>  
            \<div id="slw-val5" class="value"\>$0\</div\>  
          \</div\>  
        \</div\>

        \<div class="grid"\>  
          \<table\>  
            \<thead\>  
              \<tr\>\<th\>Night\</th\>\<th\>Price That Night\</th\>\<th\>Cummulative Total per Week\</th\>\</tr\>  
            \</thead\>  
            \<tbody id="slw-rows"\>\</tbody\>  
          \</table\>  
        \</div\>  
      \</div\>  
    \`;

    // Helpers  
    const $ \= sel \=\> root.getElementById(sel);  
    const fmt0 \= n \=\> n.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0});  
    const roundUp \= n \=\> Math.ceil(n);

    // Refs  
    const p1El \= $('slw-p1');  
    const decayEl \= $('slw-decay');  
    const totalEl \= $('slw-total');  
    const r1 \= $('slw-r1');  
    const r5 \= $('slw-r5');  
    const rows \= $('slw-rows');  
    const tag1 \= $('slw-tag1');  
    const tag5 \= $('slw-tag5');  
    const val1 \= $('slw-val1');  
    const val5 \= $('slw-val5');  
    const p1Up \= $('slw-p1-up');  
    const p1Down \= $('slw-p1-down');  
    const dUp \= $('slw-decay-up');  
    const dDown \= $('slw-decay-down');

    let nightly \= Array(N).fill(0);  
    let currentDecay \= 0.95;  
    let isInitializing \= false;  
    const emitInitial \= String(host.dataset.emitInitial||'0').trim() \=== '1';

    const clamp \= (x, lo, hi) \=\> Math.max(lo, Math.min(hi, x));  
    const sum \= arr \=\> arr.reduce((a,b)=\>a+b,0);

    function sumSeries(p1, d) {  
      if (Math.abs(1 \- d) \< 1e-10) return p1 \* N;  
      return p1 \* (1 \- Math.pow(d, N)) / (1 \- d);  
    }  
    function solveDecay(p1, S) {  
      if (p1 \<= 0\) return DECAY\_MIN;  
      const Smin \= sumSeries(p1, DECAY\_MIN);  
      const Smax \= sumSeries(p1, DECAY\_MAX);  
      const T \= clamp(S, Smin, Smax);  
      if (Math.abs(T \- Smin) \< 1e-6) return DECAY\_MIN;  
      if (Math.abs(T \- Smax) \< 1e-6) return DECAY\_MAX;  
      let lo \= DECAY\_MIN, hi \= DECAY\_MAX, mid;  
      for (let i=0;i\<50;i++) {  
        mid \= (lo+hi)/2;  
        const Sm \= sumSeries(p1, mid);  
        if (Sm \< T) lo \= mid; else hi \= mid;  
      }  
      return clamp((lo+hi)/2, DECAY\_MIN, DECAY\_MAX);  
    }  
    function updateBounds() {  
      const p1 \= \+r1.value || 0;  
      const minTotal \= sumSeries(p1, DECAY\_MIN);  
      const maxTotal \= sumSeries(p1, DECAY\_MAX);  
      r5.min \= Math.round(minTotal);  
      r5.max \= Math.round(Math.max(maxTotal, minTotal));  
    }  
    function rebuildFrom(p1, d) {  
      nightly\[0\] \= roundUp(+p1);  
      for (let k=1;k\<N;k++) nightly\[k\] \= roundUp(nightly\[k-1\] \* d);  
      syncUI();  
    }

    // Enhanced attribute parsing with better logging  
    const asNum \= v \=\> {  
      if (v \=== undefined || v \=== null) return NaN;  
      const s \= String(v).trim().toLowerCase();  
      if (\!s || s \=== 'null' || s \=== 'undefined' || s \=== 'nan') return NaN;  
      const n \= Number(s.replace(/\[^0-9.\\-\]/g, ''));  
      return Number.isFinite(n) ? n : NaN;  
    };

    function preloadFromAttributes() {  
      console.log('\[PriceWidget\] 🔍 Reading attributes:', {  
        n2\_raw: host.dataset.n2,  
        n3\_raw: host.dataset.n3,  
        n4\_raw: host.dataset.n4,  
        n5\_raw: host.dataset.n5,  
        p1\_raw: host.dataset.p1,  
        decay\_raw: host.dataset.decay  
      });

      // Optional direct seeds  
      const seedP1    \= asNum(host.dataset.p1);  
      const seedDecay \= asNum(host.dataset.decay);

      if (Number.isFinite(seedP1) && seedP1 \> 0 &&  
          Number.isFinite(seedDecay) && seedDecay \>= DECAY\_MIN && seedDecay \<= DECAY\_MAX) {  
        console.log('\[PriceWidget\] ✅ Using direct seeds', { p1: seedP1, decay: \+seedDecay.toFixed(3) });  
        nightly \= Array(N).fill(0);  
        nightly\[0\] \= Math.round(seedP1);  
        for (let k=1;k\<N;k++) nightly\[k\] \= roundUp(nightly\[k-1\] \* seedDecay);  
        currentDecay \= seedDecay;  
        return true;  
      }

      // Fit from n2..n5  
      const n2 \= asNum(host.dataset.n2);  
      const n3 \= asNum(host.dataset.n3);  
      const n4 \= asNum(host.dataset.n4);  
      const n5 \= asNum(host.dataset.n5);

      const obs \= \[\];  
      if (Number.isFinite(n2) && n2 \> 0\) obs.push({ n:2, y:n2 });  
      if (Number.isFinite(n3) && n3 \> 0\) obs.push({ n:3, y:n3 });  
      if (Number.isFinite(n4) && n4 \> 0\) obs.push({ n:4, y:n4 });  
      if (Number.isFinite(n5) && n5 \> 0\) obs.push({ n:5, y:n5 });

      console.log('\[PriceWidget\] 📊 Parsed nightly rates:', { n2, n3, n4, n5, validPoints: obs.length });

      if (obs.length \< 2\) {  
        console.warn('\[PriceWidget\] ⚠️ Not enough valid points (need ≥2). Using defaults.');  
        return false;  
      }

      // OLS in log-space: ln y ≈ ln p1 \+ (n-1) ln d  
      const xs \= obs.map(o \=\> o.n \- 1);  
      const ls \= obs.map(o \=\> Math.log(Math.max(1, o.y)));  
      const m  \= xs.length;  
      const sx \= xs.reduce((a,b)=\>a+b,0);  
      const sxx= xs.reduce((a,b)=\>a+b\*b,0);  
      const sy \= ls.reduce((a,b)=\>a+b,0);  
      const sxy= xs.reduce((a,xi,i)=\>a \+ xi\*ls\[i\], 0);  
      const denom \= (m\*sxx \- sx\*sx) || 1e-9;  
      const b \= (m\*sxy \- sx\*sy)/denom; // ln d  
      const a \= (sy \- b\*sx)/m;         // ln p1

      let d \= Math.exp(b);  
      d \= clamp(d, DECAY\_MIN, DECAY\_MAX);  
      let p1 \= Math.max(1, Math.exp(a));  
      p1 \= Math.round(p1);

      nightly \= Array(N).fill(0);  
      nightly\[0\] \= p1;  
      for (let k=1;k\<N;k++) nightly\[k\] \= roundUp(nightly\[k-1\]\*d);  
      currentDecay \= d;

      console.log('\[PriceWidget\] ✅ Fitted curve', { p1, decay: \+d.toFixed(3), nightly });  
      return true;  
    }

    function placeTags() {  
      const wrap \= root.querySelector('.ranges');  
      const rectWrap \= wrap.getBoundingClientRect();  
      const pad \= 12;  
      const minGap \= 84;

      const posOn \= (input) \=\> {  
        const r \= input.getBoundingClientRect();  
        const min \= \+input.min, max \= \+input.max, val \= \+input.value;  
        const t \= (val \- min) / (max \- min || 1);  
        return (r.left \- rectWrap.left) \+ r.width \* t;  
      };

      let x1 \= posOn(r1);  
      let x5 \= posOn(r5);

      const clampX \= (x) \=\> Math.max(pad, Math.min(rectWrap.width \- pad, x));  
      if (Math.abs(x1 \- x5) \< minGap) {  
        const mid \= (x1 \+ x5) / 2;  
        x1 \= mid \- minGap / 2;  
        x5 \= mid \+ minGap / 2;  
      }  
      x1 \= clampX(x1);  
      x5 \= clampX(x5);

      tag1.style.left \= x1 \+ 'px';  val1.style.left \= x1 \+ 'px';  
      tag5.style.left \= x5 \+ 'px';  val5.style.left \= x5 \+ 'px';

      val1.textContent \= fmt0(+r1.value);  
      val5.textContent \= fmt0(+r5.value);  
    }

    function renderTable() {  
      let cum \= 0; const body \= \[\];  
      for (let i=0;i\<N;i++) {   
        cum \+= nightly\[i\];   
        body.push(\`\<tr\>\<td\>${i+1}\</td\>\<td\>${fmt0(nightly\[i\])}\</td\>\<td\>${fmt0(cum)}\</td\>\</tr\>\`);   
      }  
      rows.innerHTML \= body.join('');  
    }

    function broadcast() {  
      if (isInitializing && \!emitInitial) return;

      const payload \= {  
        nightly: nightly.map(v \=\> Math.round(v)),  
        total: sum(nightly),  
        decay: \+currentDecay.toFixed(3),  
        p1: Math.round(+p1El.value || \+r1.value || nightly\[0\] || 0\)  
      };

      const cumulative \= \[\];  
      let running \= 0;   
      for (let v of payload.nightly){   
        running \+= v;   
        cumulative.push(running);   
      }

      try { if (typeof window.bubble\_fn\_prices \=== 'function') window.bubble\_fn\_prices(JSON.stringify(payload)); } catch {}  
      try { if (typeof window.bubble\_fn\_nightly\_list \=== 'function' && Array.isArray(payload.nightly)) window.bubble\_fn\_nightly\_list(payload.nightly); } catch {}  
      try { if (typeof window.bubble\_fn\_cumulative\_list \=== 'function' && Array.isArray(cumulative)) window.bubble\_fn\_cumulative\_list(cumulative); } catch {}

      try { window.dispatchEvent(new CustomEvent('pricing:update', { detail: payload })); } catch {}  
      try { if (window.parent && window.parent \!== window) window.parent.postMessage({ type: 'pricing:update', payload }, '\*'); } catch {}

      window.getNightlyPrices \= () \=\> ({ ...payload });  
    }

    function syncUI() {  
      const p1 \= nightly\[0\];  
      const total \= sum(nightly);  
      p1El.value \= Math.round(p1);  
      decayEl.value \= currentDecay.toFixed(3);  
      totalEl.value \= Math.round(total);  
      r1.value \= Math.round(p1);  
      updateBounds();  
      const Sclamped \= clamp(total, \+r5.min, \+r5.max);  
      r5.value \= Math.round(Sclamped);  
      placeTags();  
      renderTable();  
      broadcast();  
    }

    // Commit handlers  
    function commitP1() {  
      const raw \= (p1El.value||'').trim(); if (\!raw) return;  
      const p1 \= Math.max(0, parseFloat(raw)); if (\!isFinite(p1)) return;  
      const d \= currentDecay;  
      rebuildFrom(p1, d);  
    }  
    function commitDecay() {  
      const raw \= (decayEl.value||'').trim(); if (\!raw) return;  
      let d \= parseFloat(raw); if (\!isFinite(d)) return;   
      d \= clamp(d, DECAY\_MIN, DECAY\_MAX);  
      currentDecay \= d;  
      const p1 \= Math.max(0, parseFloat(p1El.value||r1.value||'0'));  
      rebuildFrom(p1, d);  
    }

    // Slider interactions  
    function onDragP1(val) {  
      const p1 \= Math.max(0, val);  
      updateBounds();  
      const Sfixed \= clamp(+r5.value || 0, \+r5.min, \+r5.max);  
      const d \= solveDecay(p1, Sfixed);  
      currentDecay \= d;  
      rebuildFrom(p1, d);  
      r5.value \= Math.round(Sfixed);  
      placeTags();  
    }  
    function onDragTotal(Sval) {  
      const p1 \= \+r1.value || 0;  
      updateBounds();  
      const S \= clamp(Sval, \+r5.min, \+r5.max);  
      const d \= solveDecay(p1, S);  
      currentDecay \= d;  
      rebuildFrom(p1, d);  
      r1.value \= Math.round(p1);  
      placeTags();  
    }

    // Events  
    p1El.addEventListener('keydown', e \=\> { if (e.key \=== 'Enter') commitP1(); });  
    p1El.addEventListener('blur', commitP1);  
    decayEl.addEventListener('input', commitDecay);  
    decayEl.addEventListener('change', commitDecay);  
    decayEl.addEventListener('keydown', e \=\> { if (e.key \=== 'Enter') commitDecay(); });  
    decayEl.addEventListener('blur', commitDecay);  
    r1.addEventListener('input', () \=\> onDragP1(parseFloat(r1.value)));  
    r5.addEventListener('input', () \=\> onDragTotal(parseFloat(r5.value)));

    // Spinners  
    p1Up.addEventListener('click', () \=\> { p1El.value \= Math.round(+p1El.value||0) \+ 1; commitP1(); });  
    p1Down.addEventListener('click', () \=\> { p1El.value \= Math.max(0, Math.round(+p1El.value||0) \- 1); commitP1(); });  
    dUp.addEventListener('click', () \=\> {  
      currentDecay \= clamp(currentDecay \+ 0.001, DECAY\_MIN, DECAY\_MAX);  
      decayEl.value \= currentDecay.toFixed(3);  
      const p1 \= Math.max(0, parseFloat(p1El.value||r1.value||'0'));  
      rebuildFrom(p1, currentDecay);  
      commitDecay();  
    });  
    dDown.addEventListener('click', () \=\> {  
      currentDecay \= clamp(currentDecay \- 0.001, DECAY\_MIN, DECAY\_MAX);  
      decayEl.value \= currentDecay.toFixed(3);  
      const p1 \= Math.max(0, parseFloat(p1El.value||r1.value||'0'));  
      rebuildFrom(p1, currentDecay);  
      commitDecay();  
    });

    // Resize observer  
    const ro \= new ResizeObserver(() \=\> placeTags());  
    ro.observe(host);

    // Initialization function  
    function performInit() {  
      isInitializing \= true;  
      console.log('\[PriceWidget\] 🚀 Initializing...');

      const preloaded \= preloadFromAttributes();  
      if (\!preloaded) {  
        console.log('\[PriceWidget\] 📝 Using default values');  
        const p1 \= 100, d \= 0.95;  
        currentDecay \= d;  
        nightly \= Array(N).fill(0);  
        nightly\[0\] \= p1;   
        for (let i=1;i\<N;i++) nightly\[i\] \= roundUp(nightly\[i-1\]\*d);  
        r1.value \= Math.round(p1);   
        r5.value \= Math.round(sumSeries(p1,d));  
      }  
        
      syncUI();  
      isInitializing \= false;  
      console.log('\[PriceWidget\] ✅ Initialization complete');

      setTimeout(runSelfTests, 0);  
    }

    // Listen for external trigger from Bubble workflow  
    host.addEventListener('bubble-data-ready', () \=\> {  
      console.log('\[PriceWidget\] 📡 Received bubble-data-ready event, reinitializing...');  
      performInit();  
    });

    // Initial load with smart retry  
    (function init(){  
      // Check if data exists immediately  
      const hasData \= host.dataset.n2 || host.dataset.n3 || host.dataset.n4 || host.dataset.n5;  
        
      if (hasData) {  
        console.log('\[PriceWidget\] ✅ Data available immediately');  
        performInit();  
      } else {  
        console.log('\[PriceWidget\] ⏳ No data found, waiting 150ms for Bubble to render...');  
        setTimeout(() \=\> {  
          const hasDataNow \= host.dataset.n2 || host.dataset.n3 || host.dataset.n4 || host.dataset.n5;  
          if (hasDataNow) {  
            console.log('\[PriceWidget\] ✅ Data now available after delay');  
          } else {  
            console.log('\[PriceWidget\] ⚠️ Still no data after delay, using defaults');  
          }  
          performInit();  
        }, 150);  
      }  
    })();

    // Self tests  
    function runSelfTests(){  
      const results \= \[\];  
      const assert \= (name, cond) \=\> {   
        results.push({ name, pass: \!\!cond });   
        console\[cond ? 'log' : 'error'\]((cond?'✅ PASS: ':'❌ FAIL: ')+name);   
      };  
      try {  
        assert('Table renders 5 rows', rows.children.length \=== 5);  
        const before \= currentDecay; dDown.click(); const after \= currentDecay;  
        assert('dDown decreases decay or clamps at min', after \<= before && after \>= DECAY\_MIN);  
        const beforeUp \= currentDecay; dUp.click(); const afterUp \= currentDecay;  
        assert('dUp increases decay or clamps at max', afterUp \>= beforeUp && afterUp \<= DECAY\_MAX);  
        assert('Nightly values finite', Array.isArray(nightly) && nightly.length \=== N && nightly.every(Number.isFinite));  
      } catch (e) {   
        console.error('❌ Self-tests error', e);   
      }  
    }  
  })();  
  \</script\>  
\</body\>  
\</html\>

END OF DOCUMENT

For questions or support, refer to the Bubble editor’s original  
Implementation in the “self-listing” page, specifically the  
“HTML price slider control” element within “G: slider container”.  
