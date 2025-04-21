
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/55cef8c1-63e5-4124-b44e-5e8ed91634e3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/55cef8c1-63e5-4124-b44e-5e8ed91634e3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/55cef8c1-63e5-4124-b44e-5e8ed91634e3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## How to run this app on mobile devices

This app supports running on mobile devices through Capacitor, enabling native mobile capabilities.

### Steps to run on mobile

1. Clone the project locally and install dependencies:

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

2. Add native platforms (for iOS and/or Android):

```sh
npx cap add android
npx cap add ios
```

3. Build the web assets:

```sh
npm run build
```

4. Sync the Capacitor native projects with the latest web build:

```sh
npx cap sync
```

5. Run the app on an emulator or a physical device:

For Android:

```sh
npx cap run android
```

For iOS (requires MacOS and Xcode):

```sh
npx cap run ios
```

### Tips

- After pulling new changes, always run `npm install` and then `npx cap sync` to keep your native projects up to date.
- For iOS, open the native Xcode project in `ios/App/App.xcodeproj` and run it from there if preferred.
- For Android, Android Studio can be used to open the native `android` folder and run/sync the app.
- Read our blog post for more details on running mobile apps and native capabilities: https://lovable.dev/blogs/TODO

