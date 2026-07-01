# Engineering Assessment

## Overview

This repository contains my completed engineering assessment.

## Improvements Completed

### Backend

- Refactored synchronous file operations to asynchronous (`fs/promises`)
- Added server-side pagination
- Added server-side search
- Implemented caching for `/api/stats`
- Improved error handling

### Frontend

- Fixed React memory leak using `AbortController`
- Added server-side search
- Added pagination
- Integrated list virtualization using `react-window`
- Improved UI/UX
- Enhanced loading state

## Tech Stack

- React
- Node.js
- Express
- react-window

## Running

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```
