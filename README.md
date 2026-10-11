# ECID Tool

Original static web tool that converts an Apple **ECID** between decimal and hexadecimal forms, and parses a modern **CPID-ECID** UDID string.

> ملاحظة عربية: أداة أصلية تعمل في المتصفح فقط، بدون اتصال بالجهاز وبدون رفع بيانات.

**Repo:** https://github.com/jdjsbdvd7-arch/ecid-tool  
**Pages (after enable):** https://jdjsbdvd7-arch.github.io/ecid-tool/

## Enable GitHub Pages (one-time)

The deploy workflow is already in the repo. Pages must be turned on once in Settings (no API available from this account connection):

1. Open https://github.com/jdjsbdvd7-arch/ecid-tool/settings/pages
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Open https://github.com/jdjsbdvd7-arch/ecid-tool/actions and re-run **Deploy GitHub Pages** (or push any small commit)

**Alternative (no Actions):** on the same Pages settings page, choose **Deploy from a branch**, branch **main**, folder **/ (root)**.

## What it does

- Accepts ECID as **decimal** or **hex** (`0x` optional)
- Shows both forms and pads hex to **16 digits** (64-bit)
- Parses UDID-style input `CPID-ECID` and shows CPID + ECID
- Runs entirely in the browser (no server, no device pairing)

## What it is not

- Not a copy of any third-party ECID website
- Not a jailbreak, signing, or trust-chain tool
- Not connected to your iPhone; values are typed or pasted by you

## Use

Open the GitHub Pages URL after enabling Pages, paste a value, and press **Convert**.

Locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Research utility

Handy when comparing install logs, provisioning notes, or research notes that mix decimal ECID, hex ECID, and UDID strings. For personal / research bookkeeping only.

## License

MIT — original work for this repository.
