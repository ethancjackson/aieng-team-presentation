/**
 * Slide Loader
 * Dynamically loads slide HTML files into the presentation
 */

(function() {
    'use strict';

    const SLIDE_FILES = [
        // Intro Section (0-2)
        'slides/00-title.html',
        'slides/01-about-me.html',
        'slides/02-thesis.html',
        
        // Memory Section (3-8)
        'slides/03-agi-definition.html',
        'slides/04-memory-question.html',           // Transition: "What can neuroscience teach us?"
        'slides/05-hippocampus-overview.html',
        'slides/06-pattern-separation.html',
        'slides/07-hippocampal-dnn.html',
        'slides/08-episodic-memory-rag.html',       // Was: 09
        
        // Plasticity Section (9-11)
        'slides/09-plasticity-transition.html',     // Transition: "Memory is one mode..." (was: 10)
        'slides/10-plasticity-modes.html',          // Was: 11
        'slides/11-social-environments.html',       // Was: 12
        
        // Evolution Section (12-15)
        'slides/12-evolution-transition.html',      // Transition: "What's the alternative?" (was: 13)
        'slides/13-darwin-godel.html',              // Was: 14
        'slides/14-es-vs-rl.html',                  // Was: 15
        'slides/15-landscape-smoothing.html',       // Was: 16
        
        // Applied Agenda Section (16-19)
        'slides/16-agenda-transition.html',         // Transition: "How do we translate..." (was: 17)
        'slides/17-applied-agenda.html',            // Was: 18
        'slides/18-translation-impact.html',        // Was: 19
        'slides/19-closing.html'                    // Was: 20
    ];

    /**
     * Load all slides and inject into the container
     */
    async function loadSlides() {
        const container = document.getElementById('slidesContainer');
        
        if (!container) {
            console.error('Slides container not found');
            return;
        }

        try {
            // Load all slides in parallel (with cache busting)
            const cacheBuster = `?v=${Date.now()}`;
            const slidePromises = SLIDE_FILES.map(file => 
                fetch(file + cacheBuster).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${file}: ${response.status}`);
                    }
                    return response.text();
                })
            );

            const slideContents = await Promise.all(slidePromises);
            
            // Inject all slides
            container.innerHTML = slideContents.join('\n');
            
            // Dispatch event to signal slides are loaded
            document.dispatchEvent(new CustomEvent('slidesLoaded'));
            
        } catch (error) {
            console.error('Error loading slides:', error);
            container.innerHTML = `
                <section class="slide active" id="slide-0">
                    <div class="slide-content centered-content">
                        <h2>Error Loading Presentation</h2>
                        <p>${error.message}</p>
                        <p>Make sure you're running this from a local server, not file://</p>
                    </div>
                </section>
            `;
        }
    }

    // Load slides when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSlides);
    } else {
        loadSlides();
    }

})();
