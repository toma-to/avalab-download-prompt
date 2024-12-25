import { fileName } from './filename';

export class DownloadButton {
  constructor(
    private readonly root: HTMLElement,
    private readonly prompt: HTMLParagraphElement,
  ) {
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (
          record.target instanceof HTMLDivElement &&
          record.target.classList.contains('image-container')
        ) {
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

  private atattch(target: HTMLDivElement): void {
    const button = document.createElement('div');
    button.innerHTML = '<span class="material-icons md-48">download_2</span>';
    button.classList.add('prompt-dl-button');
    button.addEventListener('click', () => {
      console.log('dl', this);
      this.download(target);
    });
    target.append(button);
  }

  private download(target: HTMLDivElement): void {
    const imgFileName = fileName.getFileName();

    const image = [...target.children]
      .flatMap((val) => [...val.children])
      .find((val) => val instanceof HTMLImageElement && val.classList.contains('image__inner')) as HTMLImageElement;
    console.log(image, target);
    if (!image) {
      return;
    }
    const imgLink = document.createElement('a');
    imgLink.href = image.src;
    imgLink.download = imgFileName;
    imgLink.click();

    const filename = imgFileName.replace(/\.png$/, '.txt');
    const blob = new Blob([this.prompt.textContent || ''], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const prompt = document.createElement('a');
    prompt.href = url;
    prompt.download = filename;
    prompt.click();
  }
}
