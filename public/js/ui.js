class UI {
    constructor() {
        this.urlInput = document.querySelector('#form-control input');
        this.linksContainer = document.getElementById('links-container');
        this.alert = document.querySelector('.alert');
    }

    displayShortUrl(url) {
        let output = '';

        output = `
        <div class="link-content">
        <div>
          <p class="full-url">${url.fullUrl}</p>
        </div>
        <div class="shortened-wrapper">
          <p class="short-url">${url.shortUrl}</p>
          <button type="button" class="btn copy-link">Copy</button>
        </div>
      </div>`;

        this.linksContainer.innerHTML += output;

        this.showClearButton();

        this.urlInput.value = '';
    }

    displayAlert(type, message) {
        this.urlInput.classList.add('border-secondary', 'placeholder-secondary');
        this.alert.classList.remove('hidden');
        this.alert.classList.add(type, 'block');
        this.alert.textContent = message;
    }

    clearAlert(type) {
        this.urlInput.classList.remove('border-secondary', 'placeholder-secondary');
        this.alert.classList.remove(type, 'block');
        this.alert.classList.add('hidden');
    }

    async copyLink(shortUrl, copyButton) {
        // Using the Clipboard API to Copy Text
        try {
            await navigator.clipboard.writeText(shortUrl);
            copyButton.innerHTML = 'Copied';
            copyButton.style.backgroundColor = 'rgb(59, 48, 84)';
        } catch (error) {
            console.error('Error in copying URL', error);
            this.displayAlert('Error in copying URL')
        }
    }

    showClearButton() {
        const links = document.querySelectorAll('.link-content');
        const clearLinksBtn = document.querySelector('#links-container > div:first-of-type');

        if(links.length > 0) {
            clearLinksBtn.classList.remove('hidden')
        } else {
            clearLinksBtn.classList.add('hidden')
        }
    }

    clearLinks() {
        const links = document.querySelectorAll('.link-content');

        links.forEach(item => {
            item.remove()
        })

        this.showClearButton();
    }
}

export const ui = new UI();