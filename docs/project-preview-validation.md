# Original project UI previews

Validated on 6 November 2026 against the production static export.

- All active previews record their original repository commit in `source.json`.
- Twelve app-open, demo-navigation, and close flows passed in Chromium with 4× CPU throttling.
- The home screen requested zero `/demos/` resources before an app was opened.
- Opening one project requested no other project's preview assets.
- One iframe existed while an app was open; none remained after closing it.
- All 62 exported pages passed viewport checks at 320, 390, and 1280 pixels (186 checks).
- No browser exceptions or failed preview asset requests occurred.
- The GitHub Pages static build and TypeScript validation passed.
- Rewind, Chronicle and Dayform are captured from original Flutter widgets, with their main tabs, editors and sample content. All three local widget-capture runs passed.
- AURA uses its actual rendered React interface with a sample desktop bridge. Its captured pages ship no React or Python runtime.
- The shared frame uses responsive dimensions during interaction to avoid transformed iframe click offsets.

The four newly added preview folders total about 1 MB before shared styles. Assets
load only for the selected app. Gistify's 4.8 MB background GIF is
represented by a 38.5 KB still, and Cartoonizer's 13 MB GIF by its own 86 KB still.
Old screenshot reference assets are not referenced or requested by the app.

These checks verify loading isolation and representative interactions/layouts.
They are not a frame-rate guarantee or physical-device Safari/Android testing.
Actual performance depends on device, browser, network, and the rest of the portfolio.

Reproduce after `npm run build` and serving `out/` on port 3001:

```powershell
node scripts/check-project-previews.cjs PATH_TO_PLAYWRIGHT_MODULE http://localhost:3001
```

## Portfolio performance pass

- Pointer glow moves a fixed-size composited layer instead of repainting a viewport-sized gradient or updating inherited root variables on each mouse move.
- Navbar scroll work is coalesced to one animation frame.
- Hero role rotation pauses outside the viewport and in hidden tabs, and respects reduced motion.
- Decorative project canvas pauses while an app is open and is disabled on touch devices, small screens, lower-core CPUs and reduced-motion settings.
- Off-screen phone transform work is skipped; carousel images load lazily.
- Production export passed. Full-page browser checks passed at 320, 390, 768 and 1440 pixels with no horizontal overflow or browser exceptions. Wallpaper, swipe navigation, Gmail compose link and reduced-motion scrolling were checked.
- All 12 preview flows and 186 preview layout checks passed, including loading isolation under 4x CPU throttling.

These are desktop Chrome emulation checks, not a guarantee of zero lag on every physical device.
