const fs = require('fs');
const path = require('path');

const dir = 'C:\\Tools\\solpyagent';

const replacements = [
    { pattern: /SolpyAgent/g, replacement: 'SolpyAgent' },
    { pattern: /solpyagent/g, replacement: 'solpyagent' },
    { pattern: /\bGloopy\b/g, replacement: 'Solpy' },
    { pattern: /\bgloopy\b/g, replacement: 'solpy' },
    { pattern: /\bGLOOPY\b/g, replacement: 'SOLPY' },
    { pattern: /pump.fun/gi, replacement: 'pump.fun' },
    { pattern: /pump.fun/gi, replacement: 'pump.fun' }
];

function processFiles(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
            processFiles(filePath);
        } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            for (const { pattern, replacement } of replacements) {
                if (pattern.test(content)) {
                    content = content.replace(pattern, replacement);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, content);
                console.log(`Updated: ${filePath}`);
            }
        }
    }
}

// Ensure the rename script renames any files with 'solpy' in their names
function renameFiles(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
            renameFiles(filePath);
        }
        
        if (file.toLowerCase().includes('solpy')) {
            const newFile = file.replace(/solpy/gi, match => {
                if (match === 'solpy') return 'solpy';
                if (match === 'Solpy') return 'Solpy';
                if (match === 'SOLPY') return 'SOLPY';
                return 'solpy';
            });
            fs.renameSync(filePath, path.join(directory, newFile));
            console.log(`Renamed: ${file} -> ${newFile}`);
        }
    }
}

processFiles(dir);
renameFiles(dir);
console.log("Rebranding complete.");
