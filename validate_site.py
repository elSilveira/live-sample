#!/usr/bin/env python3
"""
Simple validation script for BitNet Dethron website
Checks HTML structure, CSS links, and navigation consistency
"""
import os
import re
from pathlib import Path

def check_html_file(file_path):
    """Check an HTML file for basic structure and consistency"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    errors = []
    warnings = []
    
    # Check basic HTML structure
    if not content.startswith('<!DOCTYPE html>'):
        errors.append("Missing DOCTYPE declaration")
    
    if '<html lang="en">' not in content:
        errors.append("Missing or incorrect html lang attribute")
    
    # Check CSS includes
    if 'href="assets/css/base.css"' not in content:
        errors.append("Missing base.css link")
    
    if 'href="assets/css/components.css"' not in content:
        errors.append("Missing components.css link")
    
    # Check navigation structure
    if 'class="header"' not in content:
        errors.append("Missing header with correct class")
    
    if 'class="nav"' not in content:
        errors.append("Missing navigation with correct class")
    
    if 'class="footer"' not in content:
        errors.append("Missing footer with correct class")
    
    # Check for unified navigation structure
    if 'class="header__container"' not in content:
        warnings.append("Header might not be using unified structure")
    
    if 'class="footer__content"' not in content:
        warnings.append("Footer might not be using unified structure")
    
    # Check for Documentation links (should be removed)
    if 'href="documentation.html"' in content:
        warnings.append("Found documentation.html link - should be removed")
    
    if 'Documentation</a>' in content:
        warnings.append("Found Documentation link text - should be removed")
    
    return errors, warnings

def main():
    """Main validation function"""
    website_dir = Path("c:/Users/duti_/apps/bitnet/bitnet-dethron-web")
    html_files = ["index.html", "about.html", "examples.html", "technologies.html"]
    
    print("🔍 BitNet Dethron Website Validation")
    print("=" * 50)
    
    total_errors = 0
    total_warnings = 0
    
    for html_file in html_files:
        file_path = website_dir / html_file
        if file_path.exists():
            print(f"\n📄 Checking {html_file}...")
            errors, warnings = check_html_file(file_path)
            
            if errors:
                print(f"  ❌ {len(errors)} errors:")
                for error in errors:
                    print(f"    • {error}")
                total_errors += len(errors)
            
            if warnings:
                print(f"  ⚠️  {len(warnings)} warnings:")
                for warning in warnings:
                    print(f"    • {warning}")
                total_warnings += len(warnings)
            
            if not errors and not warnings:
                print(f"  ✅ {html_file} looks good!")
        else:
            print(f"  ❌ {html_file} not found!")
            total_errors += 1
    
    # Check CSS files
    print(f"\n🎨 Checking CSS files...")
    css_files = ["assets/css/base.css", "assets/css/components.css", "assets/css/about.css"]
    
    for css_file in css_files:
        css_path = website_dir / css_file
        if css_path.exists():
            print(f"  ✅ {css_file} exists")
        else:
            print(f"  ❌ {css_file} missing!")
            total_errors += 1
    
    # Final summary
    print(f"\n📊 Summary:")
    print(f"  Total Errors: {total_errors}")
    print(f"  Total Warnings: {total_warnings}")
    
    if total_errors == 0:
        print("  🎉 Website validation passed!")
        return True
    else:
        print("  💥 Website has issues that need fixing")
        return False

if __name__ == "__main__":
    main()
