# Neuroscience, Evolution, and the Path to Aligned AI

A web-based presentation for the Vector Institute AI Engineering team introducing research directions in neuroscience-inspired AI, evolutionary methods, and social learning for aligned agentic AI.

## Quick Start

```bash
# Start a local server (required for dynamic slide loading)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

**Note:** The presentation uses dynamic JavaScript imports and will not work with `file://` URLs. You must use a local HTTP server.

## Navigation

| Key | Action |
|-----|--------|
| `→` / `↓` / `Space` / `PageDown` | Next slide |
| `←` / `↑` / `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `1-9`, `0` | Jump to slide 1-10 |
| `S` | Toggle speaker notes |
| `Esc` | Close speaker notes |

Touch/swipe also supported on mobile.

---

## Narrative Arc

The presentation tells a progressive story across three themes:

```
Individual Learning → Population Learning → Social Learning
```

1. **Neuroscience-Inspired AI** (Slides 3-9): How does ONE agent learn? Memory systems and learning algorithms from the brain.

2. **Evolutionary Methods** (Slides 10-13): How do MANY agents improve? Population-based optimization in the LLM era.

3. **Social Learning Thesis** (Slides 14-16): What if agents must INTERACT? Alignment through consequence-driven development.

Each theme builds on the previous — this progression should be preserved when editing.

---

## Project Structure

```
aieng-team-presentation/
├── index.html              # Main entry point (shell that loads slides)
├── presentation-text.txt   # Text-only version with figure descriptions
├── slides/                 # Individual slide HTML files (00-16)
│   ├── 00-title.html
│   ├── 01-about-me.html
│   ├── ...
│   ├── 16-applied-agenda.html
│   └── outtakes/           # Slides removed from presentation
├── scripts/
│   ├── slide-loader.js     # SLIDE_FILES array defines order
│   └── navigation.js       # TOTAL_SLIDES, speakerNotes object
├── styles/
│   ├── base.css            # CSS variables, resets, typography
│   ├── slides.css          # Slide layouts and components
│   ├── diagrams.css        # SVG and diagram-specific styles
│   └── animations.css      # Keyframes and transitions
├── notes/
│   └── speaker-notes.md    # Reference copy (authoritative notes in navigation.js)
└── source_material/        # Reference papers (gitignored, not in repo)
```

---

## Current Slide Structure (17 slides)

| # | File | Content |
|---|------|---------|
| 0 | `00-title.html` | Title slide |
| 1 | `01-about-me.html` | Career timeline |
| 2 | `02-thesis.html` | Three Research Themes + progression framing |
| | | **Theme 1: Neuroscience-Inspired AI** |
| 3 | `03-agi-definition.html` | Memory Gap (Hendrycks) + consequences connection |
| 4 | `04-memory-question.html` | 🔹 Transition: "What can neuroscience teach us?" |
| 5 | `05-hippocampus-overview.html` | Hippocampus diagram |
| 6 | `06-pattern-separation.html` | Pattern Sep/Completion |
| 7 | `07-hippocampal-dnn.html` | Complementary Learning Systems |
| 8 | `08-episodic-memory-rag.html` | Engineering Memory (RAG) |
| 9 | `09-distributed-td.html` | Distributed TD Learning |
| | | **Theme 2: Evolutionary Methods** |
| 10 | `10-evolution-transition.html` | 🔹 Bridge: "Learn from many agents at once" |
| 11 | `11-darwin-godel.html` | LLM-guided Program Search |
| 12 | `12-es-vs-rl.html` | ES vs RL comparison |
| 13 | `13-landscape-smoothing.html` | ES for LLM fine-tuning |
| | | **Theme 3: Social Learning Thesis** |
| 14 | `14-social-transition.html` | 🔹 Bridge: "What about coordination?" |
| 15 | `15-social-environments.html` | The Social Learning Thesis |
| 16 | `16-applied-agenda.html` | Interesting Directions + Closing |

---

## How to Edit This Presentation

### Editing a Slide

1. **Edit the slide file** in `slides/XX-name.html`
2. Each slide follows this structure:
   ```html
   <section class="slide" id="slide-X">
       <div class="slide-content">
           <h2 class="section-label">Title</h2>
           <!-- Content here -->
       </div>
   </section>
   ```
3. **Important:** The `id="slide-X"` must match the slide's position (0-indexed)
4. **Update speaker notes** in `scripts/navigation.js` (the `speakerNotes` object)
5. **Bump cache version** in `index.html` after changes

### Adding a New Slide

1. Create a new file in `slides/` with the next number
2. Add it to the `SLIDE_FILES` array in `scripts/slide-loader.js`
3. Update `TOTAL_SLIDES` in `scripts/navigation.js`
4. Add speaker notes to the `speakerNotes` object in `scripts/navigation.js`

### Removing a Slide

1. Move the file to `slides/outtakes/` (don't delete - keep for reference)
2. Remove from `SLIDE_FILES` in `scripts/slide-loader.js`
3. Renumber subsequent slide files AND their internal `id="slide-X"` attributes
4. Update `TOTAL_SLIDES` in `scripts/navigation.js`
5. Update speaker notes

### Reordering Slides

1. Rename files to new numbers
2. Update `id="slide-X"` inside each affected file
3. Update `SLIDE_FILES` order in `scripts/slide-loader.js`
4. Update speaker notes

---

## Slide Types & Styling

### Content Slides
```html
<section class="slide" id="slide-X">
    <div class="slide-content">
        <h2 class="section-label">TITLE IN CAPS</h2>
        <p class="slide-subtitle">Optional subtitle</p>
        <!-- Content -->
    </div>
