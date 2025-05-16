# 如何在 `<TreeNodeComponent />` 中实现 Node 能见度调整？

## 交互

本文将要介绍如何在 TreeNodeComponent 中实现这个功能：通过改变 `<TreeNodeComponent />` 中的 item 的能见度调整页面上的对应的 node 的能见度——就如同 Figma 中的 Layer Explorer 与 Layers 之间的交互。

## 需求审视

首先，我们重审一下 Uncle Kano 的需求。因为该需求存在一些模糊之处。因此，在实现过程中，我们需要规避这种模糊导致的潜在问题，给出一个相对通用且较容易维护的方案。

Uncle Kano 的需求是：

1. layer tree 中所展现的应当是拓扑图中 nodes 的 tags，并且具有一定的层级关系；因此，当我们改变 sidebar 中的某个 node 的能见度时，所对应改变的其实应当拓扑图上的所有携带该 node 所对应的 tags 的 nodes 的能见度。
2. 此外，sidebar 中的那个由 tags 所组成的 tree 应当是由层级关系的。

其中子需求 2 似乎并不是一个十分常见的需求。因为，除非 tag 名中带有 `/`，tags 通常并不是一个具有层级关系集合。因此，在编程时，我们需要保证：

1. 允许 sidebar 中的 tags 有层级关系，但这种层级关系也可以是没有的（即所有 tags 都为 0 级）；
2. 我们需要通过前端处理（注意，不是数据端），使拓扑图中的 tags 带有一定的继承关系。

## 如何调用

其主要代码位于组件中 `<TreeNodeComponent />`。该组件通过 `<TreeExplorer />` 进行调用。当你将 `<TreeExplorer />` 中的参数 `useAs` 选择为 `"layer-tree"`，那么，你引用的 node tree 就会被前端渲染成一个 layer explorer，而不是一个 page explorer。

## 实现方法

### 步骤一：准备层级化数据
1. **`transformTreeNodes`**：
   - 入口数据为后端返回的 `TreeNodesShape[]`，其中 `children` 依旧是嵌套结构。
   - 递归添加 `level` 字段并重命名字段，最终生成扁平但带层级信息的 `NodeShape[]`。
2. **`mergeTagsOfTreeNodes`**：
   - 通过 DFS 遍历，将父节点 `tags` 与子节点 `tags` 去重合并，保证每个节点都记录从根到自身的所有 tag（"继承"链）。
   - 该字段稍后用于 DOM className 的拼接，便于批量选取。

### 步骤二：渲染 `TreeExplorer`

```tsx
<TreeExplorer
  data={mergeTagsOfTreeNodes(transformTreeNodes(rawData))}
  useAs="layer-tree"
/>
```

- `useAs` 决定交互模式：`"layer-tree"` = 只用左侧箭头折叠，节点本体切换可见性；`"page-tree"` = 点击节点本体即可折叠/展开。
- `expand`（可选）控制初始是否全部展开。

### 步骤三：`TreeNodeComponent` 结构

```typescript
<div class="tree-node {invisible?}">
  <div class="node" onClick={...}>            
    <div class="level-marker" />              
    <div class="node-clopener" onClick={...}> 
    <div class="node-content">                
      <div class="node-title">
      <div class="node-controls"> // 👈 节点能见度所在的视图
```

- **`isInvisible`**：控制当前节点及其子树的 DOM `display`。

### 步骤四：可见性切换逻辑
```ts
const toggleVisibility = (target = node.id) => {
  const els = document.querySelectorAll(`[class*="${NodeTagPrefix}-${target}"]`);
  els.forEach(el => (el as HTMLElement).style.display = isInvisible ? "" : "none");
  setIsInvisible(!isInvisible);
};
```

1. **class 约定**：`NodeList` 在渲染拓扑图节点时，把节点的 _所有 tag_ 拼成 `class="node-tag-{tag}"`。
2. 点击 Layer-Tree 中的可见性按钮后：
   - 通过 **属性选择器** 一次性找出所有带该 tag 的 DOM 元素。
   - 切换它们的 `display`，从而隐藏 / 显示拓扑图元素。
1. 同时更新本地状态 `isInvisible`，驱动 UI（图标、灰度样式等）。