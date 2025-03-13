class CookieConsent {
    constructor() {
        this.cookieName = 'cookie_consent';
        this.analyticsCookieName = 'analytics_consent';
        this.cookieDuration = 1; // days
        this.banner = null;
        
        this.init();
        this.showSettingsModal = this.showSettingsModal.bind(this);
    }

    init() {
        if (!this.getCookie(this.cookieName)) {
            this.showBanner();
        } else {
            this.initializeAnalytics();
        }
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <h3><i class="fas fa-cookie-bite"></i> Informativa sui Cookie</h3>
                    <p>Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Alcuni cookie sono necessari per il funzionamento del sito, mentre altri (Google Analytics) ci aiutano a capire come lo utilizzi.</p>
                    <p>Per maggiori informazioni consulta la nostra <a href="privacy.html">Privacy Policy</a> o personalizza le tue preferenze.</p>
                </div>
                <div class="cookie-buttons">
                    <button class="cookie-btn cookie-btn-accept">Accetta tutti</button>
                    <button class="cookie-btn cookie-btn-settings">Personalizza</button>
                    <button class="cookie-btn cookie-btn-decline">Solo necessari</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        this.banner = banner;

        // Add event listeners
        banner.querySelector('.cookie-btn-accept').addEventListener('click', () => this.acceptAll());
        banner.querySelector('.cookie-btn-decline').addEventListener('click', () => this.acceptNecessary());
        banner.querySelector('.cookie-btn-settings').addEventListener('click', () => this.showSettingsModal());

        // Show banner with animation
        setTimeout(() => banner.classList.add('show'), 100);
    }

    showBanner() {
        if (!this.banner) {
            this.createBanner();
        }
    }

    acceptAll() {
        this.setCookie(this.cookieName, 'accepted', this.cookieDuration);
        this.setCookie(this.analyticsCookieName, 'accepted', this.cookieDuration);
        this.hideBanner();
        this.initializeAnalytics();
    }

    acceptNecessary() {
        this.setCookie(this.cookieName, 'necessary', this.cookieDuration);
        this.setCookie(this.analyticsCookieName, 'declined', this.cookieDuration);
        this.hideBanner();
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('show');
            setTimeout(() => {
                this.banner.remove();
                this.banner = null;
            }, 300);
        }
    }

    initializeAnalytics() {
        if (this.getCookie(this.analyticsCookieName) === 'accepted') {
            // Initialize Google Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P5ZNZ6X2WF');
        }
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    showSettings() {
        // Implementa una modale per le impostazioni dettagliate dei cookie
        console.log('Settings modal to be implemented');
    }

    showSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h3><i class="fas fa-cog"></i> Impostazioni Cookie</h3>
                    <button class="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <div class="cookie-setting-item">
                        <div class="cookie-setting-header">
                            <h4>Cookie Necessari</h4>
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p>Essenziali per il funzionamento del sito. Non possono essere disattivati.</p>
                    </div>
                    <div class="cookie-setting-item">
                        <div class="cookie-setting-header">
                            <h4>Cookie Analitici (Google Analytics)</h4>
                            <label class="switch">
                                <input type="checkbox" id="analytics-toggle">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <p>Ci aiutano a capire come utilizzi il sito per migliorare la tua esperienza.</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-save">Salva preferenze</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add event listeners
        const closeBtn = modal.querySelector('.cookie-modal-close');
        const saveBtn = modal.querySelector('.cookie-btn-save');
        const analyticsToggle = modal.querySelector('#analytics-toggle');

        // Set initial state
        analyticsToggle.checked = this.getCookie(this.analyticsCookieName) === 'accepted';

        closeBtn.addEventListener('click', () => modal.remove());
        saveBtn.addEventListener('click', () => {
            this.setCookie(this.cookieName, 'customized', this.cookieDuration);
            this.setCookie(this.analyticsCookieName, analyticsToggle.checked ? 'accepted' : 'declined', this.cookieDuration);
            modal.remove();
            this.hideBanner();
            if (analyticsToggle.checked) {
                this.initializeAnalytics();
            }
        });
    }
}
