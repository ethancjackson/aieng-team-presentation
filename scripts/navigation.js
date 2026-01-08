/**
 * Presentation Navigation
 * Handles keyboard navigation, slide transitions, hash routing, and speaker notes
 */

(function() {
    'use strict';

    // Configuration
    const TOTAL_SLIDES = 18;
    let currentSlide = 0;
    let speakerNotesVisible = false;

    // DOM Elements (will be queried after slides load)
    let slides;
    let progressFill;
    let slideCounter;
    let navHints;

    // Speaker notes content (mapped by slide index)
    const speakerNotes = {
        0: `<h3>Slide 0: Title</h3>
            <p>Welcome everyone, thank you for having me.</p>
            <p>I'm excited to share my research background and vision for our work together.</p>
            <p>This presentation covers three interconnected themes: memory, social intelligence, and alignment.</p>`,
        
        1: `<h3>Slide 1: About Me</h3>
            <p>Quick journey through my career.</p>
            <p>Notice the recurring themes: evolutionary methods, memory systems, social AI.</p>
            <p>Each step built toward understanding how intelligent systems can learn and adapt.</p>`,
        
        2: `<h3>Slide 2: Thesis Statement</h3>
            <p>This is the core argument I want to make today.</p>
            <p>Current AI has impressive capabilities but lacks two critical things:</p>
            <ul>
                <li>Memory: the ability to learn from experience over time</li>
                <li>Social accountability: the sense that actions have consequences</li>
            </ul>
            <p>These aren't nice-to-haves; I believe they're essential for alignment.</p>`,
        
        3: `<h3>Slide 3: The Memory Gap</h3>
            <p>The Hendrycks et al. paper provides a rigorous framework for measuring AGI progress.</p>
            <p>GPT-5 scores 57% toward AGI - impressive, but look where the gaps are.</p>
            <p>Almost all deficits are in memory-related dimensions.</p>
            <p>This isn't a bug in the models; it's a fundamental architectural limitation.</p>`,
        
        4: `<h3>Slide 4: The Question</h3>
            <p>[Pause for effect]</p>
            <p>This question drove much of my work at U of T Psychology.</p>
            <p>The brain has spent millions of years solving the memory problem.</p>`,
        
        5: `<h3>Slide 5: Hippocampus Overview</h3>
            <p>The hippocampus is remarkable - it sits at the top of the cortical hierarchy.</p>
            <p>Key regions each have specialized functions:</p>
            <ul>
                <li>EC is the gateway in and out</li>
                <li>DG creates sparse, separated representations</li>
                <li>CA3 stores the core engram and enables pattern completion</li>
            </ul>
            <p>This architecture is an evolutionary solution to a fundamental tradeoff.</p>`,
        
        6: `<h3>Slide 6: Pattern Separation & Completion</h3>
            <p>These are the two fundamental operations of episodic memory.</p>
            <p>Pattern separation: making similar things distinct (was it Tuesday or Wednesday?)</p>
            <p>Pattern completion: recalling the whole from a part.</p>
            <p>The hippocampus balances both through its anatomy.</p>`,
        
        7: `<h3>Slide 7: Hippocampal DNN</h3>
            <p>This is how we translate the biology into neural network architecture.</p>
            <p>Two pathways that alternate like the brain's theta rhythm.</p>
            <p>The key insight: you need separate phases for storing vs. retrieving.</p>`,
        
        8: `<h3>Slide 8: Distributed TD Learning</h3>
            <p>This is about making learning itself more biologically plausible.</p>
            <p>Standard backprop requires global error signals - the brain doesn't work this way.</p>
            <p>Distributed TD learning gives each layer its own local error signal.</p>
            <p>Think of it as "artificial dopamine" - local rewards, not global errors.</p>`,
        
        9: `<h3>Slide 9: Episodic Memory for RAG</h3>
            <p>Now let's connect this to practical systems.</p>
            <p>Key insight: memories aren't just facts, they're experiences with context and emotion.</p>
            <p>The "valence" field captures emotional significance.</p>
            <p>Question I'd love to see answered: What would AGI benchmarks look like for memory-enabled agents?</p>`,
        
        10: `<h3>Slide 10: Social Transition</h3>
             <p>[Brief pause]</p>
             <p>Now let's shift from individual cognition to social dynamics.</p>
             <p>Memory is necessary but not sufficient. What else do intelligent systems need?</p>`,
        
        11: `<h3>Slide 11: Social Coordination</h3>
             <p>This is research I co-authored at U of T.</p>
             <p>We found something counterintuitive: stereotypes emerge from coordination, not bias.</p>
             <p>The implication for AI: alignment isn't just about individual models.</p>
             <p>It's about the structure of interaction.</p>`,
        
        12: `<h3>Slide 12: Darwin Gödel Machine</h3>
             <p>This is exciting recent work on self-improving AI.</p>
             <p>Key innovation: it maintains an archive of diverse solutions.</p>
             <p>But notice: it requires validation, sandboxing, oversight.</p>
             <p>Self-improvement without accountability is dangerous.</p>`,
        
        13: `<h3>Slide 13: ES vs RL</h3>
             <p>This slide is a bit technical but important.</p>
             <p>ES explores in parameter space - one noise sample per trajectory.</p>
             <p>RL explores in action space - noise at every token.</p>
             <p>ES has dramatically lower variance - 15x in this study.</p>`,
        
        14: `<h3>Slide 14: Landscape Smoothing</h3>
             <p>This is a visual intuition for why ES works.</p>
             <p>RL navigates the raw, jagged reward landscape.</p>
             <p>ES effectively smooths it through Gaussian convolution.</p>
             <p>Open question: why does N=30 optimize 7 billion parameters?</p>`,
        
        15: `<h3>Slide 15: Alignment Through Evolution</h3>
             <p>This is where everything comes together.</p>
             <p>I don't believe we can hand-design alignment.</p>
             <p>What we can do is design environments where alignment is advantageous.</p>
             <p>Memory provides the capacity to learn from consequences.</p>
             <p>Social accountability provides the consequences to learn from.</p>`,
        
        16: `<h3>Slide 16: Vision</h3>
             <p>Looking ahead at Vector, I see three pillars.</p>
             <p>Memory systems: continuing the hippocampus-inspired work.</p>
             <p>Social intelligence: understanding multi-agent dynamics.</p>
             <p>Evolutionary alignment: using selection pressures to achieve robustness.</p>`,
        
        17: `<h3>Slide 17: Closing</h3>
             <p>[Return to thesis]</p>
             <p>Memory and social accountability - not optional features, but requirements.</p>
             <p>I'm excited to be here and to collaborate with all of you.</p>
             <p>Questions?</p>`
    };

    /**
     * Initialize the presentation
     */
    function init() {
        // Query DOM elements (slides are now loaded dynamically)
        slides = document.querySelectorAll('.slide:not(#slide-loading)');
        progressFill = document.getElementById('progressFill');
        slideCounter = document.getElementById('slideCounter');
        navHints = document.getElementById('navHints');
        
        // Check for hash in URL to start at specific slide
        handleHashChange();

        // Set up event listeners
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('hashchange', handleHashChange);
        
        // Touch support for mobile
        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });

        // Create speaker notes overlay
        createSpeakerNotesOverlay();

        // Hide nav hints after a delay
        setTimeout(() => {
            if (navHints) {
                navHints.style.opacity = '0.3';
            }
        }, 5000);
    }

    /**
     * Handle hash changes for direct slide navigation
     */
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash) {
            const slideNum = parseInt(hash.replace('#slide-', ''));
            if (!isNaN(slideNum) && slideNum >= 0 && slideNum < TOTAL_SLIDES) {
                currentSlide = slideNum;
            }
        }
        showSlide(currentSlide);
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(TOTAL_SLIDES - 1);
                break;
            case 's':
            case 'S':
                e.preventDefault();
                toggleSpeakerNotes();
                break;
            case 'Escape':
                if (speakerNotesVisible) {
                    toggleSpeakerNotes();
                }
                break;
            // Number keys for quick navigation (1-9)
            case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                e.preventDefault();
                goToSlide(parseInt(e.key) - 1);
                break;
            case '0':
                e.preventDefault();
                goToSlide(9); // 0 goes to slide 10
                break;
        }
    }

    /**
     * Navigate to next slide
     */
    function nextSlide() {
        if (currentSlide < TOTAL_SLIDES - 1) {
            goToSlide(currentSlide + 1);
        }
    }

    /**
     * Navigate to previous slide
     */
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }

    /**
     * Go to a specific slide
     */
    function goToSlide(index) {
        if (index < 0 || index >= TOTAL_SLIDES) return;
        
        currentSlide = index;
        showSlide(currentSlide);
        
        // Update URL hash without triggering hashchange
        window.history.replaceState(null, null, `#slide-${currentSlide}`);
    }

    /**
     * Display the specified slide
     */
    function showSlide(index) {
        // Update slide visibility
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update progress bar
        const progress = ((index + 1) / TOTAL_SLIDES) * 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        // Update slide counter
        if (slideCounter) {
            slideCounter.textContent = `${index + 1} / ${TOTAL_SLIDES}`;
        }

        // Update speaker notes if visible
        updateSpeakerNotes();
    }

    /**
     * Create speaker notes overlay
     */
    function createSpeakerNotesOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'speaker-notes-overlay';
        overlay.id = 'speakerNotes';
        document.body.appendChild(overlay);
    }

    /**
     * Toggle speaker notes visibility
     */
    function toggleSpeakerNotes() {
        speakerNotesVisible = !speakerNotesVisible;
        const overlay = document.getElementById('speakerNotes');
        if (overlay) {
            overlay.classList.toggle('visible', speakerNotesVisible);
            
            if (speakerNotesVisible) {
                updateSpeakerNotes();
            }
        }
    }

    /**
     * Update speaker notes content
     */
    function updateSpeakerNotes() {
        if (!speakerNotesVisible) return;
        
        const overlay = document.getElementById('speakerNotes');
        if (overlay) {
            const notes = speakerNotes[currentSlide] || '<p>No notes for this slide.</p>';
            overlay.innerHTML = notes;
        }
    }

    // Wait for slides to be loaded, then initialize
    document.addEventListener('slidesLoaded', init);
    
    // Fallback: if slides are already in DOM (static HTML), init now
    if (document.querySelectorAll('.slide').length > 1) {
        init();
    }

})();
