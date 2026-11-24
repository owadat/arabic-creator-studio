# Arabic Creator Studio | استوديو صناعة المحتوى العربي

Free, Arabic-first, browser-based video pre-production toolkit. No API key, server, account or external dependency.

## Features | المزايا
- Divide an Arabic script into editable scenes and estimate narration duration.
- Arrange scenes and prepare visual prompt templates (not AI-generated media).
- Export estimated SRT subtitles, CSV production sheets and JSON project backups.
- Import JSON, save locally, and rehearse using an adjustable scrolling teleprompter.

## تشغيل المشروع | Run
Open `index.html` in a modern browser, or enable GitHub Pages on the `main` branch and root directory. Local storage and clipboard behavior may vary when opening a local file. Use JSON backups to avoid losing data. Subtitle timings are estimates, not audio transcription; adjust them against recordings.

## Tests
With Node.js installed, run `node test.js`. No dependencies required.

## Privacy
The app does not send project text to any server. Browser storage stays on the current device/profile unless exported by the user. Hosting providers may process ordinary page-access logs.

## Contributing | المساهمة
Open an issue for a reproducible bug or feature suggestion; pull requests are welcome. Please avoid submitting private scripts or credentials. Potential next steps: English UI, per-line caption editing, accessibility improvements and audio-aligned timing. These are planned, not implemented.

## License
MIT. See LICENSE.
