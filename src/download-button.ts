export class DownloadButton {
  constructor(
    private readonly root: HTMLElement,
    private readonly prompt: HTMLParagraphElement,
  ) {
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.target instanceof HTMLAnchorElement) {
          this.atattch(record.target);
          observer.disconnect();
          return;
        }
      }
    });

    observer.observe(this.root, {
      childList: true,
      subtree: true,
    });
  }

  private atattch(target: HTMLAnchorElement): void {
    const button = document.createElement('div');
    button.innerHTML = '<span class="material-icons md-48">download_2</span>';
    button.classList.add('prompt-dl-button');
    button.addEventListener('click', () => {
      this.download(target);
    });
    this.root.classList.add('prompt-dl-parent');
    this.root.append(button);
  }

  private download(target: HTMLAnchorElement): void {
    target.click();
    const filename = target.download.replace(/\.png$/, '.txt');
    const blob = new Blob([this.prompt.textContent || ''], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
