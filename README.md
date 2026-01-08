# Memory, Social Intelligence, and the Path to Aligned AI

A web-based presentation for the Vector Institute AI Engineering team introducing research directions in agentic AI, episodic memory, evolutionary methods, and social AI.

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

## Project Structure

```
aieng-team-presentation/
├── index.html              # Main entry point (shell that loads slides)
├── slides/                 # Individual slide HTML files
│   ├── 00-title.html
│   ├── 01-about-me.html
│   ├── ...
│   ├── 19-closing.html
│   └── outtakes/           # Slides removed from presentation
├── scripts/
│   ├── slide-loader.js     # Dynamically loads slides into index.html
│   └── navigation.js       # Keyboard nav, progress bar, speaker notes
├── styles/
│   ├── base.css            # CSS variables, resets, typography
│   ├── slides.css          # Slide layouts and components
│   ├── diagrams.css        # SVG and diagram-specific styles
│   └── animations.css      # Keyframes and transitions
├── notes/
│   └── speaker-notes.md    # Detailed speaker notes (also in navigation.js)
└── source_material/        # Reference papers, PDFs, text extracts
```

---

## How to Edit This Presentation

### Adding/Editing a Slide

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

### Adding a New Slide

1. Create a new file in `slides/` with the next number
2. Add it to the `SLIDE_FILES` array in `scripts/slide-loader.js`
3. Update `TOTAL_SLIDES` in `scripts/navigation.js`
4. Update speaker notes in both:
   - `scripts/navigation.js` (the `speakerNotes` object)
   - `notes/speaker-notes.md` (for reference)

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
| `.citation-inline` | Inline citation styling |

---

## Cache Busting

When making CSS/JS changes, update the version query strings in `index.html`:

```html
<link rel="stylesheet" href="styles/base.css?v=28">
<script src="scripts/navigation.js?v=28"></script>
```

Increment the version number to force browsers to reload.

---

## Current Slide Structure (20 slides)

| # | File | Content |
|---|------|---------|
| 0 | `00-title.html` | Title slide |
| 1 | `01-about-me.html` | Career timeline |
| 2 | `02-thesis.html` | Three Pillars thesis |
| 3 | `03-agi-definition.html` | Memory Gap (Hendrycks) |
| 4 | `04-memory-question.html` | 🔹 Transition |
| 5 | `05-hippocampus-overview.html` | Hippocampus diagram |
| 6 | `06-pattern-separation.html` | Pattern Sep/Completion |
| 7 | `07-hippocampal-dnn.html` | DNN Architecture |
| 8 | `08-episodic-memory-rag.html` | Engineering Memory (RAG) |
| 9 | `09-plasticity-transition.html` | 🔹 Transition |
| 10 | `10-plasticity-modes.html` | Three Modes of Plasticity |
| 11 | `11-social-environments.html` | Social AI |
| 12 | `12-evolution-transition.html` | 🔹 Transition |
| 13 | `13-darwin-godel.html` | Evolutionary Program Search |
| 14 | `14-es-vs-rl.html` | ES vs RL comparison |
| 15 | `15-landscape-smoothing.html` | Game Agents → LLM |
| 16 | `16-agenda-transition.html` | 🔹 Transition |
| 17 | `17-applied-agenda.html` | Applied Research Agenda |
| 18 | `18-translation-impact.html` | Research Translation |
| 19 | `19-closing.html` | Closing |

---

## Source Materials

The `source_material/` folder contains reference papers and documents:

- `Team Meeting - Jan 12.pdf` - Original slide deck inspiration
- `ES_LLM_tuning.pdf` - Evolution Strategies for LLM fine-tuning
- `jackson_thesis_chapters.txt` - PhD thesis chapters on neuroevolution
- `pnas_paper.txt` - PNAS Nexus paper on emergent stereotyping
- `virtual_agent_economies.txt` - Tomašev et al. on agent economies
- `distributional_ai_safety.txt` - Distributional AGI safety paper
- Various PDFs on hippocampal memory, TD learning, etc.

---

## Tips for AI Agents Editing This Project

1. **Always check `slide-loader.js`** for the current slide order
2. **Slide IDs must be sequential** (0-indexed) and match file positions
3. **Test in browser** after major changes (use the browser tools)
4. **Update both speaker notes locations** (JS object + markdown file)
5. **Bump cache version** in `index.html` after CSS/JS changes
6. **Keep outtakes** in `slides/outtakes/` rather than deleting
7. **The presentation uses 4 CSS files** - check the right one:
   - `base.css` for variables and typography
   - `slides.css` for layouts and components
   - `diagrams.css` for SVGs and visualizations
   - `animations.css` for keyframes

---

## Author

**Ethan C. Jackson, PhD**  
Applied ML Scientist, Vector Institute  
ethan.jackson@vectorinstitute.ai
