# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BudgetByMe Website - A static landing page for a personal budgeting application focused on planning life event celebrations (weddings, graduations, birthdays, anniversaries, etc.). The primary goal is to convert visitors into early access waitlist signups.

## Development Setup

This is currently a static HTML website with no build process required.

### Prerequisites
- Web browser for testing
- Local web server (optional, for development)

### Getting Started
```bash
# Serve locally (optional)
python -m http.server 8000
# or
npx serve .
# or simply open index.html in browser
```

## Architecture

### Project Structure
```
/
├── index.html          # Main landing page
├── css/
│   └── styles.css     # Main stylesheet with responsive design
├── js/
│   └── app.js         # Interactive functionality and form handling
├── images/            # Image assets (to be added)
├── assets/
│   └── icons/         # Icon assets (to be added)
├── references/        # Screenshots and design reference materials
└── CLAUDE.md          # This file
```

### Key Technologies
- Static HTML5 with semantic markup
- CSS3 with Grid, Flexbox, and modern features
- Vanilla JavaScript for interactions
- Google Fonts (Inter) for typography
- CSS animations and transitions for UX

## Current Features

### Landing Page Components
- **Hero Section**: Value proposition with celebration-focused messaging
- **Features Section**: Three key benefits (Smart Budgeting, Goal-Based Planning, Event Templates)
- **Waitlist Section**: Email capture form with success modal
- **Visual Elements**: Celebration cards (wedding, graduation, birthday, anniversary)

### Interactive Elements
- Smooth scrolling CTA button
- Email validation and form handling
- Success modal with backdrop blur
- Responsive design for mobile/tablet
- Local storage for waitlist count tracking
- Analytics event tracking (ready for GA4/Facebook Pixel)

### Styling Approach
- Modern gradient backgrounds
- Card-based layouts with hover effects
- Mobile-first responsive design
- Inter font family for clean typography
- Purple/indigo primary colors with gold accents

## Key Concepts

### Conversion Optimization
- Single clear CTA: "Join the Waitlist"
- Social proof with waitlist counter
- Benefit-focused messaging
- Mobile-optimized form design
- Success confirmation to reduce anxiety

### Target Celebrations
- Weddings (primary focus)
- Graduations
- Birthdays
- Anniversaries
- Other life milestones and events

### User Journey
1. Land on hero section → understand value proposition
2. Scroll through features → learn benefits
3. Join waitlist → convert to early access signup
4. Success confirmation → positive reinforcement

## Notes for Claude Code

- This is a conversion-focused landing page - prioritize clear messaging and user experience
- Email capture is the primary conversion goal
- Form validation should be user-friendly with clear error messages  
- Maintain fast loading times (static assets only)
- Consider accessibility (semantic HTML, proper contrast ratios)
- Analytics tracking is prepared but needs actual service integration
- Design should convey trustworthiness for financial application
- Future: Will need backend integration for actual email collection

### Design References
- Check `/references/` directory for screenshots and visual materials from the actual BudgetByMe application
- Use these references to ensure the landing page accurately represents the app's design language and functionality
- Screenshots provide insight into the app's user interface, features, and overall aesthetic

### Example Landing Pages:
- https://usecodeflow.com/
- https://www.tiny.cloud/tinymce/features/ai-integration/
