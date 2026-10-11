# ECID Tool

Original static web tool that converts an Apple **ECID** between decimal and hexadecimal forms, and parses a modern **CPID-ECID** UDID string.

> ملاحظة عربية: أداة أصلية تعمل في المتصفح فقط، بدون اتصال بالجهاز وبدون رفع بيانات.

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

Open the GitHub Pages site for this repository, paste a value, and press **Convert**.

Locally:

```bash
# any static server, e.g.
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Research utility

Handy when comparing install logs, provisioning notes, or research notes that mix decimal ECID, hex ECID, and UDID strings. For personal / research bookkeeping only.

## License

MIT — original work for this repository.
