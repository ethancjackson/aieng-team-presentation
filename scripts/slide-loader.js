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
        'slides/02-thesis.html',                    // Three Research Themes
        
        // Theme 1: Neuroscience-Inspired AI (3-9)
        'slides/03-agi-definition.html',
        'slides/04-memory-question.html',           // Transition: "What can neuroscience teach us?"
        'slides/05-hippocampus-overview.html',
        'slides/06-pattern-separation.html',
        'slides/07-hippocampal-dnn.html',
        'slides/08-episodic-memory-rag.html',
        'slides/09-distributed-td.html',            // Distributed TD Learning
        
        // Theme 2: Evolutionary Methods (10-13)
        'slides/10-evolution-transition.html',      // Transition: "Evolution in the LLM era"
        'slides/11-darwin-godel.html',              // LLM-guided Program Search
        'slides/12-es-vs-rl.html',                  // ES vs RL
        'slides/13-landscape-smoothing.html',       // ES for LLM fine-tuning
        
        // Theme 3: Social Learning Thesis (14-16)
        'slides/14-social-transition.html',         // Transition: "How do we ensure cooperation?"
        'slides/15-social-environments.html',       // Why Social Learning Matters
        'slides/16-applied-agenda.html'             // Interesting Directions + Closing
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
