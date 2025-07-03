# Faculty Review App

A web application for submitting and viewing reviews of university faculty. Built with React, Vite, and Tailwind CSS.

## Overview
- Users can log in (currently only 'admin' is supported)
- Search and view faculty profiles
- Submit reviews with multiple-choice questions and comments
- View reviews with ratings, upvotes, and detailed breakdowns
- Bookmark faculty for quick access in the dashboard
- Dashboard includes tabs for profile, reviews, bookmarks, and admin (admin only)
- All data is stored in localStorage (no backend)

## Features
- Faculty carousel with name, designation, rating, and recent comment
- Faculty profile page with all details and reviews
- Review cards with upvote/downvote, MCQ breakdown, and delete option (for your own reviews)
- Dashboard for managing your reviews and bookmarks
- Login required for submitting reviews and bookmarking

## Getting Started

### Clone the repository
```
git clone https://github.com/Cordless/Faculty-Review.git
cd Faculty-Review
```

### Install dependencies
```
npm install
```

### Run the app locally
```
npm run dev
```
The app will be available at http://localhost:5173

## Login
- Username: admin
- Password: admin

## Contributing
- This repository is private. Contact the owner for access.
- To contribute:
  - Fork the repository (if you have access)
  - Create a new branch for your changes
  - Make your changes and commit
  - Open a pull request

## Technical Notes
- All data is stored in localStorage
- Reviews and bookmarks require login
- Dashboard allows deleting your own reviews and navigating to the faculty page
- Bookmarked faculty can be accessed from the dashboard
- No backend or real authentication is implemented

## Contact
For access or questions, contact the repository owner (Cordless) on GitHub.
