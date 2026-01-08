/**
 * Slide Loader
 * Dynamically loads slide HTML files into the presentation
 */

(function() {
    'use strict';

    const SLIDE_FILES = [
        'slides/00-title.html',
        'slides/01-about-me.html',
        'slides/02-thesis.html',
        'slides/03-agi-definition.html',
        'slides/04-memory-question.html',
        'slides/05-hippocampus-overview.html',
        'slides/06-pattern-separation.html',
        'slides/07-hippocampal-dnn.html',
        'slides/08-distributed-td.html',
        'slides/09-episodic-memory-rag.html',
        'slides/10-social-transition.html',
        'slides/11-social-coordination.html',
        'slides/12-darwin-godel.html',
        'slides/13-es-vs-rl.html',
        'slides/14-landscape-smoothing.html',
        'slides/15-alignment-evolution.html',
        'slides/16-vision.html',
        'slides/17-closing.html'
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