</section>
```

### Transition Slides (Big Question)
```html
<section class="slide" id="slide-X">
    <div class="slide-content centered-content section-transition">
        <p class="big-question fade-in">Your question here?</p>
    </div>
</section>
```

### Common CSS Classes

| Class | Purpose |
|-------|---------|
| `.section-label` | Blue uppercase slide title |
| `.slide-subtitle` | Gray italic subtitle |
| `.fade-in` | Fade-in animation (use `style="--delay: N"` for stagger) |
| `.two-column` | Two-column layout |
| `.centered-content` | Vertically centered content |
| `.key-insight` | Highlighted insight box |
| `.key-quote` | Blockquote styling (use `.two-beats` for split quotes) |
| `.contrast-box` | Side-by-side comparison boxes |
| `.citation-inline` | Inline citation styling |
| `.context-item` | Research context citations |

---

## Cache Busting

When making CSS/JS changes, update the version query strings in `index.html`:

```html
<link rel="stylesheet" href="styles/base.css?v=39">
<script src="scripts/navigation.js?v=39"></script>
```

Increment the version number to force browsers to reload.

---

## Tips for AI Agents Editing This Project

### Essential Checks
1. **Always check `slide-loader.js`** for the current slide order (`SLIDE_FILES` array)
2. **Slide IDs must be sequential** (0-indexed) and match file positions
3. **Test in browser** after major changes — use hard refresh or bump cache version
4. **Update speaker notes** in `scripts/navigation.js` after content changes
5. **Bump cache version** in `index.html` after any CSS/JS changes

### File Locations
- **Slide order**: `scripts/slide-loader.js` → `SLIDE_FILES` array
- **Slide count**: `scripts/navigation.js` → `TOTAL_SLIDES` constant
- **Speaker notes**: `scripts/navigation.js` → `speakerNotes` object
- **Slide content**: `styles/slides.css` for most component styles

### Best Practices
- **Keep outtakes** in `slides/outtakes/` rather than deleting
- **Preserve the narrative arc** — transitions should bridge themes, not just change topics
- **Update `presentation-text.txt`** after content changes for text-only reference
- **Use existing CSS classes** before creating new ones — check `slides.css`

### The 4 CSS Files
- `base.css` — variables, resets, typography
- `slides.css` — layouts, components, most slide-specific styles
- `diagrams.css` — SVGs and visualizations
- `animations.css` — keyframes and transitions

---

## Text-Only Version

A compiled text-only version with figure descriptions is available at:

```
presentation-text.txt
```

Regenerate after content changes using terminal commands to extract text from HTML files.

---

## Author

**Ethan C. Jackson, PhD**  
Applied ML Scientist, Vector Institute  
ethan.jackson@vectorinstitute.ai
