import TimeHelper from '../helpers/TimeHelper';

export const populationMarks = [
    {value: 0, scaledValue: 100, label: "100"},
    {value: 25, scaledValue: 1000, label: "1k"},
    {value: 50, scaledValue: 5000, label: "5k"},
    {value: 75, scaledValue: 10000, label: "10k"},
    {value: 100, scaledValue: 25000, label: "25k"},
    {value: 125, scaledValue: 50000, label: "50k"},
    {value: 150, scaledValue: 100000, label: "100k"},
    {value: 175, scaledValue: 200000, label: "200k"},
    {value: 200, scaledValue: 3000000, label: "3M"}
];

export const travelTimeMarks = [
    {value: 0, scaledValue: 0.5, label: TimeHelper.hoursToTimeString(0.5, false)},
    {value: 2, scaledValue: 1, label: TimeHelper.hoursToTimeString(1, false)},
    {value: 4, scaledValue: 2, label: TimeHelper.hoursToTimeString(2, false)},
    {value: 6, scaledValue: 3, label: TimeHelper.hoursToTimeString(3, false)},
    {value: 8, scaledValue: 4, label: TimeHelper.hoursToTimeString(4, false)},
    {value: 10, scaledValue: 5, label: TimeHelper.hoursToTimeString(5, false)},
    {value: 12, scaledValue: 8, label: TimeHelper.hoursToTimeString(8, false)},
    {value: 14, scaledValue: 10, label: TimeHelper.hoursToTimeString(10, false)},
    {value: 16, scaledValue: 12, label: TimeHelper.hoursToTimeString(12, false)},
    {value: 18, scaledValue: 16, label: TimeHelper.hoursToTimeString(16, false)},
    {value: 20, scaledValue: 20, label: TimeHelper.hoursToTimeString(20, false)},
];

export function populationSliderScale(value) {
    return sliderScale(populationMarks, value, 25);
}

export function travelTimeSliderScale(value) {
    return sliderScale(travelTimeMarks, value, 2);
}

function sliderScale(marks, value, step) {
    const previousMarkIndex = Math.floor(value / step);
    const previousMark = marks[previousMarkIndex];
    const remainder = value % step;
    if (remainder === 0) {
        return previousMark.scaledValue;
    }
    const nextMark = marks[previousMarkIndex + 1];
    const increment = (nextMark.scaledValue - previousMark.scaledValue) / step;
    return remainder * increment + previousMark.scaledValue;
}

export function populationSliderValue(scaledValue) {
  return sliderValue(populationMarks, scaledValue);
}

export function travelTimeSliderValue(scaledValue) {
  return sliderValue(travelTimeMarks, scaledValue);
}

function sliderValue(marks, scaledValue) {
  let value = marks[0].value;
  marks.forEach(mark => {
    if (mark.scaledValue <= scaledValue) {
      value = mark.value;
    }
  });
  return value;
}

export function populationSliderText(value) {
    if (value >= 1000000) {
        return `${Math.trunc(value/1000000)}M`;
    } else if (value > 1000) {
        return `${Math.trunc(value/1000)}K`;
    }
    return value;
}

export function travelTimeSliderText(value) {
    return `${TimeHelper.hoursToTimeString(value, value < 5)}`;
}
