# NetworkTopology 组件使用说明

## 新功能：多参数控制面板

现在可以通过综合参数控制面板实时调节 topology 图中的多个关键参数。

### 组件介绍

#### 1. TopologyParaSlider
一个综合的参数控制组件，包含7个可调节的拓扑参数。

**可调节参数：**
- **节点排斥力** (repulsionStrength): 控制节点之间的排斥强度，值越小排斥越强
- **连接距离** (linkDistance): 控制连接节点之间的理想距离
- **速度衰减** (velocityDecay): 控制节点运动的阻尼，值越小节点移动越活跃
- **节点半径** (nodeRadius): 控制节点的显示大小和碰撞半径
- **初始缩放** (initialZoomLevel): 控制图表的初始缩放级别
- **仿真衰减** (alphaDecay): 控制仿真冷却速度，值越小仿真运行越久
- **碰撞半径** (collideRadius): 控制节点碰撞检测的额外半径

**特性：**
- 网格布局，响应式设计
- 实时数值显示
- 鼠标悬停参数说明
- 自动小数位数格式化
- 滚动条优化

#### 2. TopologyWithParameterControls  
结合了 NetworkTopology 和 TopologyParaSlider 的综合组件。

**特性：**
- 左上角显示参数控制面板
- 实时调节7个拓扑参数
- 半透明背景 + 毛玻璃效果
- 保持原有的所有 topology 功能

### 使用方法

#### 使用 TopologyWithParameterControls（推荐）
```tsx
import { TopologyWithParameterControls } from '../../../Components/Tree/NetworkTopology/TopologyWithParameterControls';

<TopologyWithParameterControls 
  treeData={yourTreeData}
  width={800}
  height={600}
/>
```

#### 单独使用 TopologyParaSlider
```tsx
import { TopologyParaSlider } from '../../SmallElements/TopologyParaSlider';

const [parameters, setParameters] = useState({
  repulsionStrength: -150,
  linkDistance: 80,
  velocityDecay: 0.2,
  // ... 其他参数
});

<TopologyParaSlider
  initialValues={parameters}
  onChange={setParameters}
/>
```

#### 使用带多参数控制的 NetworkTopology
```tsx
import NetworkTopology from './NetworkTopology';

<NetworkTopology
  treeData={yourTreeData}
  repulsionStrength={-150}
  linkDistance={80}
  velocityDecay={0.2}
  nodeRadius={20}
  initialZoomLevel={0.8}
  alphaDecay={0.00008}
  collideRadius={0.5}
/>
```

### 参数说明

#### TopologyParaSlider Props
- `initialValues`: 参数初始值对象（可选）
- `onChange`: 参数变化回调函数，接收完整的参数对象

#### NetworkTopology 新增 Props
- `repulsionStrength`: 排斥力强度（默认 -150）
- `linkDistance`: 连接距离（默认 80）
- `velocityDecay`: 速度衰减（默认 0.2）
- `nodeRadius`: 节点半径（默认 20）
- `initialZoomLevel`: 初始缩放（默认 0.8）
- `alphaDecay`: 仿真衰减（默认 0.00008）
- `collideRadius`: 碰撞半径（默认 0.5）

### 参数调节建议

#### 解决Vue版本组间距离过远问题：
1. **降低连接距离** (linkDistance): 从80降到40-60
2. **增强排斥力** (repulsionStrength): 从-150调到-100左右
3. **调节初始布局半径**: 检查Vue版本的初始定位逻辑
4. **优化仿真参数**: 适当增加alphaDecay到0.0002加快收敛

#### 常用参数组合：
- **紧密布局**: linkDistance=40, repulsionStrength=-100
- **松散布局**: linkDistance=120, repulsionStrength=-300
- **平衡布局**: linkDistance=80, repulsionStrength=-150（默认） 