import isClient from './isClient';

// TODO ~~~~
let perfumeLib: {
  initPerfume(arg0: { analyticsTracker: ({ metricName, data }: { metricName: any; data: any; }) => void; }): unknown;
  end: (stepName: string) => unknown;
  start: (stepName: string) => unknown;
  markStep: boolean | { initPerfume: () => void; '': unknown };
  '': unknown;
};

function initWebVitals() {
  perfumeLib = require('perfume.js');
  perfumeLib.initPerfume({
    analyticsTracker: ({ metricName, data }) => {
      // TODO ~~~~
      console.log(metricName, data);
    }
  });
}

export const markStep = function (stepName: string) {
  if (isClient() && perfumeLib && perfumeLib.markStep) {
    perfumeLib.end(stepName);
    perfumeLib.start(stepName);
  }
};

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
