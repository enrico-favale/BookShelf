# BookShelf

BookShelf is a personal library management web application built with React and Firebase. It allows users to track their books, manage reading statuses, rate books, and add personal notes. The app supports user authentication, search via ISBN, and a clean, responsive UI with dark mode support.

## Features

- **User Authentication:** Sign up, log in, and manage your own library securely.
- **Add Books:** Search for books using ISBN or manually add them to your collection.
- **Book Details:** View detailed information including title, author, publisher, publication date, page count, language, and categories.
- **Reading Status:** Track whether a book is in your wishlist, currently reading, or finished.
- **Ratings & Notes:** Rate finished books and add personal notes or reflections.
- **Dashboard:** View your library with statistics for each reading status.
- **Edit & Delete:** Update book details or remove books from your library.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Dark Mode:** Toggle between light and dark themes.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Backend:** Firebase (Firestore for database, Authentication for user management)
- **Deployment:** GitHub Pages or any static hosting

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookshelf.git
cd bookshelf
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and set up Firestore and Authentication.

4. Create a `.env` file in the root directory and add your Firebase configuration:
```env
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_APP_ID=your_app_id
```

## Usage

1. Start the development server:
```bash
npm start
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Sign up or log in to start managing your personal library.

4. Add books via ISBN or manual entry, update statuses, add ratings and notes, and view statistics in the dashboard.

## Deployment

The app can be deployed to GitHub Pages:

1. Install the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add the following to your `package.json`:
```json
"homepage": "https://yourusername.github.io/bookshelf",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy the app:
```bash
npm run deploy
```

## Folder Structure

```
bookshelf/
├─ public/          # Static files
├─ src/             # React components and pages
│  ├─ components/   # Reusable components
│  ├─ pages/        # Pages like Dashboard, AddBook, BookDetails
│  ├─ context/      # Context for authentication
│  └─ firebase.js   # Firebase config and setup
├─ package.json
└─ README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.

## License

This project is open-source and available under the MIT License.

