document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('schemesContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noResults = document.getElementById('noResults');
    const filterButtons = document.querySelectorAll('.results-filters button');

    let allSchemes = [];

    // Fetch schemes
    fetch('php/get-schemes.php', {
        method: 'GET' // Now supports GET or empty POST
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                allSchemes = data.schemes;
                renderSchemes(allSchemes);
                loadingSpinner.style.display = 'none';

                if (allSchemes.length === 0) {
                    noResults.style.display = 'block';
                } else {
                    container.style.display = 'grid';
                }
            } else {
                console.error('Error fetching schemes:', data.error);
                loadingSpinner.innerHTML = `<p style="color: red;">Error: ${data.message || 'Failed to load schemes.'}</p>`;
            }
        })
        .catch(err => {
            console.error('Network error:', err);
            loadingSpinner.innerHTML = '<p style="color: red;">Network error. Please try again.</p>';
        });

    // Handle Filtering
    window.filterSchemes = function (criteria) {
        // Update active button state
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === criteria) {
                btn.classList.add('btn-secondary');
                btn.classList.remove('btn-outline');
            } else {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-outline');
            }
        });

        if (criteria === 'all') {
            renderSchemes(allSchemes);
        } else {
            const filtered = allSchemes.filter(s => s.confidence === criteria);
            renderSchemes(filtered);
        }
    };

    function renderSchemes(schemes) {
        container.innerHTML = '';

        if (schemes.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; font-size: 1.2rem; padding: 40px;">No schemes match these criteria.</p>';
            return;
        }

        schemes.forEach((scheme, index) => {
            const confidenceColor = getConfidenceColor(scheme.confidence);
            const reasonsHtml = scheme.reasons.map(r => `
                <div class="reason-item">
                    <span style="color: #666;">${r}</span>
                </div>
            `).join('');

            // Format benefits - assuming it's a newline separated string or needs simple formatting
            // If benefits isn't an array in DB, we treat it as text. 
            // Ideally should be bullet points.
            let benefitsHtml = '';
            if (scheme.benefits) {
                benefitsHtml = scheme.benefits.split('\n').map(b => `<li>${b.replace(/^- /, '')}</li>`).join('');
            } else {
                benefitsHtml = '<li>Financial assistance and support</li>';
            }

            const card = document.createElement('div');
            card.className = 'scheme-card-new';
            // Set border color based on confidence? Optional.
            // card.style.borderLeftColor = confidenceColor;

            card.innerHTML = `
                <div class="card-header-row">
                    <div>
                        <div class="scheme-title">${scheme.name}</div>
                        <div class="category-pill">${scheme.category}</div>
                    </div>
                    <div class="confidence-box" style="background-color: ${getConfidenceBg(scheme.confidence)}; border-color: ${confidenceColor}40;">
                        <div class="confidence-label" style="color: ${confidenceColor}">Confidence Level</div>
                        <div class="confidence-value" style="color: ${confidenceColor}">
                            <span class="confidence-dot" style="background-color: ${confidenceColor}; box-shadow: 0 0 0 4px ${confidenceColor}33;"></span>
                            ${scheme.confidence.toUpperCase()}
                        </div>
                        <div class="confidence-sub">${getConfidenceText(scheme.confidence)}</div>
                    </div>
                </div>

                <div class="scheme-description">
                    ${scheme.description}
                </div>
                
                <div class="benefits-section">
                    <div class="benefits-title">👍 Benefits</div>
                    <ul class="benefits-list">
                        ${benefitsHtml}
                    </ul>
                </div>

                <div class="eligibility-toggle">
                    <div class="eligibility-header" onclick="toggleEligibility(this)">
                        ❓ Why Am I Eligible? (Click to view)
                    </div>
                    <div class="eligibility-content">
                        ${reasonsHtml}
                    </div>
                </div>

                <div class="card-actions">
                    <a href="scheme-details.php?id=${scheme.id}" class="btn-learn">Learn More</a>
                    <a href="${scheme.apply_url || '#'}" target="_blank" class="btn btn-primary">Apply Now</a>
                </div>
            `;
            container.appendChild(card);
        });

        // Remove grid if we want full width cards, or keep grid if responsive
        container.style.display = 'block'; // Stack them as per screenshot
    }

    // Helper for toggle
    window.toggleEligibility = function (header) {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    };

    function getConfidenceBg(level) {
        switch (level) {
            case 'high': return '#e8f5e9';
            case 'medium': return '#fff3e0';
            case 'low': return '#ffebee';
            default: return '#f5f5f5';
        }
    }

    function getConfidenceText(level) {
        switch (level) {
            case 'high': return 'Very Likely Eligible';
            case 'medium': return 'Likely Eligible';
            case 'low': return 'May be Eligible';
            default: return 'Check Details';
        }
    }

    function getConfidenceColor(level) {
        switch (level) {
            case 'high': return '#2e7d32'; // Green
            case 'medium': return '#f57c00'; // Orange
            case 'low': return '#d32f2f'; // Red
            default: return '#1a237e';
        }
    }

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
});
