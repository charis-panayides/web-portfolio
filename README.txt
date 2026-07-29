PORTFOLIO LIGHT-MODE FIX

Replace these three files in your local web-portfolio folder:

1. vite.pages.config.ts
2. src/components/ThemeToggle.tsx
3. src/routes/__root.tsx

Keep the same folder structure shown in this ZIP.

What the files do:
- New visitors see light mode by default.
- The light/dark toggle still works.
- A visitor's selected mode is still remembered.
- GitHub Pages assets use the correct /web-portfolio/ path.

After replacing the files:
1. Open GitHub Desktop.
2. Confirm only these three files are shown as changed.
3. Write a summary such as: Fix light mode default and Pages path
4. Click Commit to main.
5. Click Push origin.
6. Wait a few minutes, then refresh the website with Ctrl + F5.
