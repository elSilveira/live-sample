# 🚀 Deployment Guide - GitHub Pages

This guide explains how to deploy the Dethron website to GitHub Pages.

## Quick Deploy Steps

### 1. Repository Setup
```bash
# Clone or fork the repository
git clone https://github.com/yourusername/dethron-website.git
cd dethron-website

# Create a new repository on GitHub
# Push your code to the repository
git remote add origin https://github.com/yourusername/dethron-website.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically trigger on the next push

### 3. Custom Domain (Optional)
If you want to use a custom domain like `dethron.com`:

1. **Update CNAME file**:
   ```bash
   echo "yourdomain.com" > CNAME
   ```

2. **Configure DNS**:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

3. **Update _config.yml**:
   ```yaml
   url: "https://yourdomain.com"
   baseurl: ""
   ```

### 4. Configuration Updates
Update these files with your information:

**_config.yml**:
```yaml
title: "Your Site Title"
description: "Your site description"
url: "https://yourusername.github.io"
baseurl: "/dethron-website"
```

**package.json**:
```json
{
  "repository": {
    "url": "git+https://github.com/yourusername/dethron-website.git"
  },
  "homepage": "https://yourusername.github.io/dethron-website"
}
```

## Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1. **Triggers** on push to main/master branch
2. **Checks out** the code
3. **Configures** GitHub Pages
4. **Uploads** the site as an artifact
5. **Deploys** to GitHub Pages

## Local Development

### Option 1: Python Server
```bash
python -m http.server 8000
# Visit: http://localhost:8000
```

### Option 2: NPM Scripts
```bash
npm install
npm start
# Visit: http://localhost:8000
```

### Option 3: Jekyll (Optional)
```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
# Visit: http://localhost:4000
```

## Troubleshooting

### Common Issues

1. **Workflow fails**:
   - Check repository permissions
   - Ensure GitHub Actions are enabled
   - Verify workflow file syntax

2. **Custom domain not working**:
   - Check DNS propagation (24-48 hours)
   - Verify CNAME file content
   - Check GitHub Pages settings

3. **Site not updating**:
   - Clear browser cache
   - Check workflow status
   - Verify push to correct branch

### Checking Deployment Status

1. Go to **Actions** tab in your repository
2. Check the latest workflow run
3. View logs for any errors
4. Site URL will be shown in the deployment step

## Performance Optimization

The site is already optimized for GitHub Pages:

- ✅ **Static HTML/CSS**: No build process required
- ✅ **Minified Assets**: Optimized for fast loading
- ✅ **SEO Ready**: Meta tags and structured data
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **Fast Loading**: Minimal dependencies

## Security

- ✅ **HTTPS**: Automatically enabled by GitHub Pages
- ✅ **CSP Ready**: Content Security Policy compatible
- ✅ **No Vulnerabilities**: Pure HTML/CSS with no dependencies

## Monitoring

After deployment, monitor:

- **Site availability**: Check if site loads correctly
- **SEO performance**: Use Google Search Console
- **Analytics**: Add Google Analytics if needed
- **Performance**: Use PageSpeed Insights

## Support

For deployment issues:
- Check GitHub Pages documentation
- Review workflow logs
- Contact: `contact@dethron.com`

---

**Live URLs after deployment**:
- GitHub Pages: `https://yourusername.github.io/dethron-website`
- Custom Domain: `https://dethron.com` (if configured) 