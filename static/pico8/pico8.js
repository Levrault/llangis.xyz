// Default shell for PICO-8 0.1.12

// options

// p8_autoplay true to boot the cartridge automatically after page load when possible
// if the browser can not create an audio context outside of a user gesture (e.g. on iOS), p8_autoplay has no effect
var p8_autoplay = false

// When pico8_state is defined, PICO-8 will set .is_paused, .sound_volume and .frame_number each frame
// (used for determining button icons)
var pico8_state = []

// When pico8_buttons is defined, PICO-8 reads each int as a bitfield holding that player's button states
// 0x1 left, 0x2 right, 0x4 up, 0x8 right, 0x10 O, 0x20 X, 0x40 menu
// (used by p8_update_gamepads)
var pico8_buttons = [0, 0, 0, 0, 0, 0, 0, 0] // max 8 players

// used to display number of detected joysticks
var pico8_gamepads = {}
pico8_gamepads.count = 0

// When pico8_mouse is defined, PICO-8 reads the 3 integers as X, Y and a bitfield for buttons: 0x1 LMB, 0x2 RMB
// var pico8_mouse = [0,0,0];

// When pico8_gpio is defined, reading and writing to gpio pins will read and write to these values
// var pico8_gpio = new Array(128);

// When pico8_audio_context context is defined, the html shell (this file) is responsible for creating and managing it
// Otherwise, PICO-8 will create its own one
var pico8_audio_context

p8_gfx_dat = {
  p8b_pause1:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAOUlEQVRIx2NgGPbg/8cX/0F46FtAM4vobgHVLRowC6hm0YBbQLFFoxaM4FQ0dHPy0C1Nh26NNugBAAnizNiMfvbGAAAAAElFTkSuQmCC',
  p8b_controls:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAQ0lEQVRIx2NgGAXEgP8fX/ynBaap4XBLhqcF1IyfYWQBrZLz0LEAlzqqxQFVLcAmT3MLqJqTaW7B4CqLaF4fjIIBBwBL/B2vqtPVIwAAAABJRU5ErkJggg==',
  p8b_full:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAN0lEQVRIx2NgGPLg/8cX/2mJ6WcBrUJm4CwgOSgGrQVEB8WoBaMWDGMLhm5OHnql6dCt0YY8AAA9oZm+9Z9xQAAAAABJRU5ErkJggg==',
  p8b_pause0:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAKUlEQVRIx2NgGHbg/8cX/7FhctWNWjBqwagFoxaMWjBqwagF5Fkw5AAAPaGZvsIUtXUAAAAASUVORK5CYII=',
  p8b_sound0:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAANklEQVRIx2NgGDHg/8cX/5Hx0LEA3cChYwEugwavBcRG4qgFoxYMZwuGfk4efqXp8KnRBj0AAMz7cLDnG4FeAAAAAElFTkSuQmCC',
  p8b_sound1:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAPUlEQVRIx2NgGDHg/8cX/5Hx0LEA3cChYwEugwhZQLQDqG4BsZFIKMhGLRi1YChbMPRz8vArTYdPjTboAQCSVgpXUWQAMAAAAABJRU5ErkJggg==',
  p8b_close:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAU0lEQVRIx2NkoDFgpJsF/z+++I8iwS9BkuW49A+cBcRaREgf/Swg1SJi1dHfAkIG4EyOOIJy4Cwg1iJCiWDUAvItGLqpaOjm5KFfmg79Gm3ItioAl+mAGVYIZUUAAAAASUVORK5CYII=',

  controls_left_panel:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAEI0lEQVR42u3dMU7DQBCG0Tjam9DTcP8jpEmfswS5iHBhAsLxev/hvQY6pGXyZRTQ+nQCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHqbHEEtl+vt7hS+fLy/mXHBQqxEi/6aI/AiFW9SnB2BWDkDBAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwONJ8tYvrXRAsImK19j0IFsPGSrQQLCJiNV+et7xAT7QQLIaN1dr3ooVgMWysRAvBIipWooVgERUr0UKwiIqVaCFYRMVKtBAsomIlWggWUbESLQSLqFiJFoJFVKxEC8EiKlaihWARFSvRQrDYJSSVfhaCBSBYAIIFCBbAHpoj4Bl/scOGBWDD4lX8iwE2LADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAECxAsAMECECxAsMh1ud7uTsHZVDcZyFo8Yt5sVJ6NyUAaSNEyIymaXwZepIKd4mwoQbAFC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQI4UHME2/10QZq7usyBObBhRQwpmBUb1nADuPbuaUD/p2ezMH+1admwhosVfBcxb2SCJVaIlmAhVoiWYIkVoiVagiVWiJZgiZVYIVqCJVaIlmgJllghWoIlViBagiVWiJZoCZZYIVqCJVYgWoIlViBaggUIlnc0sPELlmghVmIlWKKFWAmWaIFYCZZoIVYIlmghVoIlWiBWgiVaiJVgIVqIlWCJFoiVYIkWYiVYiBZiJViihViJ1XbNEWyL1mMQRYvfvIGJlQ1rmE0LzIoNyyBiDrBhAYIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgDc+Nn1D/tdH8YupwgZy5qG4ykKIlVmZDsDjshSlazqQqH7p793Q2CBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWwENzBKxZPub9CJ7WjA0LsGFRV+9N5+jNDhsWgGABggUgWACCxW56fgjuA3cEiz9Z/nWwR0iWP8P/YCFYDBstsUKwiIiWWCFYRERLrBAsIqIlVggWEdESKwSLiGiJFYJFRLTECsEiIlpihWARES2xQrCIiJZYIVhEREusECwioiVWCBYx0RIrBIuoaIkVr+YhFHTZtMCGBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBbj2uOR8s6AEbhexgsWYri3SKhKczcXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2n+e0UMDzh3yTAAAAAElFTkSuQmCC',

  controls_right_panel:
    'data:image/png;base64,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',
}

