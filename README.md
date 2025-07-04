diff --git a//dev/null b/README.md
index 0000000000000000000000000000000000000000..3457af22a7fb009fca4956d725f96ac5336d782b 100644
--- a//dev/null
 b/README.md
 -0,0 1,37 
# Word Spinner React (Build)

This branch hosts the compiled build of **Word Spinner**, a React-based phonics game that lets children practice blending sounds into words. The playable site is served via GitHub Pages.

## Building From Source

The source code lives on the `main` branch. Clone the repository and switch to that branch to install dependencies and create the production build:

```bash
git checkout main
npm install
npm run build
```

The build output will be written to the `build/` directory.

## Deploying to `gh-pages`

One way to publish the production build is with the [`gh-pages`](https://github.com/tschaub/gh-pages) package. After building, run:

```bash
npx gh-pages -d build -b gh-pages -m "Deploy production build"
```

This command pushes the contents of `build/` to the `gh-pages` branch. You can also automate deployment with a GitHub Action or use `git subtree` if preferred.

## Usage Notes

These files are static and can be served by any web server. For a quick local preview you can run:

```bash
npx serve .
```

Open your browser to the printed local address to try out the app.

Enjoy spinning words and helping young readers master their phonics!
