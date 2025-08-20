// Yuan Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Code Block Copy Button
    addCopyButtonsToCodeBlocks();
    
    // Language Tags for Code Blocks
    initLanguageTags();
    
    // Table of Contents Smooth Scrolling and Mobile Toggle
    initTableOfContents();
    initMobileTocToggle();
    
    // TOC Active Section Tracking
    initTocActiveTracking();
    
    // Image Lazy Loading
    initLazyLoading();
    
    // Dark Theme Detection and Toggle
    initThemeToggle();
});

// Add copy buttons to code blocks
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentElement;
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        
        // Position the pre element relatively
        pre.style.position = 'relative';
        
        // Add copy button to pre element
        pre.appendChild(copyButton);
        
        // Copy functionality
        copyButton.addEventListener('click', function() {
            // Get text content excluding line numbers
            const textToCopy = getCodeContentWithoutLineNumbers(codeBlock);
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(function() {
                    showCopySuccess(copyButton);
                }).catch(function() {
                    fallbackCopyToClipboard(textToCopy, copyButton);
                });
            } else {
                fallbackCopyToClipboard(textToCopy, copyButton);
            }
        });
    });
}

// Extract code content without line numbers
function getCodeContentWithoutLineNumbers(codeBlock) {
    // Clone the code block to avoid modifying the original
    const clone = codeBlock.cloneNode(true);
    
    // Remove line number elements (Chroma generates these with class 'ln' or 'lnt')
    const lineNumbers = clone.querySelectorAll('.ln, .lnt, .lnlinks');
    lineNumbers.forEach(function(lineNumber) {
        lineNumber.remove();
    });
    
    // Also handle the case where line numbers are in table structure
    const lineNumberTables = clone.querySelectorAll('.lntable .lntd:first-child');
    lineNumberTables.forEach(function(td) {
        td.remove();
    });
    
    // Get the text content
    let textContent = clone.textContent || clone.innerText || '';
    
    // Clean up the text - remove empty lines at the beginning and end
    textContent = textContent.replace(/^\n+|\n+$/g, '');
    
    // If the content is still empty or only contains line numbers, 
    // fall back to a simpler approach
    if (!textContent.trim()) {
        // Try to get content by excluding elements with line number classes
        const lines = [];
        const textLines = (codeBlock.textContent || '').split('\n');
        
        // Simple heuristic: if line starts with numbers followed by whitespace,
        // try to extract just the code part
        textLines.forEach(function(line) {
            // Match pattern: optional whitespace + numbers + whitespace + actual code
            const match = line.match(/^\s*\d+\s+(.*)$/);
            if (match) {
                lines.push(match[1]);
            } else if (line.trim() && !/^\s*\d+\s*$/.test(line)) {
                // If line doesn't match number pattern and isn't just numbers, include it
                lines.push(line);
            }
        });
        
        if (lines.length > 0) {
            textContent = lines.join('\n');
        } else {
            // Final fallback - use original text content
            textContent = codeBlock.textContent || '';
        }
    }
    
    return textContent;
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
    `;
    button.classList.add('copied');
    
    setTimeout(function() {
        button.innerHTML = originalText;
        button.classList.remove('copied');
    }, 2000);
}

// Initialize Table of Contents smooth scrolling
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
    
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// Initialize mobile TOC toggle
function initMobileTocToggle() {
    const tocToggleBtn = document.querySelector('.toc-toggle-btn');
    const mobileToc = document.querySelector('.mobile-toc');
    
    if (tocToggleBtn && mobileToc) {
        tocToggleBtn.addEventListener('click', function() {
            mobileToc.classList.toggle('active');
            
            // Update button icon and text
            const isActive = mobileToc.classList.contains('active');
            const icon = tocToggleBtn.querySelector('svg');
            
            if (isActive) {
                tocToggleBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    隱藏目錄
                `;
            } else {
                tocToggleBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>
                    </svg>
                    目錄
                `;
            }
        });
    }
}

// Initialize theme toggle functionality
function initThemeToggle() {
    // This is a placeholder for future theme toggle functionality
    // Currently the theme is always dark, but this function can be extended
    // to support light/dark theme switching
    
    // Example implementation:
    /*
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('theme-light');
            document.body.classList.toggle('theme-dark');
            
            const isDark = document.body.classList.contains('theme-dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    */
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize TOC active section tracking
function initTocActiveTracking() {
    const tocLinks = document.querySelectorAll('.desktop-toc a[href^="#"], .mobile-toc a[href^="#"]');
    const headings = document.querySelectorAll('.post-content h2[id], .post-content h3[id], .post-content h4[id], .post-content h5[id], .post-content h6[id]');
    
    if (tocLinks.length === 0 || headings.length === 0) {
        console.log('TOC tracking: No links or headings found');
        return;
    }
    
    console.log('TOC tracking initialized with', tocLinks.length, 'links and', headings.length, 'headings');
    
    const updateActiveTocItem = debounce(function() {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const headerHeight = 70; // var(--header-height)
        
        // Calculate offset for determining active section
        const triggerOffset = scrollPosition + headerHeight + 100;
        
        let activeHeading = null;
        
        // Find the current active heading
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            const headingTop = heading.offsetTop;
            const nextHeading = headings[i + 1];
            const headingBottom = nextHeading ? nextHeading.offsetTop : document.body.scrollHeight;
            
            // Check if we're in this section
            if (triggerOffset >= headingTop && triggerOffset < headingBottom) {
                activeHeading = heading;
                break;
            }
        }
        
        // If no heading found by position, use the first heading if we're at the top
        if (!activeHeading && scrollPosition < headings[0].offsetTop) {
            activeHeading = headings[0];
        }
        
        // If still no heading and we're past the last heading, use the last one
        if (!activeHeading && scrollPosition >= headings[headings.length - 1].offsetTop) {
            activeHeading = headings[headings.length - 1];
        }
        
        // Remove all active classes
        tocLinks.forEach(link => {
            link.classList.remove('active');
            link.style.fontWeight = '';
        });
        
        // Add active class to current section
        if (activeHeading) {
            const activeId = activeHeading.id;
            console.log('Active heading:', activeId);
            
            // Find all matching links (both desktop and mobile)
            const activeLinks = document.querySelectorAll(`a[href="#${activeId}"]`);
            activeLinks.forEach(activeLink => {
                if (activeLink.closest('.toc')) {
                    activeLink.classList.add('active');
                    activeLink.style.fontWeight = '600';
                    
                    // Scroll TOC to show active item (only for desktop)
                    const toc = activeLink.closest('.desktop-toc');
                    if (toc && window.innerWidth > 1024) {
                        const tocRect = toc.getBoundingClientRect();
                        const linkRect = activeLink.getBoundingClientRect();
                        
                        // Check if the active link is outside the visible area
                        if (linkRect.top < tocRect.top + 20 || linkRect.bottom > tocRect.bottom - 20) {
                            const scrollOffset = activeLink.offsetTop - toc.offsetTop - (toc.clientHeight / 2);
                            toc.scrollTo({
                                top: scrollOffset,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
        }
    }, 50);
    
    // Initial call
    updateActiveTocItem();
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveTocItem);
    
    // Listen for resize events to recalculate positions
    window.addEventListener('resize', debounce(updateActiveTocItem, 200));
}


// Reading progress indicator
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;
    
    const updateProgress = debounce(function() {
        const article = document.querySelector('.post-content');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const progress = Math.min(
            Math.max(
                (windowTop - articleTop + windowHeight) / articleHeight,
                0
            ),
            1
        );
        
        progressBar.style.width = `${progress * 100}%`;
    }, 100);
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// Initialize language tags for code blocks
function initLanguageTags() {
    // Find all code blocks with data-lang attribute
    const codeBlocks = document.querySelectorAll('.highlight code[data-lang]');
    
    codeBlocks.forEach(function(codeBlock) {
        const highlight = codeBlock.closest('.highlight');
        const language = codeBlock.getAttribute('data-lang');
        
        if (highlight && language) {
            // Copy the data-lang attribute to the highlight container
            highlight.setAttribute('data-lang', language);
            
            console.log('Language tag set:', language, 'for highlight container');
        }
    });
}
