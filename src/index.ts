import { setupMaterialIcon } from './setup';
import { DownloadButton } from './download-button';
import { getRoot } from './elements';

function main() {
  setupMaterialIcon();
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      const el = record.target;
      if (
        el instanceof HTMLParagraphElement &&
        el.classList.contains('dialog-desc-item')
      ) {
        const root = getRoot(el);
        if (root != null) {
          new DownloadButton(root, el);
        }
      }
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

main();
