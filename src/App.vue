<template>
  <h1>
    <a href="//webrtc.github.io/samples/" title="WebRTC samples homepage"
      >WebRTC samples</a
    >
    <span>getUserMedia</span>
  </h1>

  <video ref="VideoRef" autoplay playsinline></video>
  <button @click="handleInit()">Open camera</button>
  <button @click="handleTakephoto()">Take photo</button>
  <button @click="handleUsedemo()">Use demo</button>

  <div id="errorMsg">
    <canvas ref="CanvasRef"></canvas>
  </div>

  <p class="warning">
    <strong>Warning:</strong> if you're not using headphones, pressing play will
    cause feedback.
  </p>

  <p>
    Display the video stream from <code>getUserMedia()</code> in a video
    element.
  </p>

  <p>
    The <code>MediaStream</code> object <code>stream</code> passed to the
    <code>getUserMedia()</code> callback is in global scope, so you can inspect
    it from the console.
  </p>

  <a
    href="https://github.com/webrtc/samples/tree/gh-pages/src/content/getusermedia/gum"
    title="View source for this page on GitHub"
    id="viewSource"
    >View source on GitHub</a
  >
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const VideoRef = ref<HTMLVideoElement>();
    const CanvasRef = ref<HTMLCanvasElement>();
    const constraints = {
      audio: false,
      video: true,
    };
    const handleSuccess = (stream: MediaStream) => {
      const video = document.querySelector("video");
      const videoTracks = stream.getVideoTracks();
      console.log("Got stream with constraints:", constraints);
      console.log(`Using video device: ${videoTracks[0].label}`);
      // window.stream = stream; // make variable available to browser console
      video!.srcObject = stream;
    };
    const handleError = (error: Error) => {
      if (error.name === "PermissionDeniedError") {
        errorMsg(
          "Permissions have not been granted to use your camera and " +
            "microphone, you need to allow the page access to your devices in " +
            "order for the demo to work."
        );
      }
      errorMsg(`getUserMedia error: ${error.name}`, error);
    };
    const errorMsg = (msg: string, error: Error | undefined = undefined) => {
      const errorElement = document.querySelector("#errorMsg");
      errorElement!.innerHTML += `<p>${msg}</p>`;
      if (typeof error !== "undefined") {
        console.error(error);
      }
    };
    const handleInit = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
      } catch (e: any) {
        handleError(e);
      }
    };
    // https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
    const handleTakephoto = () => {
      if (CanvasRef.value && VideoRef.value) {
        const width = VideoRef.value?.videoWidth;
        const height = VideoRef.value?.videoHeight;
        const context = CanvasRef.value.getContext("2d");
        if (width && height) {
          CanvasRef.value.width = width;
          CanvasRef.value.height = height;
          context?.drawImage(VideoRef.value, 0, 0, width, height);
        } else {
          console.log(VideoRef.value);
        }
      } else {
        console.log(CanvasRef.value, VideoRef.value);
      }
      // var context = canvas.getContext("2d");
      // if (width && height) {
      //   canvas.width = width;
      //   canvas.height = height;
      //   context.drawImage(video, 0, 0, width, height);
      //   var data = canvas.toDataURL("image/png");
      //   photo.setAttribute("src", data);
      // } else {
      //   clearphoto();
      // }
    };
    const handleUsedemo = () => {
      // f.video.weibocdn.com/000KGDZzgx07PBPYeZe701041201NtlX0E010.mp4
      if (VideoRef.value) {
        VideoRef.value.src =
          "https://www.apple.com.cn/105/media/cn/music/2020/a6a91a55-edb9-4570-a7b7-7af8b0f45e23/anim/hero/large.mp4";
      }
      console.log("hello");
    };
    return {
      VideoRef,
      CanvasRef,
      handleInit,
      handleTakephoto,
      handleUsedemo,
    };
  },
});
</script>

<style>
/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
.hidden {
  display: none;
}

.highlight {
  background-color: #eee;
  font-size: 1.2em;
  margin: 0 0 30px 0;
  padding: 0.2em 1.5em;
}