function p8_update_button_icons() {
  // regenerate every frame (shouldn't be expensive?)
  els = document.getElementsByClassName('p8_menu_button')
  for (i = 0; i < els.length; i++) {
    el = els[i]
    index = el.id
    if (index == 'p8b_sound') {
      index += pico8_state.sound_volume == 0 ? '0' : '1'
    } // 1 if undefined
    if (index == 'p8b_pause') index += pico8_state.is_paused > 0 ? '1' : '0' // 0 if undefined
    new_str =
      '<img width=24 height=24 style="pointer-events:none" src="' +
      p8_gfx_dat[index] +
      '">'
    if (el.innerHTML != new_str) el.innerHTML = new_str

    // hide all buttons for touch mode (can pause with menu buttons)

    var is_visible = p8_is_running

    if (!p8_touch_detected && el.parentElement.id == 'menu_buttons_touch') {
      is_visible = false
    }
    if (p8_touch_detected && el.parentElement.id == 'menu_buttons') {
      is_visible = false
    }

    var is_fullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitIsFullScreen ||
      document.msFullscreenElement
    if (is_fullscreen) is_visible = false

    if (is_visible) el.style.display = ''
    else el.style.display = 'none'
  }
  requestAnimationFrame(p8_update_button_icons)
}

function abs(x) {
  return x < 0 ? -x : x
}

