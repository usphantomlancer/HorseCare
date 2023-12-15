# Minimal Demonstration of HorseCare Marketplace Platform (Test Assignment)

## Installation

### Prerequisites:

Before you begin, ensure that you have the following tools and software installed on your machine:

- Node.js and npm (Node Package Manager)
- Git
- Supabase account for database services

### Steps to Set Up and Run Locally:

1. Clone the Repository:

```bash
git clone https://github.com/musabdev/horsecare
```

2. Navigate to the Project Directory:

```bash
cd horsecare
```

3. Install Dependencies

```bash
npm install
```

4. Set Up Supabase:

- Create a Supabase account and set up a new project.
- Obtain the Supabase API URL and Key.
- Configure the application to use Supabase by adding the API URL and Key in the appropriate configuration files.
- You have to push the current migrations to the database. Read this guide for more information: [https://supabase.com/docs/reference/cli/supabase-link](https://supabase.com/docs/reference/cli/supabase-link).

5. Set Up Magic Link Logins:

- Enable the email provider in your Supabase Project.
- Configure the Site URL and any additional redirect URLs in the authentication management tab.
- The Site URL represents the default URL that the user will be redirected to after clicking on the email signup confirmation link.

6. Configure Environment Variables:

- Create a `.env.local` file in the root of the project.
- Add environment variables such as Supabase API URL and Key, and any other necessary variables.

```env
VITE_SUPABASE_URL=[Supabase API URL]
VITE_SUPABASE_KEY=[Supabase API KEY]

VITE_AUTH_REDIRECT_URL=[Base URL of the website (This should be same as the Site URL you configured in Magic Link Logins above.)]

VITE_STRIPE_PUBLISHABLE_KEY=[Stripe Publishable Key]
VITE_STRIPE_PRICE_ID=[Stripe Dummy Product Price Id]
```

7. Run the Application (development):

```bash
npm run dev
```

The application will be accessible at http://localhost:5173 by default.

### Additional Instructions:

- **Testing:**
  - Run tests using the following command:
    ```bash
    npm run test
    ```
- **Linting:**
  - Check and fix linting issues:
    ```bash
    npm run lint
    ```
- **Build for Production:**
  - Create a production-ready build:
    ```bash
    npm run build
    npm run preview # To open the preview
    ```

## Architecture of The Prototype

### Frontend Stack:

- **Language:** TypeScript
- **Framework:** React.js
- **Styling:** Tailwind CSS for a utility-first approach to styling, providing a responsive and clean user interface.

### State Management:

- **Global State:** Zod is used for global state management. Zod helps define and validate the shape of the application state, providing a type-safe and structured way to manage the global state.

### Form Handling:

- **Form Validation:** React-hook-form is employed for form handling and validation. It simplifies the process of managing form state and validation, providing a seamless user experience.

### Backend and Database:

- **Backend Services:** Supabase is used as the backend service, providing a set of tools for building serverless applications. It includes features like authentication, real-time database, and storage.

### Search Functionality:

- **Search Debouncing:** Lodash.debounce is utilized for debouncing search functionality. This ensures that the search query is not executed too frequently, optimizing performance by reducing unnecessary API calls.

### Testing:

- **Testing Library:** @testing-library/react is used for testing React components. It promotes writing tests from the user's perspective, ensuring that the application behaves correctly from an end-user standpoint.
- **Unit Tests:** Vitest is integrated for unit testing, allowing for the testing of individual units or functions in isolation.
- **Continuous Integration:** GitHub Actions are configured to automate code testing, linting, and checking for build errors. This ensures that changes to the codebase are verified automatically upon pull requests or commits.

### Overall Flow:

- Users interact with the frontend, which is built using React.js and styled with Tailwind CSS.
- Global state is managed using Zod, providing a centralized and type-safe way to handle application-wide data.
- React-hook-form is used for form validation, ensuring data integrity when users submit forms.
- Search functionality is enhanced with lodash.debounce, preventing rapid and unnecessary API calls during user input.
- The frontend communicates with the backend services provided by Supabase for authentication, database operations, and real-time updates.
- Testing is automated using a combination of @testing-library/react, Vitest, and GitHub Actions, ensuring code quality and preventing regressions.

## Assumptions and Design Decisions

### User Authentication:

- **Assumption:** Users need to be authenticated to access certain pages such as Create Service and My Service.
- **Design Decision:** Authentication will be handled through Supabase to ensure secure access to user-specific content.

### Homepage:

- **Assumption:** The Homepage is the first point of interaction for users.
- **Design Decision:** The Homepage will feature a user-friendly interface with key information about the horsecare marketplace, highlighting popular services and encouraging users to explore further.

### Search Page:

- **Assumption:** Users will frequently search for specific horsecare services.
- **Design Decision:** The Search Page will include an intuitive search interface with features like debouncing to optimize the search experience. Results will be displayed in a clear and organized manner.

### Login:

- **Assumption:** User authentication is a critical part of the platform.
- **Design Decision:** The Login page will have a simple and secure authentication flow, with error handling for incorrect credentials. Social login options may also be considered for user convenience.

### Create Service (Authentication Protected):

- **Assumption:** Only authenticated users can create new horsecare services.
- **Design Decision:** The Create Service page will be protected by authentication, requiring users to log in before accessing the page. A user-friendly form with validation will be provided for service creation.

### My Service (Authentication Protected):

- **Assumption:** Users want to manage and view the services they have created.
- **Design Decision:** The My Service page will be accessible only to authenticated users, displaying a personalized dashboard with a list of services they have created. Users can edit or remove services from this page.

### Consistent Styling:

- **Assumption:** Consistency in styling is crucial for a seamless user experience.
- **Design Decision:** Tailwind CSS will be used for styling across all pages to maintain a consistent and responsive design throughout the horsecare marketplace website.

### Testing:

- **Assumption:** Automated testing is essential for maintaining code quality.
- **Design Decision:** Testing will be integrated into the development process using Vitest and @testing-library/react. GitHub Actions will automate testing, linting, and error checking to catch issues early in the development cycle.
