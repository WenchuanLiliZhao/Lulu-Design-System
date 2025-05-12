# Sprint 19 更新列表

## 旧代码更新

- **对象形状命名规则改变**：为了方便区分 type 以及对象形状，所有的 `interface` 类型的命名规则的尾缀从 `Type` 改为 `Shape`，例如：`PageType` 改为 `PageShape`，而原有的 `PageType` 则用来定义页面的 `type`（例如，database、dataset 等）。
- **将 `PageShape` 中的可选属性 `info.icon` 替换为必须属性 `info.type`**：`info.icon` 是一个有限集合，用作识别页面的类型（例如，database、dataset 等）。
- **根据 `info.type` 决定页面使用什么 icon**：新增组件 `<PageIcon icon={page.info.type}>`，根据其中的 argument `icon` 识别页面的类型（例如，database、dataset 等），从而决定到底使用什么 icon。

## 新增模块