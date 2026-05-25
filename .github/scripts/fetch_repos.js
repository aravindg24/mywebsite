const fs = require('fs');
const path = require('path');

// Configuration
const USERNAME = process.env.GITHUB_REPOSITORY_OWNER || 'aravindg24';
const TOKEN = process.env.GITHUB_TOKEN;

const HEADERS = {
    'User-Agent': 'node-fetch',
    'Accept': 'application/vnd.github+json'
};

if (TOKEN) {
    HEADERS['Authorization'] = `token ${TOKEN}`;
}

async function githubFetch(url) {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
        throw new Error(`GitHub API Error: ${res.status} ${res.statusText} at ${url}`);
    }
    return res.json();
}

function extractFirstParagraph(markdown) {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    for (let line of lines) {
        line = line.trim();
        // Skip markdown titles, dividers, blockquotes, images, or list items acting as titles
        if (line.startsWith('#') || line.startsWith('>') || line.startsWith('!') || line.startsWith('---') || line === '') {
            continue;
        }
        // Strip markdown syntax
        let clean = line
            .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Strip link syntax, keep text
            .replace(/[\*_`]/g, '') // Strip formatting characters (*, _, `)
            .trim();
            
        if (clean.length > 25) {
            if (clean.length > 250) {
                clean = clean.substring(0, 247) + '...';
            }
            return clean;
        }
    }
    return '';
}

async function main() {
    console.log(`🚀 Starting GitHub telemetry pipeline for user: ${USERNAME}...`);
    
    try {
        // 1. Fetch public repositories
        const reposUrl = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`;
        const repos = await githubFetch(reposUrl);
        
        console.log(`Fetched ${repos.length} public repositories.`);

        // 2. Filter inactive, fork, and archived repositories
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        const activeRepos = repos.filter(repo => {
            const pushedDate = new Date(repo.pushed_at);
            const isFork = repo.fork === true;
            const isArchived = repo.archived === true;
            const isRecent = pushedDate >= twelveMonthsAgo;
            return !isFork && !isArchived && isRecent;
        });

        // 3. Sort active repositories by pushed_at descending
        activeRepos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        console.log(`Filtered down to ${activeRepos.length} active repositories.`);

        if (activeRepos.length === 0) {
            console.log('⚠️ No active repositories found in the last 12 months.');
            fs.writeFileSync(path.join(__dirname, '../../projects.json'), JSON.stringify([], null, 2));
            fs.writeFileSync(path.join(__dirname, '../../featured.json'), JSON.stringify({}, null, 2));
            return;
        }

        // 4. Generate projects.json list
        const projectsList = activeRepos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description provided.',
            html_url: repo.html_url,
            homepage: repo.homepage || '',
            language: repo.language || 'Plain Text',
            stars: repo.stargazers_count,
            updated_at: repo.pushed_at,
            topics: repo.topics || []
        }));

        // Write projects.json
        const projectsPath = path.join(__dirname, '../../projects.json');
        fs.writeFileSync(projectsPath, JSON.stringify(projectsList, null, 2));
        console.log(`✔ Generated projects.json at ${projectsPath}`);

        // 5. Gather rich details for the Featured Project (Most active/recently pushed)
        const featured = activeRepos[0];
        console.log(`🌟 Featured project selected: ${featured.name}`);

        let languagesBreakdown = {};
        let commitCount30Days = 0;
        let readmeSummary = '';

        // Fetch Language Distribution
        try {
            const langs = await githubFetch(featured.languages_url);
            const totalBytes = Object.values(langs).reduce((sum, val) => sum + val, 0);
            if (totalBytes > 0) {
                for (const [lang, bytes] of Object.entries(langs)) {
                    languagesBreakdown[lang] = parseFloat(((bytes / totalBytes) * 100).toFixed(1));
                }
            }
        } catch (err) {
            console.log(`Failed to fetch languages for ${featured.name}:`, err.message);
            // Fallback to primary language
            languagesBreakdown[featured.language || 'Plain Text'] = 100;
        }

        // Fetch Last 30 Days Commit Count
        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const sinceISO = thirtyDaysAgo.toISOString();
            
            const commitsUrl = `https://api.github.com/repos/${USERNAME}/${featured.name}/commits?since=${sinceISO}&per_page=100`;
            const commits = await githubFetch(commitsUrl);
            commitCount30Days = commits.length;
        } catch (err) {
            console.log(`Failed to fetch commit history for ${featured.name}:`, err.message);
            commitCount30Days = 1; // Default fallback
        }

        // Fetch README Paragraph Summary
        try {
            const readmeUrl = `https://api.github.com/repos/${USERNAME}/${featured.name}/readme`;
            const readmeRes = await githubFetch(readmeUrl);
            if (readmeRes.content) {
                const mdContent = Buffer.from(readmeRes.content, 'base64').toString('utf-8');
                readmeSummary = extractFirstParagraph(mdContent);
            }
        } catch (err) {
            console.log(`Failed to fetch README for ${featured.name}:`, err.message);
        }

        // Construct featured.json schema
        const featuredDetails = {
            name: featured.name,
            description: featured.description || 'No description provided.',
            html_url: featured.html_url,
            homepage: featured.homepage || '',
            language: featured.language || 'Plain Text',
            stars: featured.stargazers_count,
            updated_at: featured.pushed_at,
            topics: featured.topics || [],
            languages_breakdown: languagesBreakdown,
            commit_count_30_days: commitCount30Days,
            readme_summary: readmeSummary || featured.description || 'Access repository for complete details.'
        };

        // Write featured.json
        const featuredPath = path.join(__dirname, '../../featured.json');
        fs.writeFileSync(featuredPath, JSON.stringify(featuredDetails, null, 2));
        console.log(`✔ Generated featured.json at ${featuredPath}`);

    } catch (err) {
        console.error('❌ Critical Pipeline Failure:', err);
        process.exit(1);
    }
}

main();
