import isClient from './isClient';

// TODO ~~~~
let perfumeLib: {
  initPerfume: (arg0: {
    analyticsTracker: ({ metricName, data }: { metricName: unknown; data: unknown }) => void;
  }) => unknown;
  end: (stepName: string) => unknown;
  start: (stepName: string) => unknown;
  markStep: boolean | { initPerfume: () => void; '': unknown };
} = {
  initPerfume: () => {},
  end: () => {},
  start: () => {},
  markStep: false,
};

function initWebVitals() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  perfumeLib = require('perfume.js');
  perfumeLib.initPerfume({
    analyticsTracker: ({ metricName, data }) => {
      console.log(`%c⚡️ ${metricName} `, 'color:#ff6d00;font-size:11px;', data);
    },
  });
}

export const initAnalytics = function () {
  if (isClient()) {
    try {
      initWebVitals();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      }
    }
  }
};

export const markStep = function (stepName: string) {
  if (isClient() && perfumeLib && perfumeLib.markStep) {
    perfumeLib.end('perf.' + stepName);
    perfumeLib.start('perf.' + stepName);
  }
};
