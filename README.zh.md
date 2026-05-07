# Ken 站长工具

面向开发者和站长的免费在线工具集。所有工具均在浏览器本地运行，无后端服务器、不上传数据、无需注册。

网站：[schg.xyz](https://schg.xyz)

## 功能

- **12 个在线工具**，覆盖开发调试、安全加密、格式转换、日常实用场景
- **中英双语**，根据浏览器语言自动切换
- **隐私优先**：所有计算在浏览器端完成，数据不会离开你的设备
- **静态导出**：基于 Next.js 静态生成，可部署在任何托管平台

### 工具列表

| 分类 | 工具 |
|---|---|
| 开发辅助 | JSON 格式化与校验、正则表达式测试、命名格式转换、URL/Unicode 编码 |
| 安全加密 | 哈希计算（MD5/SHA）、AES/DES/RSA 加解密、密码生成器 |
| 格式转换 | 时间戳转换、Base64 图片转换、配置文件格式（YAML/TOML/JSON）互转 |
| 实用工具 | 二维码生成、Cron 表达式解析 |

## 技术栈

- **框架**：Next.js 16（App Router）
- **语言**：TypeScript 5（严格模式）
- **样式**：Tailwind CSS v4
- **字体**：Geist（`next/font`）
- **图标**：Inline SVG / lucide-react
- **国际化**：基于字典的自定义 i18n

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 构建

```bash
npm run build
```

静态文件输出到 `out/` 目录，可直接部署。

## 项目结构

```
app/[lang]/           # 语言路由 (zh/en)
  ├── page.tsx        # 首页
  ├── tools/          # 12 个工具页
  ├── articles/       # 文章列表
  ├── about/          # 关于我们
  ├── contact/        # 联系方式
  ├── privacy/        # 隐私政策
  └── terms/          # 使用条款
components/           # 共享 UI 组件
data/                 # 静态文章数据
i18n/                 # 翻译词典 (zh.ts, en.ts)
lib/                  # 工具函数
proxy.ts              # 语言检测中间件
```

## 许可

MIT
