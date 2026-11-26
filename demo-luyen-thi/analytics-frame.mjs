(() => {
  const origin = 'https://exam.wewin.edu.vn';
  if (window.parent === window || window.origin !== 'null' || location.origin !== origin) return;
  const events = new Set(['page_view', 'exam_started', 'exam_completed', 'main_site_click']);
  let config, send;

  function useAnalyticsCookies(entries) {
    // The real cookie API throws in an opaque iframe. Mirror only this tag's
    // cookie prefix so it can retain sessions without access to app cookies.
    const cookies = new Map(entries);
    Object.defineProperty(document, 'cookie', {
      get: () => [...cookies].map(([name, value]) => name + '=' + value).join('; '),
      set(cookie) {
        const [pair, ...attributes] = cookie.split(';');
        const split = pair.indexOf('=');
        const name = pair.slice(0, split).trim(), value = pair.slice(split + 1).trim();
        if (split < 1 || !/^wewin_exam_ga(?:_[A-Z0-9]+)?$/.test(name)) return;
        const expiry = attributes.find(attr => /^\s*expires=/i.test(attr));
        const maxAgeAttribute = attributes.find(attr => /^\s*max-age=/i.test(attr));
        const maxAge = maxAgeAttribute ? Number(maxAgeAttribute.split('=')[1]) :
          expiry ? Math.floor((Date.parse(expiry.slice(expiry.indexOf('=') + 1)) - Date.now()) / 1000) : 0;
        if (!Number.isInteger(maxAge)) return;
        if (maxAge <= 0) cookies.delete(name);
        else cookies.set(name, value);
        window.parent.postMessage({type: 'exam-analytics-cookie', name, value, maxAge}, origin);
      },
    });
  }

  window.addEventListener('message', ({origin: sender, source, data}) => {
    if (sender !== origin || source !== window.parent || !data) return;
    if (data.type === 'exam-analytics-config' && !config && /^G-[A-Z0-9]+$/.test(data.measurementId)) {
      useAnalyticsCookies(data.cookies);
      config = data;
      return;
    }
    if (!config || data.type !== 'exam-analytics-event' || !events.has(data.event)) return;

    const {page_location, page_title, page_referrer} = data.params;
    if (!send) {
      window.dataLayer = [];
      send = function () { window.dataLayer.push(arguments); };
      window.gtag = send;
      send('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
      send('js', new Date());
      send('config', config.measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_prefix: 'wewin_exam',
        cookie_domain: 'none',
        page_location, page_title, page_referrer,
      });
      const script = document.createElement('script');
      script.async = true;
      script.referrerPolicy = 'no-referrer';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.measurementId;
      document.head.append(script);
    }

    // Keep the tag's defaults clean for its own lifecycle events too.
    send('set', {page_location, page_title, page_referrer});
    send('event', data.event, {...data.params, send_to: config.measurementId});
  });
  window.parent.postMessage({type: 'exam-analytics-ready'}, origin);
})();
