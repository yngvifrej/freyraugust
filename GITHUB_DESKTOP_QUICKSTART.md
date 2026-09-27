# freia — GitHub Desktop quick start

This folder is the deploy-ready website. Keep the directory structure exactly as supplied.

1. In GitHub Desktop, clone your existing website repository.
2. In GitHub Desktop choose **Repository → Show in Finder**.
3. Extract `freia_github_pages_final.zip`.
4. In Finder press **Command + Shift + .** once so hidden files are visible. This makes the `.github` folder visible.
5. Copy **all contents inside the extracted folder** into the cloned repository folder. Do not put the extracted folder itself inside the repository.
6. Return to GitHub Desktop. Review the changes, use a commit message such as `Update freia website`, click **Commit to main** (or master), then **Push origin**.
7. On GitHub.com open the repository → **Settings → Pages** and select **GitHub Actions** as the source if it is not already selected.
8. Open the repository **Actions** tab. The workflow named **Deploy freia to GitHub Pages** should run after the push.

The deployment workflow downloads `models/brain.glb` during the GitHub Pages build, so you do not need to manually add that binary file. The `models` folder in this package should still be kept.
