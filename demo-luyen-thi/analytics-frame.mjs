(() => {
  const origin = 'https://exam.wewin.edu.vn';
  if (window.parent === window || window.origin !== 'null' || location.origin !== origin) return;
  const events = new Set(['page_view', 'exam_started', 'exam_completed', 'main_site_click']);
  let config, send;

  window.addEventListener('message', ({origin: sender, source, data}) => {
    if (sender !== origin || source !== window.parent || !data) return;
    if (data.type === 'exam-analytics-config' && !config && /^G-[A-Z0-9]+$/.test(data.measurementId)) {
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
        client_id: config.clientId,
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
