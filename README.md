<p align="center">
    <h1 align="center">Lottie Animation Management System</h1>
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/regahr/lf-animation-management?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/regahr/lf-animation-management?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/regahr/lf-animation-management?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/regahr/lf-animation-management?style=flat&color=0080ff" alt="repo-language-count">
<p>

<p align="center">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/GraphQL-E10098.svg?style=flat&logo=GraphQL&logoColor=white" alt="GraphQL">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>

This project is a frontend application for managing and displaying Lottie animations, built using React, URQL, and Tailwind CSS.

**Deployed at**: [https://lfam-rega.vercel.app/](https://lfam-rega.vercel.app/)

## Table of Contents

- [Design Decisions](#design-decisions)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Conclusion](#conclusion)

## Design Decisions

1. **URQL**: Chosen for its built-in offline support, state management through IndexedDB, easy-to-use hooks, and flexible cache tools.
2. **React Lottie Player**: Used to render the fetched JSON animations that are uploaded through the `uploadAnimation` mutation and fetched via the `getAnimation` query.
3. **Vercel**: Chosen for deployment due to its ease of use and seamless integration with the development workflow.
4. **TypeScript**: Set up for improved developer experience and type safety.
5. **Progressive Web App (PWA)**: Configured to ensure the application supports offline-first functionality.
6. **Tailwind CSS**: Utilized for quickly building UI components without spending too much time on CSS.
7. **Prettier**: Included for consistent code formatting and cleanliness.

## Setup and Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/regahr/lf-animation-management
   cd lf-animation-management
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Start the development server**:
   ```sh
   npm start
   ```

## Usage

1. **Uploading an Animation**:

   - Drag and drop a dotLottie file into the designated upload area. The file will be uploaded and displayed as a new card.

2. **Viewing Animations**:

   - The animations uploaded are fetched and displayed using React Lottie Player.

3. **Searching Animations**:
   - Use the search bar to filter animations by name, author, and keywords.

## Folder Structure

```sh
└── lf-animation-management/
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── favicon-32x32.png
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── App.test.tsx
    │   ├── App.tsx
    │   ├── components
    │   │   └── Modal.tsx
    │   ├── index.css
    │   ├── index.tsx
    │   ├── logo.svg
    │   ├── react-app-env.d.ts
    │   ├── reportWebVitals.ts
    │   ├── service-worker.ts
    │   ├── serviceWorkerRegistration.ts
    │   └── setupTests.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## Conclusion

This application act as a prototype to comprehensive solution for managing and displaying Lottie animations, with robust features such as offline support. The use of URQL, React Lottie Player, and Tailwind CSS ensures a smooth development process and a rich user experience.
