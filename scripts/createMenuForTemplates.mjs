/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import fs from 'fs-extra';

// 为了在开发模式用，我们不能把结果直接放进dist里
const templateDirectorySource = path.join(__dirname, '..', 'public', 'templates');
// const templateDirDist = path.join(__dirname, '..', 'build', 'templates');
const templates = (await fs.readdir(templateDirectorySource)).filter((item) => item.endsWith('.md'));
const menuContent = templates.join('\n');
await fs.writeFile(path.join(templateDirectorySource, 'menu.txt'), menuContent);
const commentsJSON = await fs.readJSON(path.join(templateDirectorySource, 'comment.json'));
for (const templateName of templates) {
  if (!commentsJSON[templateName]) {
    commentsJSON[templateName] = '';
  }
}
await fs.writeJSON(path.join(templateDirectorySource, 'comment.json'), commentsJSON);
