export function sanitizeExternalUrl(raw?: string | null): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export function extractYouTubeId(rawUrl?: string | null): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const match = rawUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/
  );
  const id = match?.[1];
  return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
}

export function sanitizePlainText(input: unknown, maxLength = 300): string {
  if (input === null || input === undefined) return '';
  const text = String(input)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

export function clearLocalPortalData(): void {
  localStorage.clear();
  sessionStorage.clear();
}

export async function fetchWithTimeout(
  url: string,
  timeoutMs = 8000
): Promise<Response> {
  const safeUrl = sanitizeExternalUrl(url);
  if (!safeUrl) {
    throw new Error('URL sumber data tidak valid.');
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(safeUrl, {
      method: 'GET',
      signal: controller.signal,
      referrerPolicy: 'no-referrer',
    });
  } finally {
    window.clearTimeout(timer);
  }
}

export function fetchGoogleAppsScriptJsonp<T = Record<string, unknown>>(
  baseUrl: string,
  params: Record<string, string>,
  timeoutMs = 10000
): Promise<T> {
  const safeUrl = sanitizeExternalUrl(baseUrl);
  if (!safeUrl || !safeUrl.startsWith('https://script.google.com/macros/')) {
    return Promise.reject(new Error('Endpoint tidak diizinkan.'));
  }

  return new Promise((resolve, reject) => {
    const randomSuffix = Math.random().toString(36).slice(2, 10);
    const callbackName = `prida_cb_${Date.now()}_${randomSuffix}`;
    const script = document.createElement('script');
    let settled = false;

    const cleanup = () => {
      if (callbackName in window) {
        delete (window as unknown as Record<string, unknown>)[callbackName];
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };

    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error('Permintaan ke server melebihi batas waktu.'));
    }, timeoutMs);

    (window as unknown as Record<string, (payload: T) => void>)[callbackName] = (
      payload: T
    ) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      cleanup();
      resolve(payload);
    };

    const query = new URLSearchParams({
      ...params,
      callback: callbackName,
    });

    script.src = `${safeUrl}?${query.toString()}`;
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      cleanup();
      reject(new Error('Gagal terhubung ke layanan data sekolah.'));
    };

    document.body.appendChild(script);
  });
}
