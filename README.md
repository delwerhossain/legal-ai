# AinBondhu AI

AinBondhu AI is a legal assistant chatbot designed to provide instant legal guidance and document automation in Bangla. It helps users understand legal matters, generate legal documents, and access justice more efficiently.

## Features
- AI-powered legal assistance
- Document automation (agreements, complaints, affidavits)
- Available in Bangla for easy accessibility
- User-friendly chatbot interface

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.JS
- **Database**: Not specified (can be Firebase, PostgreSQL, etc.)
- **AI Model**: Trained on verified legal sources

## Installation
```sh
# Clone the repository
git clone https://github.com/delwerhossain/legal-ai.git
cd ainbondhu-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Folder Structure
```
|-- .env
|-- .env.example
|-- .eslintrc.json
|-- .gitignore
|-- components.json
|-- next.config.js
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- tailwind.config.ts
|-- tsconfig.json
|-- hooks
  |-- use-language.ts
  |-- use-toast.ts
|-- lib
  |-- chat-store.ts
  |-- utils.ts
|-- types
  |-- chat.ts
|-- app
  |-- globals.css
  |-- layout.tsx
  |-- light.tsx
  |-- page.tsx
  |-- blog
    |-- page.tsx
  |-- chat
    |-- layout.tsx
    |-- page.tsx
  |-- contact
    |-- page.tsx
  |-- faq
    |-- page.tsx
  |-- privacy-policy
    |-- page.tsx
  |-- resources
    |-- page.tsx
|-- components
  |-- chat-sidebar.tsx
  |-- code-block.tsx
  |-- header.tsx
  |-- language-toggle.tsx
  |-- Navbar.tsx
  |-- theme-provider.tsx
  |-- theme-toggle.tsx
  |-- ui
    |-- accordion.tsx
    |-- alert-dialog.tsx
    |-- alert.tsx
    |-- aspect-ratio.tsx
    |-- avatar.tsx
    |-- badge.tsx
    |-- breadcrumb.tsx
    |-- button.tsx
    |-- calendar.tsx
    |-- card.tsx
    |-- carousel.tsx
    |-- chart.tsx
    |-- checkbox.tsx
    |-- collapsible.tsx
    |-- command.tsx
    |-- context-menu.tsx
    |-- dialog.tsx
    |-- drawer.tsx
    |-- dropdown-menu.tsx
    |-- form.tsx
    |-- hover-card.tsx
    |-- input-otp.tsx
    |-- input.tsx
    |-- label.tsx
    |-- menubar.tsx
    |-- navigation-menu.tsx
    |-- pagination.tsx
    |-- popover.tsx
    |-- progress.tsx
    |-- radio-group.tsx
    |-- resizable.tsx
    |-- scroll-area.tsx
    |-- select.tsx
    |-- separator.tsx
    |-- sheet.tsx
    |-- skeleton.tsx
    |-- slider.tsx
    |-- sonner.tsx
    |-- switch.tsx
    |-- table.tsx
    |-- tabs.tsx
    |-- textarea.tsx
    |-- toast.tsx
    |-- toaster.tsx
    |-- toggle-group.tsx
    |-- toggle.tsx
    |-- tooltip.tsx
|-- public
  |-- fav
    |-- android-chrome-192x192.png
    |-- android-chrome-512x512.png
    |-- apple-touch-icon.png
    |-- favicon-16x16.png
    |-- favicon-32x32.png
    |-- favicon.ico
  |-- images
    |-- court-case.jpg
    |-- cyber-law.jpg
    |-- favicon.ico
    |-- favicon.png
    |-- labor-law.jpg
    |-- NVIDIA.svg
```

## Roadmap
- [x] Develop AI chatbot for legal assistance
- [ ] Improve NLP capabilities for better responses
- [ ] Add more legal document templates
- [ ] Implement user feedback & accuracy improvements

## Contribution
Contributions are welcome! Please open an issue or pull request.


