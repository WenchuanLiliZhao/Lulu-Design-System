# 文件注释路径自动更新 Prompt

这个 Prompt 的目标是帮助你根据代码库的更新，检查并更新每个文件顶部 `introduction` 注释中的路径信息。以下是详细的操作步骤和逻辑：

## 功能说明
1. **定位文件注释**：扫描代码库中的所有文件，识别顶部的 `introduction` 注释。
2. **提取路径信息**：从注释中提取文件名和路径信息。
3. **验证路径是否有效**：根据文件的实际位置验证路径的正确性。
4. **更新注释路径**：如果路径发生变化，自动修改注释中的路径信息。
5. **生成报告文件**：在每个文件的同级目录创建一个新的 `.md` 文件，记录更新前后的路径变化。

## 使用方法
1. 将以下代码保存为一个脚本（例如 `updatePaths.js`）。
2. 运行脚本以扫描代码库，自动更新注释路径。
3. 查看生成的 `.md` 文件，确认更新结果。

## 示例代码
```javascript
const fs = require('fs');
const path = require('path');

function updateFilePaths(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
            updateFilePaths(fullPath); // 递归处理子目录
        } else if (file.endsWith('.js') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const updatedContent = content.replace(/路径: (.+)/, (match, p1) => {
                const newPath = path.relative(directory, fullPath);
                return `路径: ${newPath}`;
            });

            fs.writeFileSync(fullPath, updatedContent, 'utf-8');

            const reportPath = path.join(directory, '路径更新报告.md');
            fs.appendFileSync(
                reportPath,
                `文件: ${file}\n旧路径: ${p1}\n新路径: ${newPath}\n\n`,
                'utf-8'
            );
        }
    });
}

updateFilePaths('./src'); // 替换为你的代码库路径
```