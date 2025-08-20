# Yuan Theme

A minimalist, dark-themed Hugo blog template designed for technical content and personal blogging.

## ✨ Features

- **🌙 Dark Theme**: Modern dark color scheme optimized for readability
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🎨 Syntax Highlighting**: Beautiful code syntax highlighting with line numbers
- **📖 Table of Contents**: Automatic TOC generation for long articles
- **⏱️ Reading Time**: Display estimated reading time for posts
- **📊 Word Count**: Show word count for articles
- **🔗 Social Links**: Integrated GitHub and LinkedIn profile links
- **👤 Gravatar Support**: Automatic avatar display using Gravatar
- **🗂️ Archive Page**: Clean timeline-style archive view
- **🏷️ Categories & Tags**: Full taxonomy support
- **🌐 Multilingual**: i18n support (currently includes Traditional Chinese)
- **⚡ Performance**: Optimized CSS and minimal JavaScript

## 🚀 Quick Start

### Prerequisites

- Hugo >= 0.110.0

### Installation

1. **As a Git Submodule** (recommended):
```bash
git submodule add https://github.com/e61983/blog-theme.git themes/yuan
```

2. **Direct Download**:
```bash
git clone https://github.com/e61983/blog-theme.git themes/yuan
```

### Basic Configuration

Add the theme to your `hugo.toml`:

```toml
theme = "yuan"
```

## ⚙️ Configuration

### Complete Configuration Example

```toml
baseURL = "https://your-site.com/"
languageCode = "zh-tw"
title = "Your Blog Title"
theme = "yuan"

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.highlight]
    style = "github-dark"
    lineNos = true
    lineNumbersInTable = true
    tabWidth = 2

[params]
  author = "Your Name"
  description = "Your blog description"
  keywords = ["golang", "programming", "tech"]
  
  # Theme settings
  darkMode = true
  showReadingTime = true
  showWordCount = true
  showTableOfContents = true
  
  # Social links
  github = "https://github.com/yourusername"
  linkedin = "https://www.linkedin.com/in/yourprofile"
  
  # Avatar settings
  gravatarEmail = "your@email.com"
  
  # Analytics (optional)
  # googleAnalytics = "G-XXXXXXXXXX"

[menu]
  [[menu.main]]
    name = "首頁"
    url = "/"
    weight = 1
  
  [[menu.main]]
    name = "文章"
    url = "/posts/"
    weight = 2
    
  [[menu.main]]
    name = "分類"
    url = "/categories/"
    weight = 3
    
  [[menu.main]]
    name = "標籤"
    url = "/tags/"
    weight = 4
    
  [[menu.main]]
    name = "歸檔"
    url = "/archive/"
    weight = 5

[taxonomies]
  category = "categories"
  tag = "tags"
```

### Parameter Descriptions

| Parameter | Type | Description |
|-----------|------|-------------|
| `author` | string | Author name displayed in posts |
| `description` | string | Site description for SEO and homepage |
| `keywords` | array | Keywords for SEO |
| `darkMode` | boolean | Enable dark theme (default: true) |
| `showReadingTime` | boolean | Display reading time estimate |
| `showWordCount` | boolean | Display word count |
| `showTableOfContents` | boolean | Generate table of contents |
| `github` | string | GitHub profile URL |
| `linkedin` | string | LinkedIn profile URL |
| `gravatarEmail` | string | Email for Gravatar avatar |

## 📁 Directory Structure

```
themes/yuan/
├── archetypes/
│   └── default.md          # Default post template
├── assets/
│   └── yuan/
│       ├── css/
│       │   └── main.css    # Main stylesheet
│       └── js/
│           └── main.js     # JavaScript functionality
├── i18n/
│   └── zh-tw.toml         # Traditional Chinese translations
├── layouts/
│   ├── _default/
│   │   ├── baseof.html    # Base template
│   │   ├── list.html      # List page template
│   │   ├── single.html    # Single post template
│   │   ├── taxonomy.html  # Category/tag page template
│   │   └── terms.html     # Terms list template
│   ├── archive/
│   │   └── list.html      # Archive page template
│   ├── partials/
│   │   ├── footer.html    # Footer component
│   │   ├── header.html    # Header component
│   │   └── post-card.html # Post card component
│   ├── shortcodes/
│   │   └── notice.html    # Notice shortcode
│   ├── 404.html           # 404 error page
│   └── index.html         # Homepage template
├── static/                # Static assets
└── theme.toml            # Theme configuration
```

## 📝 Content Creation

### Creating Posts

```bash
hugo new posts/my-first-post/index.md
```

### Post Front Matter Example

```yaml
---
title: "My Post Title"
date: 2024-01-01T12:00:00+08:00
author: "Yuan"
draft: false
tags: ["hugo", "web"]
categories: ["technology"]
description: "A brief description of the post"
---

Your content here...
```

### Creating the Archive Page

Create `content/archive/_index.md`:

```yaml
---
title: "Archive"
date: 2024-01-01T12:00:00+08:00
type: "archive"
description: ""
---
```

## 🎨 Customization

### Custom CSS

Add custom styles in `assets/css/custom.css` and import in your site:

```css
/* Your custom styles */
.custom-class {
  color: var(--color-primary);
}
```

### Shortcodes

The theme includes a `notice` shortcode:

```markdown
{{< notice "info" >}}
This is an info notice.
{{< /notice >}}
```

Available notice types: `info`, `warning`, `danger`, `success`

## 🌐 Multilingual Support

The theme supports Hugo's multilingual features. Currently includes:

- Traditional Chinese (zh-tw)

To add more languages, create corresponding files in the `i18n/` directory.

## 🔧 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/e61983/blog-theme.git
cd blog-theme

# Test with example site
hugo server -D --themesDir ../.. --theme yuan
```

### Building Assets

The theme uses Hugo Pipes for asset processing. CSS and JS files are automatically processed during build.

## 📸 Screenshots

- **Homepage**: Clean layout with avatar, tech stack, and recent posts
- **Post View**: Readable typography with TOC and syntax highlighting  
- **Archive Page**: Timeline-style archive with year grouping
- **Mobile**: Fully responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This theme is released under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Hugo](https://gohugo.io/)
- Inspired by modern minimalist design principles
- Typography optimized for technical content

## 📬 Support

- 🐛 [Report Issues](https://github.com/e61983/blog-theme/issues)
- 💡 [Feature Requests](https://github.com/e61983/blog-theme/discussions)
- 📖 [Documentation](https://github.com/e61983/blog-theme/wiki)

---

**Built with ❤️ by [Yuan](https://github.com/e61983)**
