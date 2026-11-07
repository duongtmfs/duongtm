# Tong Minh Duong · Frontend portfolio

A responsive personal portfolio built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, lucide-react, and four locally bundled fonts loaded through next/font. The portrait uses a transparent cutout of the supplied headshot.

## Run locally

Use Node.js 22 LTS or newer. Open a terminal in the folder containing package.json.

    npm ci
    npm run dev

Open http://localhost:3000. For a production preview, stop the development server and run:

    npm run build
    npm run preview

Open the address printed by the preview server. The production build exports static files to out/.

## Deploy to Vercel

1. Push this folder to a personal Git repository.
2. Sign in to the Vercel dashboard and select **Add New → Project**.
3. Import the repository into your **Hobby** account. If the project sits in a subfolder, select that folder as the root directory.
4. Keep the detected **Next.js** framework preset and default build settings. Choose **Deploy**.

The app requires no environment variables. Vercel Hobby covers personal, non-commercial use within its included limits. See https://vercel.com/docs/plans/hobby and https://vercel.com/docs/getting-started-with-vercel.

## Animation controls

- **P** toggles pause. **A** toggles agents and saves the choice on this browser.
- **T** reloads the page in tour mode. The tour waits for the hero and then scrolls to the footer. Press Escape, scroll manually, or select Stop tour to finish early.
- **?agents=on** enables the build even with reduced motion. **?agents=off** opens the complete page immediately. Manually toggling agents clears the URL override.
- With reduced motion, the page starts fully visible. The technology marquee pauses on hover and keyboard focus.

## Content

Project summaries, stack, employment, education, and principles are in app/content.ts. The introduction and section layouts are in app/page.tsx. The supplied résumé includes email contact only. City, social links, project URLs, hackathons, and phone details are omitted.
# duongtm
