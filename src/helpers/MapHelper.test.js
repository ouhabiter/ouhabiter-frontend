import MapHelper from './MapHelper';

it('builds a color scale with a min', () => {
    let min = 1;
    let colorScale = MapHelper.buildColorScale(min);
    expect(colorScale[1]).toBeGreaterThan(min);
    expect(colorScale[colorScale.length - 2]).toBeGreaterThan(min);
});

it('builds a color scale with a max', () => {
    let max = 1;
    let colorScale = MapHelper.buildColorScale(null, max);
    expect(colorScale[1]).toBeLessThan(max);
    expect(colorScale[colorScale.length - 2]).toBeLessThan(max);
});

it('builds a color scale with a min and a max', () => {
    let min = 1;
    let max = 2;
    let colorScale = MapHelper.buildColorScale(min, max);
    expect(colorScale[1]).toBeGreaterThan(min);
    expect(colorScale[colorScale.length - 2]).toBeLessThan(max);
});