// step 0 down 1 drag 2 up
function pico8_buttons_event(e, step) {
  if (!p8_is_running) return

  pico8_buttons[0] = 0

  var num = 0
  if (e.touches) num = e.touches.length

  for (var i = 0; i < num; i++) {
    var touch = null

    touch = e.touches[i]
    //tindex = touch.identifier;
    var x = touch.clientX
    var y = touch.clientY

    // same as svg drawing
    var w = window.innerWidth
    var h = window.innerHeight

    var r = Math.min(w, h) / 12
    if (r > 40) r = 40

    b = 0

    if (y < h - r * 8) {
      // no controller buttons up here; includes canvas and menu buttons at top in touch mode
    } else if (y < h - r * 6 && y > h - r * 8) {
      // menu button: half as high as X O button
      // stretch across right-hand half above X O buttons
      if (x > w - r * 3) b |= 0x40
    } else if (x < w / 2 && x < r * 6) {
      // stick

      mask = 0xf // dpad
      var cx = 0 + r * 3
      var cy = h - r * 3

      deadzone = r / 3
      var dx = x - cx
      var dy = y - cy

      if (abs(dx) > abs(dy) * 0.6) {
        // horizontal
        if (dx < -deadzone) b |= 0x1
        if (dx > deadzone) b |= 0x2
      }
      if (abs(dy) > abs(dx) * 0.6) {
        // vertical
        if (dy < -deadzone) b |= 0x4
        if (dy > deadzone) b |= 0x8
      }
    } else if (x > w - r * 6) {
      // button; diagonal split from bottom right corner

      mask = 0x30

      // one or both of [X], [O]
      if (h - y > (w - x) * 0.8) b |= 0x10
      if (w - x > (h - y) * 0.8) b |= 0x20
    }
    pico8_buttons[0] |= b
  }
}

// call this every frame --  browser is supposed to handle redundant changes, right?
// otherwise difficult to catch every case layout needs to be updated
function p8_update_layout() {
  var canvas = document.getElementById('canvas')
  var p8_playarea = document.getElementById('p8_playarea')
  var p8_container = document.getElementById('p8_container')
  var p8_frame = document.getElementById('p8_frame')
  var csize = 512
  var margin_top = 0
  var margin_left = 0

  // page didn't load yet? first call should be after p8_frame is created
  if (!canvas || !p8_playarea || !p8_container || !p8_frame) {
    requestAnimationFrame(p8_update_layout)
    return
  }

  // assumes frame doesn't have padding

  var is_fullscreen =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitIsFullScreen ||
    document.msFullscreenElement
  var frame_width = p8_frame.offsetWidth
  var frame_height = p8_frame.offsetHeight

  if (is_fullscreen) {
    // same as window
    frame_width = window.innerWidth
    frame_height = window.innerHeight
  } else {
    // never larger than window  // (happens when address bar is down in portraight mode on phone)
    frame_width = Math.min(frame_width, window.innerWidth)
    frame_height = Math.min(frame_height, window.innerHeight)
  }

  // as big as will fit in a frame..
  csize = Math.min(frame_width, frame_height)

  // .. but never more than 2/3 of longest side for touch (e.g. leave space for controls on iPad)
  if (p8_touch_detected && p8_is_running) {
    var longest_side = Math.max(window.innerWidth, window.innerHeight)
    csize = Math.min(csize, (longest_side * 2) / 3)
  }

  // pixel perfect: quantize to closest multiple of 128
  // only when large display (desktop)
  if (frame_width >= 512 && frame_height >= 512) {
    csize = (csize + 1) & ~0x7f
  }

  if (is_fullscreen) {
    // always center horizontally
    margin_left = (frame_width - csize) / 2

    if (p8_touch_detected) {
      if (window.innerWidth < window.innerHeight) {
        // portrait: keep at y=40 (avoid rounded top corners / camer num thing etc.)
        margin_top = Math.min(40, frame_height - csize)
      } else {
        // landscape: put a little above vertical center
        margin_top = (frame_height - csize) / 4
      }
    } else {
      // non-touch: center vertically
      margin_top = (frame_height - csize) / 2
    }
  }

  // mobile in portrait mode: put screen at top (w / a little space for fullscreen button)
  // (don't cart about buttons overlapping screen)
  if (
    p8_touch_detected &&
    p8_is_running &&
    document.body.clientWidth < document.body.clientHeight
  ) {
    p8_playarea.style.marginTop = 32
  } else if (p8_touch_detected && p8_is_running) {
    p8_playarea.style.marginTop = (document.body.clientHeight - csize) / 4
  } else {
    p8_playarea.style.marginTop = ''
  }

  canvas.style.width = csize
  canvas.style.height = csize

  // to do: this should just happen from css layout
  canvas.style.marginLeft = margin_left
  canvas.style.marginTop = margin_top

  p8_container.style.width = csize
  p8_container.style.height = csize

  // set menu buttons position to bottom right
  el = document.getElementById('menu_buttons')
  el.style.marginTop = csize - el.offsetHeight

  if (p8_touch_detected && p8_is_running) {
    // turn off pointer events to prevent double-tap zoom etc (works on Android)
    // don't want this for desktop because breaks mouse input & click-to-focus when using codo_textarea
    canvas.style.pointerEvents = 'none'

    p8_container.style.marginTop = '0px'

    // buttons

    // same as touch event handling
    var w = window.innerWidth
    var h = window.innerHeight

    // doesn't work -- viewport changes size according to
    //var w = document.body.clientWidth;
    //var h = document.body.clientHeight;

    var r = Math.min(w, h) / 12

    if (r > 40) r = 40

    el = document.getElementById('controls_right_panel')
    el.style.left = w - r * 6
    el.style.top = h - r * 7
    el.style.width = r * 6
    el.style.height = r * 7
    if (el.getAttribute('src') != p8_gfx_dat['controls_right_panel']) {
      // optimisation: avoid reload? (browser should handle though)
      el.setAttribute('src', p8_gfx_dat['controls_right_panel'])
    }

    el = document.getElementById('controls_left_panel')
    el.style.left = 0
    el.style.top = h - r * 6
    el.style.width = r * 6
    el.style.height = r * 6
    if (el.getAttribute('src') != p8_gfx_dat['controls_left_panel']) {
      // optimisation: avoid reload? (browser should handle though)
      el.setAttribute('src', p8_gfx_dat['controls_left_panel'])
    }

    // scroll to cart (need to stop running with X)
    p8_frame.scrollIntoView(true)

    document.getElementById('touch_controls_gfx').style.display = 'table'
    document.getElementById('touch_controls_background').style.display = 'table'
  } else {
    document.getElementById('touch_controls_gfx').style.display = 'none'
    document.getElementById('touch_controls_background').style.display = 'none'
  }

  if (!p8_is_running) {
    p8_playarea.style.display = 'none'
    p8_container.style.display = 'flex'
    p8_container.style.marginTop = 'auto'

    el = document.getElementById('p8_start_button')
    if (el) el.style.display = 'flex'
  }
  requestAnimationFrame(p8_update_layout)
}

