---
layout: default
title: Search
---

# 🔎 Search

<div style="max-width: 800px; margin: 2rem auto;">
  
  <div class="search-container">
    <div style="position: relative; margin-bottom: 2rem;">
      <input 
        type="text" 
        id="searchInput" 
        placeholder="Search Bible studies, questions, and resources..." 
        style="width: 100%; padding: 1rem 3rem 1rem 1.2rem; font-size: 1.1rem; border: 2px solid var(--border); border-radius: 12px; background: var(--bg-secondary); color: var(--text-primary); transition: all 0.3s ease;"
        autocomplete="off"
      >
      <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.5rem; opacity: 0.5;">🔍</span>
    </div>

    <div id="searchStats" style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;"></div>

    <div id="searchResults"></div>

    <div id="quickNav" class="cardish" style="margin-top: 2rem;">
      <h3>Quick Navigation</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.8rem; margin-top: 1rem;">
        <a href="/bs/" style="padding: 0.8rem; background: var(--bg-accent); border-radius: 8px; text-decoration: none; color: var(--text-primary); transition: all 0.2s; border: 1px solid var(--border);">📖 Bible Study Portal</a>
        <a href="/bs/ar/" style="padding: 0.8rem; background: var(--bg-accent); border-radius: 8px; text-decoration: none; color: var(--text-primary); transition: all 0.2s; border: 1px solid var(--border);">📅 Annual Reading</a>
        <a href="/bs/sq/" style="padding: 0.8rem; background: var(--bg-accent); border-radius: 8px; text-decoration: none; color: var(--text-primary); transition: all 0.2s; border: 1px solid var(--border);">❓ Study Questions</a>
        <a href="/bs/ds/" style="padding: 0.8rem; background: var(--bg-accent); border-radius: 8px; text-decoration: none; color: var(--text-primary); transition: all 0.2s; border: 1px solid var(--border);">🔍 Deep Study</a>
        <a href="/tech/" style="padding: 0.8rem; background: var(--bg-accent); border-radius: 8px; text-decoration: none; color: var(--text-primary); transition: all 0.2s; border: 1px solid var(--border);">💻 Technology</a>
      </div>
    </div>

  </div>
</div>

<style>
#searchInput:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-result {
  background: var(--bg-secondary);
  border: 2px solid var(--border);
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.search-result:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px var(--shadow);
  transform: translateY(-2px);
}

.search-result h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.search-result h3 a {
  color: var(--text-primary);
  text-decoration: none;
}

.search-result h3 a:hover {
  color: var(--primary);
}

.search-result p {
  color: var(--text-secondary);
  margin: 0.5rem 0;
  line-height: 1.6;
}

.search-result .search-url {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: monospace;
}

.highlight {
  background: rgba(99, 102, 241, 0.2);
  padding: 0.1rem 0.2rem;
  border-radius: 3px;
  font-weight: 600;
}

#quickNav a:hover {
  background: var(--bg-secondary);
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
}
</style>

<script>
let searchData = [];
let searchIndexLoaded = false;

// Load search data
fetch('/search.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Search index not found (HTTP ' + response.status + ')');
    }
    return response.json();
  })
  .then(data => {
    searchData = data.pages || data;
    searchIndexLoaded = true;
    document.getElementById('searchStats').innerHTML = '<span style="color: #10b981;">✓ Search ready - ' + searchData.length + ' pages indexed</span>';
    console.log('Search index loaded:', searchData.length, 'pages');
    
    // If there's a search query already, perform search
    const currentQuery = document.getElementById('searchInput').value;
    if (currentQuery) {
      performSearch(currentQuery);
    }
  })
  .catch(error => {
    console.error('Error loading search data:', error);
    document.getElementById('searchStats').innerHTML = `
      <div class="cardish" style="background: rgba(220, 38, 38, 0.05); border-color: #dc2626; padding: 1rem; margin-bottom: 1rem;">
        <p style="color: #dc2626; margin: 0 0 0.5rem 0; font-weight: 600;">⚠️ Search is temporarily unavailable</p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
          The search index will be available after the site is built on GitHub Pages. 
          Please use the Quick Navigation below to browse content.
        </p>
      </div>
    `;
    document.getElementById('searchInput').disabled = true;
    document.getElementById('searchInput').placeholder = 'Search unavailable - use Quick Navigation below';
    document.getElementById('quickNav').style.display = 'block';
  });

// Search function
function performSearch(query) {
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('searchResults');
  const statsDiv = document.getElementById('searchStats');
  const quickNav = document.getElementById('quickNav');
  
  // Check if search index is loaded
  if (!searchIndexLoaded) {
    return;
  }
  
  if (!query || query.trim().length < 2) {
    resultsDiv.innerHTML = '';
    if (searchIndexLoaded) {
      statsDiv.innerHTML = '<span style="color: #10b981;">✓ Search ready - ' + searchData.length + ' pages indexed</span>';
    }
    quickNav.style.display = 'block';
    return;
  }

  quickNav.style.display = 'none';
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  const results = searchData.filter(page => {
    const searchableText = (page.title + ' ' + page.content).toLowerCase();
    return searchTerms.every(term => searchableText.includes(term));
  }).map(page => {
    // Calculate relevance score
    let score = 0;
    const titleLower = page.title.toLowerCase();
    searchTerms.forEach(term => {
      if (titleLower.includes(term)) score += 10;
      if (page.content.toLowerCase().includes(term)) score += 1;
    });
    return { ...page, score };
  }).sort((a, b) => b.score - a.score);

  // Display results
  if (results.length === 0) {
    statsDiv.innerHTML = `No results found for "<strong>${escapeHtml(query)}</strong>"`;
    resultsDiv.innerHTML = `
      <div class="cardish" style="text-align: center; padding: 2rem; opacity: 0.7;">
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">😕 No matches found</p>
        <p style="color: var(--text-secondary);">Try different keywords or browse using Quick Navigation below</p>
      </div>
    `;
    quickNav.style.display = 'block';
    return;
  }

  statsDiv.innerHTML = `Found <strong>${results.length}</strong> result${results.length !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>"`;
  
  resultsDiv.innerHTML = results.map(result => {
    const highlightedTitle = highlightText(result.title, searchTerms);
    const highlightedExcerpt = highlightText(result.excerpt, searchTerms);
    
    return `
      <div class="search-result">
        <h3><a href="${result.url}">${highlightedTitle}</a></h3>
        <p class="search-url">${result.url}</p>
        <p>${highlightedExcerpt}</p>
      </div>
    `;
  }).join('');
}

// Highlight matching terms
function highlightText(text, terms) {
  let highlighted = escapeHtml(text);
  terms.forEach(term => {
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    highlighted = highlighted.replace(regex, '<span class="highlight">$1</span>');
  });
  return highlighted;
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
  performSearch(e.target.value);
});

// Focus search input on page load
document.getElementById('searchInput').focus();

// Handle URL parameters (if someone links with ?q=search)
const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get('q');
if (queryParam) {
  document.getElementById('searchInput').value = queryParam;
  performSearch(queryParam);
}
</script>

---

<p style="text-align: center; margin-top: 3rem;">
  <a href="/">← Back to Home</a>
</p>
