const fs = require('fs');
const path = require('path');

const jsDir = 'C:\\Tools\\solpyagent\\js';
const files = fs.readdirSync(jsDir);

for (const file of files) {
    if (file.endsWith('.js')) {
        const filePath = path.join(jsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        const target = 'src:"/pump.fun-wordmark.svg"';
        const replacement = 'src:"https://pump.fun/pump-logomark.svg?dpl=dpl_3FfL7Lj8awkMMgJQvepRZdzzuztJ"';

        if (content.includes(target)) {
            content = content.replace(target, replacement);
            modified = true;
        }

        // Just in case it was encoded differently
        const target2 = 'src:"/Robinhood-wordmark.svg"';
        if (content.includes(target2)) {
            content = content.replace(target2, replacement);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated image in: ${filePath}`);
        }
    }
}
