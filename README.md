# Carenova Biotech Website

A professional multi-page website for Carenova Biotech Limited, a medical supplies company based in Nairobi, Kenya.

## Project Structure

```
carenova-website/
├── index.html # Homepage
├── about.html # About Us page
├── services.html # Services overview
├── equipment.html # Biomedical equipment catalog
├── consumables.html # Medical consumables
├── maintenance.html # Maintenance services
├── consultancy.html # Healthcare consultancy
├── contact.html # Contact page
├── css/
│ ├── style.css # Global styles
│ ├── pages.css # Page-specific styles
│ └── responsive.css # Responsive styles
├── js/
│ ├── main.js # Global JavaScript
│ └── forms.js # Form handling JavaScript
├── images/
│ ├── logo.jpeg # Company logo
│ ├── hero/
│ │ ├── hero-home.jpg # Homepage hero image
│ │ └── hero-about.jpg # About page hero image
│ ├── services/
│ │ ├── equipment.jpg # Equipment service image
│ │ ├── consumables.jpg # Consumables service image
│ │ ├── maintenance.jpg # Maintenance service image
│ │ └── consultancy.jpg # Consultancy service image
│ └── icons/ # Icon images (if any)
└── README.md # Project documentation 
```


## Features

### 1. **Multi-Page Structure**
- 8 distinct HTML pages
- Consistent navigation across all pages
- Breadcrumb navigation for interior pages
- Active link highlighting

### 2. **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimizations
- Mobile hamburger menu
- Flexible grid layouts

### 3. **Interactive Elements**
- Dropdown navigation menus
- FAQ accordions
- Form validation
- Success/error messages
- Back to top button
- Smooth scrolling

### 4. **Forms**
- Equipment inquiry form
- Consumables order form
- Maintenance request form
- Consultancy request form
- General contact form
- Quote request form
- Newsletter subscription

### 5. **Styling**
- Healthcare-focused color scheme
- Consistent typography
- Card-based layouts
- Gradient backgrounds
- Box shadows and transitions

## Setup Instructions

### 1. **File Structure**
Create the folder structure as shown above and place all files in their respective directories.

### 2. **Images**
Add the following images:
- `images/logo.jpeg` - Company logo (PNG with transparent background)
- `images/hero/hero-home.jpg` - Homepage hero image (Recommended: 1200x800)
- `images/hero/hero-about.jpg` - About page hero image
- Service images in the `images/services/` directory

### 3. **Placeholder Images**
The website uses Font Awesome icons as placeholders. Replace these with actual images by:
1. Replace `.image-placeholder` divs with `<img>` tags
2. Update CSS to style actual images
3. Remove placeholder icon and text

### 4. **Customization**
- **Colors**: Update CSS variables in `style.css` `:root` section
- **Fonts**: Update Google Fonts links in HTML head
- **Content**: Edit text content in HTML files
- **Contact Info**: Update in contact.html and footer

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari
- Chrome for Android

## Performance Optimization
- Minify CSS and JavaScript for production
- Optimize images (compress, WebP format)
- Implement lazy loading for images
- Enable GZIP compression on server
- Use CDN for Font Awesome and Google Fonts

## SEO Considerations
1. **Meta Tags**: All pages have proper meta descriptions
2. **Structured Data**: Add schema.org markup for business information
3. **Alt Text**: Add alt attributes to all images
4. **Sitemap**: Create XML sitemap
5. **Robots.txt**: Create robots.txt file
6. **Page Speed**: Optimize for Core Web Vitals

## Future Enhancements
1. **Backend Integration**: Connect forms to email/CRM
2. **E-commerce**: Add online ordering system
3. **Blog**: Add news/blog section
4. **Portfolio**: Add case studies gallery
5. **Multilingual**: Add language switcher
6. **Live Chat**: Implement chat support

## License
© 2024 Carenova Biotech Limited. All rights reserved.

## Support
For technical support or customization requests, contact the development team.