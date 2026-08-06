import { NextResponse } from 'next/server';

const LIVE_DATA_URL =
  'https://www.wwa-ke.bayern.de/themen/fluesse_seen/gewaesserportraits/rottachsee/index.htm';
const GKD_LEVEL_URL =
  'https://www.gkd.bayern.de/de/seen/wasserstand/inn/rottachsee-11444001/gesamtzeitraum/tabelle';
const GKD_TEMPERATURE_URL =
  'https://www.gkd.bayern.de/de/seen/wassertemperatur/inn/rottachsee-11444001/gesamtzeitraum/tabelle';

const GAUGE_ZERO_METRES = 800;
const FULL_LEVEL_METRES = 50;

const FETCH_OPTIONS = {
  headers: {
    'User-Agent': 'Petersthal-Dorfportal/1.0 (https://www.petersthal.info)',
  },
  next: { revalidate: 900 },
} as const;

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&deg;/gi, '°')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNumber(value: string | undefined) {
  if (!value) return null;
  const match = stripHtml(value).match(/-?\d+(?:[.,]\d+)?/);
  return match ? Number.parseFloat(match[0].replace(',', '.')) : null;
}

function tableValue(html: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const row = html.match(
    new RegExp(`<tr[^>]*>[\\s\\S]*?<td[^>]*>\\s*${escapedLabel}\\s*</td>[\\s\\S]*?<td[^>]*>([\\s\\S]*?)</td>`, 'i')
  );
  return row?.[1];
}

function parseLiveData(html: string) {
  const timestamp = html.match(/Aktuelle Messdaten vom\s*([^<]+)<\/h2>/i)?.[1];
  const elevation = parseNumber(tableValue(html, 'Seestand'));

  return {
    measuredAt: timestamp ? stripHtml(timestamp) : null,
    waterTemperature: parseNumber(tableValue(html, 'Wassertemperatur')),
    lakeLevel: elevation === null ? null : Number((elevation - GAUGE_ZERO_METRES).toFixed(2)),
    lakeLevelElevation: elevation,
    airTemperature: parseNumber(tableValue(html, 'Lufttemperatur')),
    windSpeed: parseNumber(tableValue(html, 'Windstärke')),
    waterQuality: tableValue(html, 'Wasserqualität')
      ? stripHtml(tableValue(html, 'Wasserqualität') as string)
      : null,
  };
}

function parseDailyAverages(html: string) {
  return Array.from(
    html.matchAll(
      /<tr[^>]*>[\s\S]*?<td[^>]*>\s*(\d{2}\.\d{2}\.\d{4})\s*<\/td>[\s\S]*?<td[^>]*class="center"[^>]*>\s*(-?\d+(?:[.,]\d+)?)\s*<\/td>[\s\S]*?<td[^>]*class="center"[^>]*>[\s\S]*?<\/td>[\s\S]*?<td[^>]*class="center"[^>]*>[\s\S]*?<\/td>[\s\S]*?<\/tr>/gi
    )
  ).map((match) => ({
    date: match[1],
    label: match[1].slice(0, 5),
    value: Number.parseFloat(match[2].replace(',', '.')),
  }));
}

function formatGermanDate(date: Date) {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getUTCFullYear()}`;
}

function buildHistoryUrl(baseUrl: string, start: string, end: string, isTemperature = false) {
  const url = new URL(baseUrl);
  url.searchParams.set('zr', 'gesamt');
  url.searchParams.set('beginn', start);
  url.searchParams.set('ende', end);

  if (isTemperature) {
    url.searchParams.set('dir', 'none');
    url.searchParams.set('start', end);
  } else {
    url.searchParams.set('addhr', 'hr_w_hw');
  }

  return url.toString();
}

export async function GET() {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setUTCFullYear(startDate.getUTCFullYear() - 1);
    const start = formatGermanDate(startDate);
    const end = formatGermanDate(endDate);
    const levelHistoryUrl = buildHistoryUrl(GKD_LEVEL_URL, start, end);
    const temperatureHistoryUrl = buildHistoryUrl(GKD_TEMPERATURE_URL, start, end, true);

    const [liveResponse, levelResponse, temperatureResponse] = await Promise.all([
      fetch(LIVE_DATA_URL, FETCH_OPTIONS),
      fetch(levelHistoryUrl, FETCH_OPTIONS),
      fetch(temperatureHistoryUrl, FETCH_OPTIONS),
    ]);

    if (!liveResponse.ok || !levelResponse.ok || !temperatureResponse.ok) {
      throw new Error('Official Rottachsee data source is unavailable');
    }

    const [liveHtml, levelHtml, temperatureHtml] = await Promise.all([
      liveResponse.text(),
      levelResponse.text(),
      temperatureResponse.text(),
    ]);
    const live = parseLiveData(liveHtml);
    const rawLevelHistory = parseDailyAverages(levelHtml);
    const rawTemperatureHistory = parseDailyAverages(temperatureHtml);

    if (
      live.waterTemperature === null ||
      live.lakeLevel === null ||
      rawLevelHistory.length < 300 ||
      rawTemperatureHistory.length < 300
    ) {
      throw new Error('Official Rottachsee data could not be parsed');
    }

    const levelHistory = rawLevelHistory.reverse().map((point) => ({
      date: point.date,
      label: point.label,
      level: Number((point.value - GAUGE_ZERO_METRES).toFixed(2)),
    }));
    const temperatureHistory = rawTemperatureHistory.reverse().map((point) => ({
      date: point.date,
      label: point.label,
      temperature: point.value,
    }));

    return NextResponse.json(
      {
        ...live,
        fullLevel: FULL_LEVEL_METRES,
        levelHistory,
        temperatureHistory,
        source: {
          name: 'Wasserwirtschaftsamt Kempten',
          url: LIVE_DATA_URL,
          historyName: 'Gewässerkundlicher Dienst Bayern',
          historyUrl: GKD_LEVEL_URL,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('Rottachsee data error:', error);
    return NextResponse.json(
      { error: 'Die Rottachsee-Messdaten sind gerade nicht erreichbar.' },
      { status: 503 }
    );
  }
}
