import { DateTime } from 'luxon';
import { parse } from 'uuid';

const uuidRegex =
  /\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\//;

const buildFileName = (originalName: string): string => {
  const parsed = uuidRegex.exec(originalName);
  const uuid = parsed == null || parsed.length < 2 ? null : parsed[1];
  const uuidArray = uuid == null ? [] : parse(uuid);

  const baseName = btoa(String.fromCharCode(...uuidArray))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');

  const today = DateTime.now().toFormat('yyyyMMdd');
  return 'avalab-' + today + '-' + baseName;
};

class FileName {
  private currentImage: string | null = null;

  constructor() {
    const observer = new MutationObserver((records) => {
      for (const ch of records.flatMap((record) => [
        ...record.target.childNodes,
      ])) {
        if (
          ch instanceof HTMLImageElement &&
          ch.classList.contains('image__inner') &&
          ch.classList.contains('image--full')
        ) {
          ch.parentElement?.parentElement?.addEventListener('click', () => {
            this.currentImage = ch.src;
          });
        }
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  getFileName(): string {
    return buildFileName(this.currentImage ?? '');
  }
}

export const fileName = new FileName();