var p8_touch_detected = false
addEventListener(
  'touchstart',
  function(event) {
    p8_touch_detected = true
  },
  { passive: true }
)

function p8_create_audio_context() {
  if (pico8_audio_context) {
    pico8_audio_context.resume()
    return
  }
  var webAudioAPI =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext
  if (webAudioAPI) {
    pico8_audio_context = new webAudioAPI()
    if (pico8_audio_context) {
      var source_sfx = pico8_audio_context.createBufferSource()
      source_sfx.buffer = pico8_audio_context.createBuffer(1, 1, 22050) // dummy
      source_sfx.connect(pico8_audio_context.destination)
      source_sfx.start(1, 0.25)
      //source_sfx.noteOn(0);
    }
  }
}

// just hides. can reopen in a paused state.
function p8_close_cart() {
  p8_is_running = false
  p8_touch_detected = false
  Module.pico8SetPaused(1)
}

var p8_is_running = false
var p8_script = null
var Module = null
function p8_run_cart() {
  if (p8_is_running) return
  p8_is_running = true

  // create audio context and wake it up (for iOS -- needs happen inside touch event)
  p8_create_audio_context()

  // show touch elements
  els = document.getElementsByClassName('p8_controller_area')
  for (i = 0; i < els.length; i++) els[i].style.display = ''

  // install touch events. These also serve to block scrolling / pinching / zooming on phones when p8_is_running
  // moved event.preventDefault(); calls into pico8_buttons_event (want to let top buttons pass through)
  addEventListener(
    'touchstart',
    function(event) {
      pico8_buttons_event(event, 0)
    },
    { passive: false }
  )
  addEventListener(
    'touchmove',
    function(event) {
      pico8_buttons_event(event, 1)
    },
    { passive: false }
  )
  addEventListener(
    'touchend',
    function(event) {
      pico8_buttons_event(event, 2)
    },
    { passive: false }
  )

  // load and run script
  e = document.createElement('script')
  p8_script = e
  e.onload = function() {
    // show canvas / menu buttons only after loading
    el = document.getElementById('p8_playarea')
    if (el) el.style.display = 'table'
  }
  e.type = 'application/javascript'
  e.src = window.cartridge
  e.id = 'e_script'

  document.body.appendChild(e) // load and run

  // hide start button and show canvas / menu buttons. hide start button
  el = document.getElementById('p8_start_button')
  if (el) el.style.display = 'none'

  // add #playing for touchscreen devices (allows back button to close)
  if (p8_touch_detected) {
    window.location.hash = '#playing'
    window.onhashchange = function() {
      if (window.location.hash.search('playing') < 0) p8_close_cart()
    }
  }
}

