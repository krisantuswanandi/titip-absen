# Titip Absen

Clock in and clock out on Talenta from Terminal.

## Usage

- Clone the repo.
- Copy `.env.example` to `.env`.
- Fill in the required environment variables:
  - `TALENTA_USERNAME` - Talenta email
  - `TALENTA_PASSWORD` - Talenta password
  - `TALENTA_LATITUDE_WFH` - Latitude of your home
  - `TALENTA_LONGITUDE_WFH` - Longitude of your home
  - `TALENTA_LATITUDE_WFO` - Latitude of your office
  - `TALENTA_LONGITUDE_WFO` - Longitude of your office
- Run `npm install` to install all the dependencies.
- Run `npx playwright install chromium` to install the browser.
- To clock in, run `npm run clock-in`.
- To clock out, run `npm run clock-out`.

## Helper

- `data/*` files are used to store special dates for clocking in.
- The files in `data/*` are filled with dates in the `YYYY-MM-DD` format, separated by a newline. For example:

  ```
  2024-01-01
  2024-01-02
  2024-01-03
  ```

- `data/ignore` is used to skip clocking in on a specific day, such as public holidays, leave, etc.
- `data/wfo` is used to clock in with the office location.

## Automation

You can setup a cron job to automate the command with crontab.
