type Meta = Record<string, unknown> | undefined;

const safeStringify = (obj: unknown) => {
  try {
    return JSON.stringify(obj);
  } catch {
    return String(obj);
  }
};

const write = (
  level: 'info' | 'warn' | 'error' | 'debug',
  message: string,
  meta?: Meta,
) => {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    ...meta,
  } as Record<string, unknown>;

  // Use console methods so logs appear in stdout/stderr
  if (level === 'error') {
    console.error(safeStringify(entry));
  } else if (level === 'warn') {
    console.warn(safeStringify(entry));
  } else {
    console.log(safeStringify(entry));
  }
};

export const info = (message: string, meta?: Meta) =>
  write('info', message, meta);
export const warn = (message: string, meta?: Meta) =>
  write('warn', message, meta);
export const error = (message: string, meta?: Meta) =>
  write('error', message, meta);
export const debug = (message: string, meta?: Meta) =>
  write('debug', message, meta);

export default {
  info,
  warn,
  error,
  debug,
};
