import { EventData } from "../../types";

export function getEventsData() {
  return JSON.parse(JSON.stringify(this.eventsData));
}

/** Set new events data array */
export function setEventsData(events: EventData[]) {
  this.eventsData = JSON.parse(JSON.stringify(events));
  this.setDate(this.currentDate);
  return this.eventsData.length;
}

/** Add events to existing events data array */
export function addEventsData(newEvents: EventData[] = []) {
  const eventAddedCount = this.eventsData.push(...newEvents);
  this.setDate(this.currentDate);
  return eventAddedCount;
}

export function getDateEvents(date: Date) {
  let filteredEventsThisDate = this.filteredEventsThisMonth.filter(
    (event: EventData) => {
      const start = new Date(event.start).getDate();
      const end = new Date(event.end).getDate();
      const startMonth = new Date(event.start).getMonth();
      const endMonth = new Date(event.end).getMonth();
      const dateMonth = date.getMonth()

      if (startMonth !== endMonth && dateMonth >= startMonth && dateMonth <= endMonth) {
        if (dateMonth !== startMonth && dateMonth !== endMonth) {
          return true
        }

        if (dateMonth === startMonth && date.getDate() >= start) {
          return true
        }

        if (dateMonth === endMonth && date.getDate() <= end) {
          return true
        }

        return false
      }

      if (date.getDate() >= start && date.getDate() <= end) {
        return true;
      } else {
        return false;
      }
    }
  );
  return filteredEventsThisDate;
}

export function getMonthEvents() {
  return this.filteredEventsThisMonth;
}
