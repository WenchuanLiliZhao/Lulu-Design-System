# NetworkTopology 组件使用说明

## 新功能：节点排斥力控制

现在可以通过 slider 组件实时调节 topology 图中 nodes 之间的排斥力。

### 组件介绍

#### 1. RepulsionSlider
一个独立的滑块组件，用于调节排斥力数值。

特性：
- 支持自定义数值范围
- 实时显示当前数值
- 支持步长设置
- 响应式设计

#### 2. TopologyWithControls  
结合了 NetworkTopology 和 RepulsionSlider 的组合组件。

特性：
- 左上角显示控制面板
- 实时调节排斥力
- 保持原有的所有 topology 功能

### 使用方法

#### 使用 TopologyWithControls（推荐）
```tsx
import { TopologyWithControls } from '../../../Components/Tree/NetworkTopology/TopologyWithControls';

<TopologyWithControls 
  data={yourGraphData}
  width={800}
  height={600}
/>
```

#### 单独使用 RepulsionSlider
```tsx
import { RepulsionSlider } from '../../SmallElements/RepulsionSlider';

<RepulsionSlider
  initialValue={-150}
  minValue={-500}
  maxValue={-50}
  step={10}
  onChange={handleRepulsionChange}
  label="节点排斥力"
/>
```

#### 使用带排斥力控制的 NetworkTopology
```tsx
import NetworkTopology from './NetworkTopology';

<NetworkTopology
  data={yourGraphData}
  repulsionStrength={repulsionValue}
/>
```

### 参数说明

#### RepulsionSlider Props
- `initialValue`: 初始值（默认 -150）
- `minValue`: 最小值（默认 -500）
- `maxValue`: 最大值（默认 -50）
- `step`: 步长（默认 10）
- `onChange`: 值变化回调函数
- `label`: 标签文本

#### NetworkTopology 新增 Props
- `repulsionStrength`: 排斥力强度（负数值，绝对值越大排斥力越强）

### 排斥力数值说明
- **-50**: 很弱的排斥力，节点会聚集得比较紧密
- **-150**: 默认排斥力，平衡的节点分布
- **-300**: 较强的排斥力，节点分布相对松散
- **-500**: 很强的排斥力，节点会分布得很分散 