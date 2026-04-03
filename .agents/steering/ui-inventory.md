# Design System Specification: The Kinetic Monolith

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Intelligent Void."** 

> [!NOTE]
> All design-related assets, including supporting **HTML code and images**, are located under the `ui/` directory. Use these files as a primary reference for UI implementation.

In professional creative tools, the UI should never compete with the user’s work. Instead, it acts as a high-precision instrument panel that recedes into the background until summoned. We move beyond the "standard SaaS" look by embracing a "Pro-Tool" ethos: high density, tactical precision, and tonal depth. 

This system breaks the "template" look by eschewing traditional lines in favor of **Tonal Sculpting**. By using varying shades of near-black and charcoal, we create a sense of infinite space and focused intensity. The interface is not a flat web page; it is a layered, physical console built for speed and intelligence.

---

## 2. Colors: Tonal Sculpting
The palette is rooted in deep, obsidian neutrals to maximize focus, accented by high-energy "AI Violet" and "Electric Blue" to signify intelligence and action.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for structural sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` panel sitting on a `surface` background creates a clean, sophisticated edge that feels integrated rather than boxed in.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested, physical layers. 
- **Base Level:** `surface` (#0e0e0f)
- **Primary Layout Blocks:** `surface-container-low` (#131314)
- **Interactive Panels:** `surface-container` (#19191b)
- **Active Overlays:** `surface-container-highest` (#262627)

### The "Glass & Gradient" Rule
To elevate the "Pro-Tool" aesthetic, floating elements (modals, dropdowns, popovers) must use **Glassmorphism**. Apply `surface-container-high` at 80% opacity with a `20px` backdrop blur. 

### Signature Textures
Main CTAs should avoid flat fills. Use a subtle linear gradient: 
- `primary` (#a3a6ff) to `primary-dim` (#6063ee) at a 135° angle. 
This provides a "lithographic" quality that feels premium and intentional.

---

## 3. Typography: The Editorial Grid
We utilize **Inter** with tight tracking (`-0.02em`) to achieve a compact, "engineered" look.

*   **Display (lg/md/sm):** High-impact, Semi-Bold. Used for hero moments or data-heavy dashboard headers.
*   **Headline & Title:** Medium weight. These serve as the primary anchors for navigation and section headers.
*   **Body (lg/md/sm):** Regular weight. Designed for maximum legibility in dense toolbars and property panels.
*   **Labels (md/sm):** Bold, All-Caps with `+0.05em` tracking. Used for micro-copy, button labels, and metadata to provide an "instrumental" feel.

The hierarchy conveys the brand identity by using size and weight contrast rather than color, ensuring the "Pro-Tool" precision is maintained.

---

## 4. Elevation & Depth
In this design system, depth is a function of light and layer, not structural lines.

### The Layering Principle
Achieve hierarchy by "stacking" surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift. This mimics the way matte materials overlap in the physical world.

### Ambient Shadows
For floating panels (Drawers, Context Menus):
- **Blur:** 32px to 64px.
- **Opacity:** 4% - 8%.
- **Color:** Use a tinted shadow based on `on-surface` (#ffffff) to mimic ambient light bouncing off the dark surfaces, avoiding "muddy" grey shadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use a **Ghost Border**:
- Token: `outline-variant` (#484849)
- Opacity: 15% - 20%
- **Rule:** Never use 100% opaque borders for containment.

---

## 5. Components: Functional Precision

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-dim`), White text, `xl` (12px) roundedness.
- **Secondary:** Surface-tinted. `surface-container-highest` background with `on-surface` text.
- **Tertiary:** Ghost style. No background; `primary` text. Use for low-priority actions.

### Input Fields
Avoid "box" styles. Use `surface-container-low` with a bottom-weighted `Ghost Border`. When focused, transition the border to `primary` with a 2px outer glow.

### Cards & Lists
**Strict Rule:** No divider lines. Separate list items using `8px` of vertical white space or subtle background shifts (alternating `surface-container` and `surface-container-low`).

### Navigation (The Utility Dock)
The sidebar should be icon-heavy, using `surface-container-lowest` (#000000) to create a "void" effect that anchors the rest of the UI. Icons should use `on-surface-variant` and switch to `primary` on active states.

### Tooltips
High-contrast. Background: `inverse-surface` (#fcf8f9), Text: `inverse-on-surface` (#555556). These should feel like small "light pips" appearing over the dark UI.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `8px` (lg) to `12px` (xl) corner radii to soften the "Pro" aesthetic and make it feel modern and collaborative.
*   **Do** use asymmetrical layouts for headers to break the grid and create an editorial feel.
*   **Do** prioritize icons for frequent actions to keep the workspace clean.

### Don't
*   **Don't** use pure white (#ffffff) for large blocks of text; use `on-surface-variant` (#acaaab) for body copy to reduce eye strain.
*   **Don't** use standard 1px borders to separate the sidebar from the main canvas. Use a tonal shift from `surface-container-low` to `surface`.
*   **Don't** use aggressive animations. Transitions should be fast (150ms-200ms) and use "Ease-Out-Expo" for a snappy, high-performance feel.
