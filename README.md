# Arabic Creator Studio v3.0 | استوديو صناعة المحتوى العربي

Free, Arabic-first, browser-based video production toolkit. Core editor requires no account, API key, server or external JavaScript dependency; AI is optional.

## Features | المزايا
- Divide scripts into editable scenes, estimate narration duration, reorder scenes and build visual prompt templates.
- Export estimated SRT subtitles, CSV production sheets and JSON backups; adjustable scrolling teleprompter.
- Upload a picture per scene, or use automatically rendered text cards; preview and render a slideshow video with optional Arabic captions.
- Upload narration and background music, adjust their volume independently, and export a video using Canvas and MediaRecorder (WebM or MP4 according to browser support).
- 720p / 1080p portrait, landscape and square layouts; video length limit: 180 seconds.
- Listen to Arabic text using browser speech synthesis where a compatible voice is available. This preview voice is not recorded into the exported video; upload a narration audio file instead.

## Run | التشغيل
Open `index.html` or deploy the contents of this directory to GitHub Pages (main branch, root). Use a recent Chrome/Edge or compatible browser; media APIs and formats vary by OS and browser. Keep the tab visible while rendering in real time. Exported subtitles are estimated, not audio transcription. Adjust scene durations to match your recording. The exported video may need conversion to MP4 for some social platforms.

## Installable app (v2.1) | تثبيت التطبيق
- Deploy all files at the same path on GitHub Pages over HTTPS. Open the site in Chrome on Android or Edge/Chrome on Windows, then select **تثبيت التطبيق** or use the browser installation menu.
- The service worker caches only the local application shell. After the initial online visit and successful cache setup, the app can run offline. Browser voices may still require internet, and media capabilities vary by device. Uploaded images/audio are saved locally when storage is available; export JSON and keep the original media.
- This is an installable PWA, not a separately packaged APK or EXE. Updates arrive through the service worker when the site is online; reopen the app after an update is installed.

## Privacy and storage
Project text is saved locally, with the same storage key as v1. JSON contains text/settings, not uploaded media. Media is stored separately in IndexedDB. Files are processed locally in the browser; system text-to-speech may use an online service depending on the selected voice and device. The hosting provider may process ordinary access logs. Use only images and audio you have rights to use.

## Limitations and roadmap
This is a slideshow/video editor with optional experimental local AI integration. Model weights are not included. Audio-aligned captions and true AI video generation are not implemented. Contributions and reproducible bug reports are welcome.

## Tests
Run `node test.js` (Node.js, no dependencies). Browser smoke testing is recommended for media export.

## License
MIT. See LICENSE.

## V3.0 — update
- Microphone recording with permission, directly mixed into video; existing uploaded audio still works. Images and audio are saved in IndexedDB for the current project on this device (subject to storage quota); JSON remains text-only. Old v2.1 text projects are migrated automatically, but previously unsaved media must be selected again. Clearing browser data removes local media.
- 720p or 1080p, gentle zoom/pan, fade to black between scenes, caption size and color. Keep the app visible during export. Real-time recording performance and MP4 availability depend on the browser.
- Optional AI interface: no built-in hosted service and no API key in GitHub. On Windows use the local companion below. On Android, local editing works without AI; AI requires a separately configured trusted HTTPS service implementing the same endpoints (with CORS for the Pages origin). No such public service is provided. The local companion intentionally listens only on loopback.

### Optional Windows local AI engine (experimental)
1. Install Python 3.11 or 3.12 and extract the full project. Run `START-WINDOWS.bat` for the local editor at `http://127.0.0.1:8765/`. Local storage is separate from the GitHub website; export/import JSON to transfer text projects.
2. For images: in a command prompt in the project directory run `py -3 -m pip install torch diffusers transformers accelerate safetensors` (for CUDA follow the official PyTorch installation instructions). Set `STUDIO_IMAGE_MODEL=stable-diffusion-v1-5/stable-diffusion-v1-5` using `set STUDIO_IMAGE_MODEL=stable-diffusion-v1-5/stable-diffusion-v1-5` in that same command prompt, then `py -3 engine.py`. This downloads model weights on first use; several GB, GPU recommended; CPU can be very slow. Model is subject to CreativeML OpenRAIL-M terms, not the project's MIT license. English visual prompts are recommended for SD 1.5.
3. For Arabic voice: install Piper TTS (`py -3 -m pip install piper-tts`), and download both `ar_JO-kareem-medium.onnx` and `ar_JO-kareem-medium.onnx.json` from https://huggingface.co/rhasspy/piper-voices/tree/main/ar/ar_JO/kareem/medium. Set `STUDIO_VOICE_MODEL` to the full path of the `.onnx` file, and if Piper is not in PATH set `STUDIO_PIPER` to the full path of its executable. Launch `py -3 engine.py` from the same terminal. Check model card and licenses before distribution. Voice quality varies; this is a Jordanian Arabic voice, not guaranteed natural dialect narration. No model weights are bundled.
4. In the local web editor leave the AI address blank. Click Check connection, then Generate AI image next to a scene or Generate Arabic narration. Adjust scene lengths to match the audio. The backend routes and frontend are experimental; inference is not verified on the user's hardware.

API contract: GET `/api/health` returns JSON `{studio:true,image:boolean,voice:boolean}`; POST `/api/image` JSON `{prompt,ratio}` returns PNG; POST `/api/speech` JSON `{text}` returns WAV. The provided local server does not allow cross-origin access. If operating a separate HTTPS service, implement authentication, quotas, explicit CORS, and privacy protections; never expose server API keys in the web app.
