# Lulu Design System – 项目结构改进方案

> 本文汇总了针对当前仓库结构的优化建议，可按优先级逐步落地，而 **不必一次性重构**。

下面给出几个方向 — 从“先易后难、逐步演进”的角度整理出来。你可以按优先级逐步落地，而不是一次性全部改完。


## 一、顶层目录（仓库根）  

1. Mono-repo 拆分  
   • 当前把“组件库源码”和“演示站/沙盒”混在同一个 `app/` 里，会让发布、版本管理及依赖隔离略显混乱。  
   • 建议直接用 pnpm workspaces / turbo / Nx 把仓库拆成两个 package：  
     packages/  
       ├─ design-system   ← 纯 UI 组件、类型、样式，产物可以独立发布到 npm  
       └─ docs-site       ← Vite/Next/Storybook，专门做文档和演示  
   • 好处：组件库可以语义化发版，文档站跟随依赖即可；团队协作时也更清晰。

2. 配置集中化  
   • 把 ESLint、TSConfig、Prettier、Vitest/Jest、Storybook 等配置抽到根目录的 `configs/` 或直接根下，通过 `extends` 共享给每个 package，避免重复。  
   • 建议加上 `lint-staged` + `husky`，在 commit 时强校验。


## 二、src 目录内部  

（以下示例以 design-system 包为例）

1. 以“功能域（feature）”而非“技术类型”分层  
   目前：  
   ```
   src/
     Components/
     Pages/
     Functions/
     ObjectShapes/
   ```  
   改进：  
   ```
   src/
     components/        // 纯展示：Button、Dropdown……(atoms / molecules)
     hooks/             // 可复用逻辑
     utils/             // 与 UI 无关的工具，如日期格式化
     types/             // 所有 TS 类型 & 接口（原 ObjectShapes）
     assets/            // 图片、图标、全局样式
     themes/            // 设计-Token & 主题切换
   ```  
   • 页面级（如 Home、Demo）放到 docs-site 里；组件库保持“纯组件”。  
   • 如果未来组件很多，可以内部再按 Atomic Design（atoms/molecules/organisms）或业务域拆子目录，但要保持层级一致、命名统一。

2. 组件目录结构  
   ```
   components/
     Button/
       index.ts          // export { default } from './Button';
       Button.tsx
       Button.module.scss
       Button.test.tsx
       README.mdx        // Storybook 文档 (可选)
   ```  
   • **同一组件的源码、样式、测试、文档放在一起**，依赖最少、易于移动。  
   • `_Button.tsx` 这种前缀下划线命名可以统一改成 PascalCase 或 kebab-case；保持一致即可。

3. Type & Mock  
   • `ObjectShapes/*Shape.tsx` 基本只含接口，推荐移动到 `src/types/` 并改为 `.ts`。  
   • `ExampleData/` 更像 mock / fixture，搬到 `src/mocks/`。测试、Storybook & 演示页都可复用。  
   • 类型文件内尽量避免引入 React 依赖，保证“纯类型”。

4. 样式组织  
   • 继续使用 css-module 非常 OK；但建议给全局样式放单独目录 `src/styles/`。  
   • 全局变量（颜色、间距、阴影……）改写为 `scss` 中的 design-token，未来主题切换只动 token。  
   • 可以考虑把 `_reset.scss` 中的基础 reset、typography 等整理为 `base/`、`theme/` 两层，便于覆盖。

5. Barrel（聚合导出）  
   • 每个目录维护一个 `index.ts`，外部 `import { Dropdown } from '@design-system/components'` 即可。  
   • 顶层再建 `src/index.ts`：负责 re-export 所有公共 API，是真正对外暴露的单一入口。


## 三、工具链与发布  

1. 构建  
   • 对组件库使用 `tsup` / `rollup` 输出 cjs + esm + d.ts；Docs 站继续 Vite。  
   • tsconfig 建议打开 `paths` 并结合 vite/rollup 的 `alias`：  
     `"@components/*": ["src/components/*"]`

2. Storybook / Ladle  
   • 设计系统最佳拍档，可直接在 `docs-site` 下启 Storybook。把现有 `_DemoPages` 全量迁入 Storybook 的 stories。  
   • 每次组件修改都能即时在 docs 站显示。还能集成视觉回归测试。

3. 测试  
   • 组件层面用 `Vitest + Testing Library`；发布前跑 `vitest run --coverage`。  
   • 可配合 `chromatic` 做 UI 快照。

4. CI / Release  
   • GitHub Actions：`pnpm -r lint test build`  
   • `changesets` 自动生成 CHANGELOG 并发布 npm。  
   • 发布后 docs-site 自动 redeploy（Vercel / Netlify）。


## 四、命名与代码风格  

1. **全部统一大小写**  
   • 目录、小文件推荐 kebab-case（button, dropdown-menu）或保持全部 PascalCase；不要混用。  
   • 样式文件 `.module.scss` 与组件同名即可（`Button.module.scss`）。

2. **移除前缀下划线**  
   `_MainPages.tsx` ⇒ `main-pages.ts` 或者干脆拆成多个页。

3. **避免 `.tsx` 里只写类型**  
   • 纯类型文件改 `.ts`；`.tsx` 专注含有 JSX 的实现。


## 五、逐步迁移建议  

1) 先在当前仓库根初始化 `pnpm workspaces`，把 `app/` 平移为 `packages/design-system`。  
2) 创建 `apps/docs-site`，把现有 `Pages/`、Demo 页迁进去，跑通 Vite + React-Router。  
3) 把 `ObjectShapes/` 重命名为 `types/`，改后缀为 `.ts`，逐个修复 import。  
4) 按组件单元拆目录、补 barrel 导出；import 路径同时改为 '@design-system/...'.  
5) 引入 Storybook，边迁移边写 stories，顺便整理 SCSS token。  
6) 完成后再接入 CI、Changesets，正式 npm publish v1.0.0。


## 总结  

以上改动覆盖了  
• 目录层级清晰化  
• 组件、文档、演示解耦  
• 类型、Mock、样式各归其位  
• 构建、测试、发布流程标准化  

这些并不是一次性大重构；你可以从“加 barrel 文件、统一命名”这些轻量级任务开始，稳定后再拆 mono-repo、接 Storybook 和 CI。希望能帮你把 Lulu Design System 打造成一个“易用、易维护、易发布”的专业组件库！
