// ==UserScript==
// @name         WorkFlowy Focus Fix
// @namespace    https://rawbytz.wordpress.com
// @version      2.0
// @description  Fix WorkFlowy lost focus
// @author       rawbytz
// @match        https://workflowy.com/*
// @match        https://beta.workflowy.com/*
// @updateUrl    https://gist.github.com/rawbytz/b50d56662fd942eedb8589ed4148daaa/raw/focusFix.user.js
// @downloadUrl  https://gist.github.com/rawbytz/b50d56662fd942eedb8589ed4148daaa/raw/focusFix.user.js
// @grant        none
// @run-at       document-end

// ==/UserScript==

(function () {
  'use strict';
  function fixFocus() {
    const active = document.activeElement.className;
    if (active.includes("searchBoxInput") || active.includes("content")) return;
    const matches = document.querySelectorAll(".name.matches .content, .notes.matches .content, .metaMatches .name .content");
    if (matches.length > 0) return void matches[0].focus();
    const index = WF.currentItem().isMainDocumentRoot() && !WF.currentSearchQuery() ? 2 : 0;
    const content = document.getElementsByClassName("content");
    if (content.length > 0) content[index].focus();
    }
  window.WFEventListener = event => {
    if (event === 'locationChanged') requestAnimationFrame(fixFocus);
  };
  function waitForActivePage() {
    if (document.getElementsByClassName("page active").length > 0) return void fixFocus();
    setTimeout(waitForActivePage, 300);
  }
  waitForActivePage();
})();