(function () {
  "use strict";

  var MAX_U64 = (typeof BigInt !== "undefined") ? BigInt("0xFFFFFFFFFFFFFFFF") : null;

  function normalizeInput(raw) {
    return String(raw || "").trim().replace(/\s+/g, "");
  }

  function padHex16(hex) {
    var h = hex.toLowerCase().replace(/^0x/i, "");
    if (h.length > 16) {
      throw new Error("Value exceeds 64-bit ECID range.");
    }
    return h.padStart(16, "0");
  }

  function bigintToHex16(value) {
    if (value < 0n || value > MAX_U64) {
      throw new Error("Value is outside the unsigned 64-bit range.");
    }
    return value.toString(16).padStart(16, "0");
  }

  function parseDecimal(s) {
    if (!/^\d+$/.test(s)) return null;
    try {
      return BigInt(s);
    } catch (e) {
      return null;
    }
  }

  function parseHex(s) {
    var m = s.match(/^(?:0x)?([0-9a-fA-F]{1,16})$/);
    if (!m) return null;
    try {
      return BigInt("0x" + m[1]);
    } catch (e) {
      return null;
    }
  }

  /**
   * Modern Apple UDID-style strings often look like:
   *   CPID-ECID  e.g. 00008110-001A2B3C4D5E6F70
   * First segment: chip/product id style hex (commonly 8 hex digits).
   * Second segment: ECID as up to 16 hex digits.
   */
  function parseUdid(s) {
    var m = s.match(/^([0-9a-fA-F]{4,16})-([0-9a-fA-F]{1,16})$/);
    if (!m) return null;
    var cpid = m[1].toLowerCase();
    var ecidHex = padHex16(m[2]);
    var ecid = BigInt("0x" + ecidHex);
    return { cpid: cpid, ecid: ecid, ecidHex: ecidHex };
  }

  function convert(raw) {
    var s = normalizeInput(raw);
    if (!s) {
      throw new Error("Paste a decimal ECID, hex ECID, or CPID-ECID UDID.");
    }

    var udid = parseUdid(s);
    if (udid) {
      return {
        decimal: udid.ecid.toString(10),
        hex: udid.ecidHex,
        hex0x: "0x" + udid.ecidHex,
        cpid: udid.cpid,
        udidNote: udid.cpid + "-" + udid.ecidHex
      };
    }

    var value = parseHex(s);
    if (value === null) {
      value = parseDecimal(s);
    }
    if (value === null) {
      throw new Error("Unrecognized format. Use decimal, hex (optional 0x), or CPID-ECID.");
    }

    var hex = bigintToHex16(value);
    return {
      decimal: value.toString(10),
      hex: hex,
      hex0x: "0x" + hex,
      cpid: null,
      udidNote: null
    };
  }

  function showError(msg) {
    var el = document.getElementById("error");
    el.textContent = msg;
    el.hidden = !msg;
  }

  function setText(id, text) {
    document.getElementById(id).textContent = text;
  }

  function run() {
    showError("");
    var results = document.getElementById("results");
    try {
      var out = convert(document.getElementById("input").value);
      setText("out-dec", out.decimal);
      setText("out-hex", out.hex);
      setText("out-hex0x", out.hex0x);

      var cpidRow = document.getElementById("cpid-row");
      var udidRow = document.getElementById("udid-row");
      if (out.cpid) {
        setText("out-cpid", out.cpid);
        setText("out-udid", out.udidNote);
        cpidRow.hidden = false;
        udidRow.hidden = false;
      } else {
        cpidRow.hidden = true;
        udidRow.hidden = true;
      }
      results.hidden = false;
    } catch (err) {
      results.hidden = true;
      showError(err.message || String(err));
    }
  }

  document.getElementById("convert").addEventListener("click", run);
  document.getElementById("clear").addEventListener("click", function () {
    document.getElementById("input").value = "";
    document.getElementById("results").hidden = true;
    showError("");
  });
  document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      run();
    }
  });

  document.querySelectorAll("button.copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-copy");
      var text = document.getElementById(id).textContent;
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () {});
      }
    });
  });
})();
