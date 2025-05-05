# Auto-update File Annotation Paths Prompt

This prompt is designed to help you automatically check and update path information mentioned in the `introduction` annotations at the top of each file across your codebase. The tool will create a new file in the same directory as each processed file to log the changes.

## Features
1. **Locate File Annotations**: Scans all files in the codebase to identify the `introduction` annotations at the top of each file.
2. **Extract Path Information**: Extracts mentioned file names and paths from the annotations.
3. **Verify Path Validity**: Checks if the mentioned paths match the file's actual location.
4. **Update Annotation Paths**: Automatically corrects path information in the annotations if discrepancies are found.
5. **Generate Report**: Produces a new `.md` file in the same directory as each processed file, logging the changes (both previous and updated paths).

## Usage Instructions
1. Save the following script as a file (e.g., `updatePaths.js`).
2. Run the script to scan your codebase and automatically update the annotation paths.
3. Review the generated `.md` files in affected directories for detailed reports.

## Example Code
Here's a sample JavaScript implementation:

```javascript
const fs = require('fs');
const path = require('path');

function updateFilePaths(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
            updateFilePaths(fullPath); // Recursively process subdirectories
        } else if (file.endsWith('.js') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const updatedContent = content.replace(/Path: (.+)/, (match, p1) => {
                const newPath = path.relative(directory, fullPath);
                return `Path: ${newPath}`;
            });

            fs.writeFileSync(fullPath, updatedContent, 'utf-8');

            const reportPath = path.join(directory, 'Path_Update_Report.md');
            fs.appendFileSync(
                reportPath,
                `File: ${file}\nOld Path: ${p1}\nNew Path: ${newPath}\n\n`,
                'utf-8'
            );
        }
    });
}

updateFilePaths('./src'); // Replace with your codebase path
```