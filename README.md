# Titip Absen

Automatically clock in and clock out on Talenta.

## Usage

Fork the repo, then add the following `secrets` to your repo:

- Account (Required)
  - `TALENTA_USERNAME` (email)
  - `TALENTA_PASSWORD`
- Location (Optional, default to Talenta's office)
  - `TALENTA_LATITUDE`
  - `TALENTA_LONGITUDE`

Use `tests/ignore.json` to skip clock in on a specific day, e.g. public holidays, leave, etc.
