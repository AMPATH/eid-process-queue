export class SyncSettings {
  name = "";
  intervalInMs = 30000;
  offPeakIntervals = 30000;
  peakIntervals = 30000;
  constructor(name, offPeakIntervals, peakIntervals) {
    this.name = name;
    this.offPeakIntervals = offPeakIntervals;
    this.peakIntervals = peakIntervals;
  }
  getHourType = (timeInHrs) => {
    if (timeInHrs >= 4 && timeInHrs <= 19) {
      return "normalHrs";
    } else if (timeInHrs >= 20 && timeInHrs <= 24) {
      return "offPeakHours";
    } else if (timeInHrs >= 0 && timeInHrs <= 3) {
      return "offPeakHours";
    } else {
      return "normalHrs";
    }
  };
  getSyncIntervals = (timeInHrs) => {
    const hrType = this.getHourType(timeInHrs);
    let syncInterval = 30000;
    switch (hrType) {
      case "normalHrs":
        syncInterval = this.peakIntervals;
        break;
      case "offPeakHours":
        syncInterval = this.offPeakIntervals;
        break;
      default:
        syncInterval = this.onPeakIntervals;
    }
    return syncInterval;
  };
}
