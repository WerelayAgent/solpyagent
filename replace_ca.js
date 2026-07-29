const fs = require('fs');
const path = require('path');

function replaceAddress(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = path.join(dir, file);
        if (fs.statSync(fp).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== '.next') {
                replaceAddress(fp);
            }
        } else if (fp.endsWith('.js') || fp.endsWith('.html') || fp.endsWith('.css')) {
            let content = fs.readFileSync(fp, 'utf8');
            let original = content;
            
            // Rebrand address
            content = content.replace(/coming soon on pons/gi, 'coming soon on pons');
            
            if (content !== original) {
                fs.writeFileSync(fp, content);
                console.log('Fixed', fp);
            }
        }
    }
}
replaceAddress('.');
console.log('Done.');
