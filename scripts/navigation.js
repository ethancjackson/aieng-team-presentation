/**
 * Presentation Navigation
 * Handles keyboard navigation, slide transitions, hash routing, and speaker notes
 */

(function() {
    'use strict';

    // Configuration
    const TOTAL_SLIDES = 17;
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
            <p>I'm excited to share my research background and vision for our work together.</p>`,
        
        1: `<h3>Slide 1: About Me</h3>
            <p>Quick journey through my career.</p>
            <p>Notice the recurring themes: evolutionary methods, memory systems, social AI.</p>`,
        
        2: `<h3>Slide 2: Three Research Themes</h3>
            <p>These represent a progression: individuals → populations → groups.</p>
            <p>Signal the arc early so transitions feel earned.</p>`,
        
        3: `<h3>Slide 3: The Memory Gap</h3>
            <p>Hendrycks et al. AGI framework shows memory as the primary deficit.</p>
            <p>Key addition: memory isn't just capability — it's learning from consequences over time.</p>`,
        
        4: `<h3>Slide 4: Transition — Neuroscience</h3>
            <p>[Pause] What can neuroscience teach us about memory and learning?</p>`,
        
        5: `<h3>Slide 5: Hippocampus</h3>
            <p>The hippocampus balances pattern separation with pattern completion.</p>`,
        
        6: `<h3>Slide 6: Pattern Separation & Completion</h3>
            <p>Two fundamental operations of episodic memory.</p>`,
        
        7: `<h3>Slide 7: Hippocampal DNN</h3>
            <p>Complementary learning systems: SLOW neocortex + FAST hippocampus.</p>`,
        
        8: `<h3>Slide 8: Engineering Memory for Agents</h3>
            <p>RAG-based architectures offer practical engineering solutions.</p>`,
        
        9: `<h3>Slide 9: Distributed TD Learning</h3>
             <p>Neuroscience-inspired learning: each layer learns independently.</p>
             <p>Local TD errors like dopamine signals. No backprop between layers.</p>`,
        
        10: `<h3>Slide 10: Transition — Evolution</h3>
             <p>Bridge from individual to population learning.</p>
             <p>"Memory helps agents learn from their own experience. What if we could learn from many agents at once?"</p>`,
        
        11: `<h3>Slide 11: LLM-guided Program Search</h3>
             <p>DGM and ProFiT show evolution works for code/agent search.</p>
             <p>Policies aren't just prompts — they can be programs.</p>`,
        
        12: `<h3>Slide 12: ES vs RL</h3>
             <p>ES explores parameter space, RL explores action space.</p>
             <p>ES has 15x lower variance and scales to 7B params with N=30.</p>`,
        
        13: `<h3>Slide 13: ES for LLM Fine-Tuning</h3>
             <p>Evolutionary principles scale from millions to billions of parameters.</p>
             <p>This result would surprise many people.</p>`,
        
        14: `<h3>Slide 14: Transition — Social Thesis</h3>
             <p>Bridge from population to social learning.</p>
             <p>"Evolution optimizes populations — but each agent is evaluated independently. What do we know about coordination and cooperation?"</p>`,
        
        15: `<h3>Slide 15: The Social Learning Thesis</h3>
             <p>Key contrast: RLHF creates behavioral dispositions, but the model learns what to say, not what it's like to cause harm.</p>
             <p>We can't engineer alignment into weights — we engineer environments and selection pressures.</p>
             <p>Three citations: risks from algorithms (PNAS), risks from interactions (DeepMind), the opportunity (sandbox economies).</p>`,
        
        16: `<h3>Slide 16: Interesting Directions + Closing</h3>
             <p>Three areas: Agentic Evals, Evolutionary Methods, Social Learning.</p>
             <p>Closing insight: Memory lets agents learn from experiences. Evolution lets them learn from each other's attempts. Social structure lets them learn why cooperation matters. We need all three.</p>`
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
