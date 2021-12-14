var s = document.createElement('script')
s.src = chrome.runtime.getURL('do_block.js')
s.onload = function() {
  s.remove();
}
document.head.appendChild(s)