// gamepad  https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
// (sets bits in pico8_buttons[])
function p8_update_gamepads() {
  var threshold = 0.3
  var max_players = 8
  var gps = navigator.getGamepads() || navigator.webkitGetGamepads()

  if (!gps) return

  pico8_gamepads.count = gps.length

  for (var i = 0; i < gps.length && i < max_players; i++) {
    var gp = gps[i]
    if (gp && gp.axes && gp.buttons) {
      pico8_buttons[i] = 0

      if (gp.axes[0] && gp.axes[0] < -threshold) pico8_buttons[i] |= 0x1
      if (gp.axes[0] && gp.axes[0] > threshold) pico8_buttons[i] |= 0x2
      if (gp.axes[1] && gp.axes[1] < -threshold) pico8_buttons[i] |= 0x4
      if (gp.axes[1] && gp.axes[1] > threshold) pico8_buttons[i] |= 0x8

      // buttons: first 4 are O/X; everything else is menu button
      for (j = 0; j < gp.buttons.length; j++) {
        if (gp.buttons[j].value > 0 || gp.buttons[j].pressed) {
          if (j < 4) pico8_buttons[i] |= 0x10 << (((j + 1) / 2) & 1)
          // 0 1 1 0 0 1 -- A,X are O,X on xbox controller
          else pico8_buttons[0] |= 0x40 // menu button
        }
      }
    }
  }

  requestAnimationFrame(p8_update_gamepads)
}
requestAnimationFrame(p8_update_gamepads)

// key blocker. prevent cursor keys from scrolling page while playing cart.
// also don't act on M, R so that can mute / reset cart
document.addEventListener(
  'keydown',
  function(event) {
    event = event || window.event
    if (!p8_is_running) return
    if (pico8_state.has_focus == 1) {
      if ([32, 37, 38, 39, 40, 77, 82, 9].indexOf(event.keyCode) > -1)
        if (event.preventDefault)
          // cursors, M R, tab
          event.preventDefault()
    }
  },
  { passive: false }
)

function p8_request_fullscreen() {
  var is_fullscreen =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitIsFullScreen ||
    document.msFullscreenElement

  var container = document.getElementById('p8_gameshell')
  if (is_fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    container.classList.remove('fullscreen')
    return
  }

  var el = document.getElementById('p8_playarea')
  container.classList.add('fullscreen')

  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
  } else if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
  }
}

p8_update_layout();
p8_update_button_icons();

var canvas = document.getElementById('canvas');
Module = {};
Module.canvas = canvas;

// from @ultrabrite's shell: test if an AudioContext can be created outside of an event callback.
// If it can't be created, then require pressing the start button to run the cartridge

if (p8_autoplay) {
  var temp_context = new AudioContext();
  temp_context.onstatechange = function () {
    if (temp_context.state == 'running') {
      p8_run_cart();
      temp_context.close();
    }
  };
}