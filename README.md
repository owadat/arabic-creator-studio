# Arabic Creator Studio v2.0 | استوديو صناعة المحتوى العربي

Free, Arabic-first, browser-based video production toolkit. No account, API key, server or external JavaScript dependency.

## Features | المزايا
- Divide scripts into editable scenes, estimate narration duration, reorder scenes and build visual prompt templates.
- Export estimated SRT subtitles, CSV production sheets and JSON backups; adjustable scrolling teleprompter.
- Upload a picture per scene, or use automatically rendered text cards; preview and render a slideshow video with optional Arabic captions.
- Upload narration and background music, adjust their volume independently, and export a video using Canvas and MediaRecorder (WebM or MP4 according to browser support).
- 720p portrait, landscape and square layouts; video length limit: 180 seconds.
- Listen to Arabic text using browser speech synthesis where a compatible voice is available. This preview voice is not recorded into the exported video; upload a narration audio file instead.

## Run | التشغيل
Open `index.html` or deploy the contents of this directory to GitHub Pages (main branch, root). Use a recent Chrome/Edge or compatible browser; media APIs and formats vary by OS and browser. Keep the tab visible while rendering in real time. Exported subtitles are estimated, not audio transcription. Adjust scene durations to match your recording. The exported video may need conversion to MP4 for some social platforms.

## Privacy and storage
Project text is saved locally, with the same storage key as v1. JSON contains text/settings, not uploaded media. Reattach images/audio after reloading. Files are processed locally in the browser; system text-to-speech may use an online service depending on the selected voice and device. The hosting provider may process ordinary access logs. Use only images and audio you have rights to use.

## Limitations and roadmap
This is a slideshow/video editor and prompt builder, not a generative AI image or video model. No image generation backend is included. Planned improvements include local AI model integration, downloadable TTS narration, transitions, and audio-aligned captions. Contributions and reproducible bug reports are welcome.

## Tests
Run `node test.js` (Node.js, no dependencies). Browser smoke testing is recommended for media export.

## License
MIT. See LICENSE.
