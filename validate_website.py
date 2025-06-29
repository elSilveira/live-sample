#!/usr/bin/env python3
"""
BitNet Dethron Website Validation Script
Validates HTML structure, CSS consistency, and navigation links
"""

import os
import re
from pathlib import Path

def validate_html_structure(file_path):
    """Validate basic HTML structure and required elements"""
    issues = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for required HTML elements
        if not re.search(r'<!DOCTYPE html>', content):
            issues.append("Missing DOCTYPE declaration")
        
        if not re.search(r'<html[^>]*lang="en"', content):
            issues.append("Missing or incorrect html lang attribute")
        
        if not re.search(r'<meta[^>]*charset="UTF-8"', content):
            issues.append("Missing UTF-8 charset declaration")
        
        if not re.search(r'<meta[^>]*viewport', content):
            issues.append("Missing viewport meta tag")
        
        # Check for BitNet-specific requirements
        if not re.search(r'BitNet.*Dethron', content):
            issues.append("Missing BitNet Dethron branding")
        
        # Check navigation structure
        if not re.search(r'class="header"', content):
            issues.append("Missing header element with proper class")
        
        if not re.search(r'class="footer"', content):
            issues.append("Missing footer element with proper class")
        
        # Check for documentation links (should be removed)
        if re.search(r'href="documentation\.html"', content):
            issues.append("Found documentation link (should be removed)")
        
        return issues
        
    except Exception as e:
        return [f"Error reading file: {str(e)}"]

def validate_navigation_consistency(files):
    """Check navigation consistency across all HTML files"""
    nav_patterns = {}
    
    for file_path in files:
        if not file_path.endswith('.html'):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract navigation links
            nav_links = re.findall(r'<a[^>]*href="([^"]*)"[^>]*class="nav__link[^"]*"[^>]*>([^<]*)</a>', content)
            nav_patterns[os.path.basename(file_path)] = nav_links
            
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
    
    # Check consistency
    issues = []
    reference_nav = None
    
    for file_name, nav_links in nav_patterns.items():
        if reference_nav is None:
            reference_nav = nav_links
            continue
        
        # Remove active states for comparison
        clean_nav = [(href, text.strip()) for href, text in nav_links]
        clean_ref = [(href, text.strip()) for href, text in reference_nav]
        
        if len(clean_nav) != len(clean_ref):
            issues.append(f"{file_name}: Different number of nav links")
        
        for i, (href, text) in enumerate(clean_nav):
            if i < len(clean_ref):
                ref_href, ref_text = clean_ref[i]
                if href != ref_href or text != ref_text:
                    issues.append(f"{file_name}: Nav item {i+1} differs from reference")
    
    return issues

def check_css_references(files):
    """Check that all CSS files are properly referenced"""
    issues = []
    required_css = ['base.css', 'components.css']
    
    for file_path in files:
        if not file_path.endswith('.html'):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            for css_file in required_css:
                if not re.search(rf'href="[^"]*{css_file}"', content):
                    issues.append(f"{os.path.basename(file_path)}: Missing reference to {css_file}")
            
        except Exception as e:
            issues.append(f"Error reading {file_path}: {e}")
    
    return issues

def main():
    """Main validation function"""
    print("🔍 BitNet Dethron Website Validation")
    print("=" * 50)
    
    # Get website directory
    website_dir = Path(__file__).parent
    html_files = list(website_dir.glob("*.html"))
    
    if not html_files:
        print("❌ No HTML files found in current directory")
        return
    
    print(f"📁 Found {len(html_files)} HTML files to validate")
    
    all_issues = []
    
    # Validate each HTML file
    for html_file in html_files:
        print(f"\n📄 Validating {html_file.name}...")
        issues = validate_html_structure(html_file)
        
        if issues:
            print(f"  ⚠️  Found {len(issues)} issues:")
            for issue in issues:
                print(f"    • {issue}")
            all_issues.extend([f"{html_file.name}: {issue}" for issue in issues])
        else:
            print("  ✅ No structural issues found")
    
    # Check navigation consistency
    print(f"\n🧭 Checking navigation consistency...")
    nav_issues = validate_navigation_consistency(html_files)
    if nav_issues:
        print(f"  ⚠️  Found {len(nav_issues)} navigation issues:")
        for issue in nav_issues:
            print(f"    • {issue}")
        all_issues.extend(nav_issues)
    else:
        print("  ✅ Navigation is consistent across all pages")
    
    # Check CSS references
    print(f"\n🎨 Checking CSS references...")
    css_issues = check_css_references(html_files)
    if css_issues:
        print(f"  ⚠️  Found {len(css_issues)} CSS reference issues:")
        for issue in css_issues:
            print(f"    • {issue}")
        all_issues.extend(css_issues)
    else:
        print("  ✅ All CSS references are correct")
    
    # Summary
    print(f"\n📊 Validation Summary")
    print("=" * 30)
    
    if all_issues:
        print(f"❌ Found {len(all_issues)} total issues")
        print("🔧 Issues that need attention:")
        for issue in all_issues:
            print(f"  • {issue}")
    else:
        print("🎉 All validations passed!")
        print("✅ Website is ready for deployment")
    
    print(f"\n🚀 BitNet Dethron validation complete!")

if __name__ == "__main__":
    main()