.warning {
  color: red;
  font-weight: 400;
}

@media screen and (min-width: 1000px) {
  /* hack! to detect non-touch devices */
  div#links a {
    line-height: 0.8em;
  }
}

audio {
  max-width: 100%;
}

body {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  margin: 0;
  padding: 1em;
  word-break: break-word;
}

button {
  background-color: #d84a38;
  border: none;
  border-radius: 2px;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 0.8em;
  margin: 0 0 1em 0;
  padding: 0.5em 0.7em 0.6em 0.7em;
}

button:active {
  background-color: #cf402f;
}

button:hover {
  background-color: #cf402f;
}

button[disabled] {
  color: #ccc;
}

button[disabled]:hover {
  background-color: #d84a38;
}

canvas {
  background-color: #ccc;
  max-width: 100%;
  width: 100%;
}

code {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

div#container {
  margin: 0 auto 0 auto;
  max-width: 60em;
  padding: 1em 1.5em 1.3em 1.5em;
}

div#links {
  padding: 0.5em 0 0 0;
}

h1 {
  border-bottom: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin: 0 0 0.8em 0;
  padding: 0 0 0.2em 0;
}

h2 {
  color: #444;
  font-weight: 500;
}

h3 {
  border-top: 1px solid #eee;
  color: #666;
  font-weight: 500;
  margin: 10px 0 10px 0;
  white-space: nowrap;
}

li {
  margin: 0 0 0.4em 0;
}

html {
  /* avoid annoying page width change
  when moving from the home page */
  overflow-y: scroll;
}

img {
  border: none;
  max-width: 100%;
}

input[type="radio"] {
  position: relative;
  top: -1px;
}

p {
  color: #444;
  font-weight: 300;
}

p#data {
  border-top: 1px dotted #666;
  font-family: Courier New, monospace;
  line-height: 1.3em;
  max-height: 1000px;
  overflow-y: auto;
  padding: 1em 0 0 0;
}

p.borderBelow {
  border-bottom: 1px solid #aaa;
  padding: 0 0 20px 0;
}

section p:last-of-type {
  margin: 0;
}

section {
  border-bottom: 1px solid #eee;
  margin: 0 0 30px 0;
  padding: 0 0 20px 0;
}

section:last-of-type {
  border-bottom: none;
  padding: 0 0 1em 0;
}

select {
  margin: 0 1em 1em 0;
  position: relative;
  top: -1px;
}

h1 span {
  white-space: nowrap;
}

a {
  color: #1d6eee;
  font-weight: 300;
  text-decoration: none;
}

h1 a {
  font-weight: 300;
  margin: 0 10px 0 0;
  white-space: nowrap;
}

a:hover {
  color: #3d85c6;
  text-decoration: underline;
}

a#viewSource {
  display: block;
  margin: 1.3em 0 0 0;
  border-top: 1px solid #999;
  padding: 1em 0 0 0;
}

div#errorMsg p {
  color: #f00;
}

div#links a {
  display: block;
  line-height: 1.3em;
  margin: 0 0 1.5em 0;
}

div.outputSelector {
  margin: -1.3em 0 2em 0;
}

p.description {
  margin: 0 0 0.5em 0;
}

strong {
  font-weight: 500;
}

textarea {
  resize: none;
  font-family: "Roboto", sans-serif;
}

video {
  background: #222;
  margin: 0 0 20px 0;
  --width: 100%;
  width: var(--width);
  height: calc(var(--width) * 0.75);
}

ul {
  margin: 0 0 0.5em 0;
}

@media screen and (max-width: 650px) {
  .highlight {
    font-size: 1em;
    margin: 0 0 20px 0;
    padding: 0.2em 1em;
  }

  h1 {
    font-size: 24px;
  }
}

@media screen and (max-width: 550px) {
  button:active {
    background-color: darkRed;
  }

  h1 {
    font-size: 22px;
  }
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 20px;
  }
}
</style>
