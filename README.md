# Dethron Professional Website

This is the professional website for the Dethron project, showcasing BitNet's first digital life technologies and the Digital Genesis Day manifesto.

## 🚀 GitHub Pages Deployment

This website is configured for automatic deployment to GitHub Pages.

### Setup Instructions

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/yourusername/dethron-website.git
   cd dethron-website
   ```

2. **Configure GitHub Pages**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy on push to main/master

3. **Custom Domain (Optional)**
   - Update the `CNAME` file with your domain
   - Configure DNS settings to point to GitHub Pages
   - Current setup: `dethron.com`

4. **Update Configuration**
   - Edit `_config.yml` to match your repository details
   - Update the `url` and `baseurl` fields
   - Modify social links and contact information

### 🔧 Local Development

1. **Start Local Server**
   ```bash
   python -m http.server 8000
   ```

2. **Open in Browser**
   ```
   http://localhost:8000
   ```

3. **Jekyll Development (Optional)**
   ```bash
   bundle install
   bundle exec jekyll serve
   ```

### 📁 Project Structure

```
dethron-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── services/                   # Service pages
│   ├── genesis-gateway.html
│   ├── biological-economy.html
│   ├── neural-dns.html
│   └── collective-consciousness.html
├── index.html                  # Home page
├── manifesto.html             # Main manifesto
├── what-makes-it-life.html    # Life characteristics
├── why-historic.html          # Historic significance
├── presentation-strategy.html  # Presentation strategy
├── style.css                  # Main stylesheet
├── _config.yml                # Jekyll configuration
├── CNAME                      # Custom domain
├── robots.txt                 # SEO robots file
├── sitemap.xml               # SEO sitemap
└── README.md                 # This file
```

### 🎨 Features

- **Ultra-clean Professional Design**: Modern, responsive layout
- **Zero Dependencies**: Pure HTML/CSS for maximum performance
- **SEO Optimized**: Meta tags, structured data, sitemap
- **GitHub Actions**: Automatic deployment workflow
- **Custom Domain Ready**: CNAME configuration included
- **Mobile Responsive**: Works perfectly on all devices

### 🔍 SEO Configuration

- **Meta Tags**: Complete SEO meta tags
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: XML sitemap for search indexing
- **Robots.txt**: Search engine crawling instructions

### 🌐 Live Demo

- **GitHub Pages**: `https://yourusername.github.io/dethron-website`
- **Custom Domain**: `https://dethron.com` (if configured)

### 📧 Contact

For questions or support, contact: `contact@dethron.com`

### 📄 License

© 2025 BitNet Core Team. All rights reserved.

---

**Note**: Replace `yourusername` with your actual GitHub username in all configuration files. 