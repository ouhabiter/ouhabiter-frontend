import TimeHelper from './TimeHelper';

it('converts 1 hour to "1h00"', () => {
    expect(TimeHelper.hoursToTimeString(1)).toEqual('1h00');
});

it('converts 0.5 hours to "30min"', () => {
    expect(TimeHelper.hoursToTimeString(0.5)).toEqual('30min');
});

it('converts 0.01 hours to "1min"', () => {
    expect(TimeHelper.hoursToTimeString(0.01)).toEqual('1min');
});

it('converts 1.5 hours to "1h30"', () => {
    expect(TimeHelper.hoursToTimeString(1.5)).toEqual('1h30');
});

it('converts 1.01 hours to "1h01"', () => {
    expect(TimeHelper.hoursToTimeString(1.01)).toEqual('1h01');
});