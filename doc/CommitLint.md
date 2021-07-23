# CommitLint
代码提交规范

## 规范
- 提交格式（注意冒号后面有空格）
  ~~~
    <type>: <subject>
  ~~~
- 常用的type类别
  ~~~
    upd：更新某功能（不是 feat, 不是 fix）
    feat：新功能（feature）
    fix：修补bug
    docs：文档（documentation）
    style： 格式（不影响代码运行的变动）
    refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    test：增加测试
    chore：构建过程或辅助工具的变动
  ~~~
- 例子：
    ~~~
    git commit -m 'feat: 增加 xxx 功能'
    git commit -m 'bug: 修复 xxx 功能'
    ~~~
## 库
    ~~~
    npm install --save-dev @commitlint/config-conventional @commitlint/cli
    ~~~

## 参考资料
- [前端代码风格自动化系列（一）之Husky](https://segmentfault.com/a/1190000017790500?utm_source=sf-similar-article)
- [前端代码风格自动化系列（二）之Commitlint](https://segmentfault.com/a/1190000017790694)
- [husky doc](https://typicode.github.io/husky/#/)
- [husky npm](https://www.npmjs.com/package/husky)
- [commitlint npm](https://www.npmjs.com/package/@commitlint/config-conventional)
- [commitlint org](https://commitlint.js.org/#/)