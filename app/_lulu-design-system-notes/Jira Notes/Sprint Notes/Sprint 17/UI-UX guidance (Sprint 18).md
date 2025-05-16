# UI/UX guidance (Sprint 17)

## 综述

在 Sprint 17 中，我对整个 CDD 的官网首页进行了一番修改。以 Vite + React + Typescript demo 的形式发布到了 GitHub 上。（安装 demo 的方法参见这个 [GitHub Repo 的 README.md](https://github.com/WenchuanLiliZhao/Lulu-Design-System)。）

这个 demo 的设计宗旨是：**强调网站的易用性，而非其 UI 的个性化**。因此，UI 方面我仅仅参考了 GitHub 的网站设计，并且只设计了简单的配色方案；并且，在 UX 方面，强调了视觉元素的语义指向性，而并不在乎“是否能更好看”。

## 代码注释与 AI

我在许多文件上都写下了详细的注释；主要分为两类：

1. 文件综述：位于文件头部；
2. 行内注释：根据文件综述进行详细的功能进行介绍。

这些注释可以帮助你更好地修改代码，并且，可以帮助你或者 AI 对代码进行更准确得编译；例如，从 React 到 VUE 的编译。

根据本地测试结果，这些注释可以保证（大多数情况下）准确的代码编译。因此，请保证：**你的编辑器已经接入了 GPT 后者 Claude 等 AI**！

## Material Icons

在早期的版本中，我们并不自己设计 icons，而使用 Google 的 Material Design 团队的 icon 库。你可以在 https://fonts.google.com/icons 中查看如何使用这些 icon。

在当前代码库中，组件 `<Icon />`（位于 `Icon.tsx`）可以帮你直接生成以下结构：

```html
<span class="material-symbols-outlined">{icon}</span>
```

其中，`{icon}` 是一个 string。

它所对应的 VUE 的写法很简单，这里就不赘述了。

## 首先，让我们看看样式代码

该项目由 Vite + React + Typescript 构建。如果你所使用的是 VUE + Typescript，那么 repository 中，最重要的部分莫过于那些 `.scss` 文件了。首先，`_app.scss`（通过文件查询你可以轻松找到这个文件）是整个项目的通用样式部分。其中包括了样式重制，以及许多 CSS 变量，例如，字体、颜色、常用间距等。这样，如果你在未来需要进行响应式样式开发，那么，你只需要针对这些变量进行调试就可以了，而不需要在整个项目中逐一调整。

此外，大多数组件都对应了至少一个 `.module.scss` 文件。在易用性方面，有一半的设计思路都体现在这些 `.module.scss` 文件中。之所以在这些组件上使用 `.module.scss` 而不是 `.scss` 文件，是因为，它可以有效地隔离 html tags 的 class names，防止样式发生不必要的互相干涉或冲突。**（对于大型项目，这点尤其重要！）**

既然一半的的设计思路都体现在这些 `.module.scss` 中，而这个 demo 的首要任务是强调易用性，那么，可以说：**一半的易用性都体现在这些 `.module.scss` 中**——只有少部分不得不用 Javascript（Typescript）操作的部分除外。

因此，请慎重对待每一个 `.scss` 文件！

## 交互指南

以下，我将逐一写出当前 demo 的交互指南。

### Light/dark mode

在 navigation bar 上，我增加了一个切换 light/dark mode 的按钮。其中包含三个模式：

1. 适配系统
2. Light Mode
3. Dark Mode

你可以通过查找 `ThemeMenu.tsx` 开查看这个组件。

在适配系统的情况下，前端不会发生任何变化。但是，当我们在 light/dark mode 情况下，`<html>` 中的 `data-theme` 会发生相应变化：

```html
<html lang="en" data-theme="dark">
```

```html
<html lang="en" data-theme="light">
```

这是通过 Javascript（Typescript）实现的。其实现思路很简单，且全部集中在 `return` 之前的步骤上，这里就不赘述了。

至于 light/dark mode 所对应的色值变化，则全部存在于 `color.scss` 文件中，实现思路同样简单。

### Navigation

Navigation 的组件位于 `Nav.tsx` 中。其中没有什么特别值得注意的，唯独一点：

- **我在 `div.nav` 中增加了一个元素 `div.nav-bg`**。

这个元素是为了确保 Navigation 在 position 为 fixed 的情况下，依然可以占据一个纵向空间，使得页面的起始位置可以从 navigation 的底部开始，而不是页面顶部。这样就不需要在其他地方重新计算页面的 padding 或 margin。可以将问题简单化很多。

### Dropdown

Navigation 上有若干 dropdown。其主文件是 `Dropdown.tsx`。其中编写了详细的注释。你可以自己阅读它，也可以将它作为人工智能编译的参考。

注意事项如下：

1. 我是通过 class name `.open` 的 toggle 来实现 dropdown 的打开和关闭的。
2. 任何 dropdown 的元素只要包含 class name `.click-to-close`（存放于 const `ClickToClose` 中以便到处引用），那么，点击它就可以关闭 dropdown；即，去掉 class name `.open`。这部分代码由函数 `handleItemClick` 触发。
3. 点击 dropdown 外部的空间可以直接关闭 dropdown；即，去掉 class name `.open`。由函数 `handleClickOutside` 触发。
4. 每个 dropdown 中都包含 `unreadCount` 属性。但目前只有 message dropdown 使用了这个属性；但这并不代表这个属性以后不会被用到。

下面，我叙述目前几类不同的 dropdown。

#### Dropdown menu

主代码位于 `Menu.tsx` 中。注意事项如下：

1. Menu items 是被分组的。并且，group title 是一个可选项，即可以为 undefined；只有当 group title 被定义时，group title 才会被前端渲染。
2. 每一个 group item 都包含 class name `.click-to-close`。

#### Message box

即 navigation 上的通知。主文件位于 `MessageBox.tsx`。我在该文件中写了非常详细的 comment 用来介绍其基本功能。

### Search Bar

Search Bar 的主文件位于 `SearchBar.tsx`。其中，我放置了一个 search hint box，其中是分组的 search hints，由可选属性 `searchHintGroups` 所反应。`searchHintGroups` 必须是一个 XML 形式的东西，但同样可以为空。当它为空的时候，Search Bar 不会渲染任何 Search Hint。因此，你可以根据需要决定是否需要生成 Search Hints。

目前，我只设计了当每一个 hint 均为一个页面 link 的情况——这也是此类 search bar UX 中最常见的几种之一。此外，以 tag 搜索的功能我讲根据情况进行另外设计。

### Kanban

也就是搜索栏下面的两个 data list 区域。主文件位于 `KanbanGroup.tsx`。仅注意两点：

1. 当 list 为空时，需要展示占位图。


