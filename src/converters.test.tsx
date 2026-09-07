import { describe, expect, it } from "vitest";
import { convertLandArea, convertTreeComposition, convertDeforestation, clampYear } from "./converters";

const mockData = {
  '2015': {
    '0037': {
      stateForest:   { managedForestArea: 5000, data: [1500, 1200, 800, 400, 300, 250, 200, 150, 200] },
      privateForest: { managedForestArea: 3000, data: [900, 600, 500, 300, 200, 150, 100, 100, 150] },
      totalForest:   { managedForestArea: 8000, data: [2400, 1800, 1300, 700, 500, 400, 300, 250, 350] },
    }
  },
  '2016': {
    '0037': {
      stateForest:   { managedForestArea: 5200, data: [1600, 1250, 820, 380, 310, 260, 210, 160, 210] },
      privateForest: { managedForestArea: 3400, data: [1000, 700, 550, 320, 220, 170, 120, 110, 210] },
      totalForest:   { managedForestArea: 8600, data: [2600, 1950, 1370, 700, 530, 430, 330, 270, 420] },
    },
    '0000': {
      stateForest:   { managedForestArea: 6000, data: [1800, 1400, 1000, 500, 400, 300, 250, 150, 200] },
      privateForest: { managedForestArea: 10000, data: [3000, 2200, 1600, 900, 700, 500, 400, 350, 350] },
      totalForest:   { managedForestArea: 16000, data: [4800, 3600, 2600, 1400, 1100, 800, 650, 500, 550] },
    }
  },
  '2017': {
    '0037': {
      stateForest:   { managedForestArea: 4800, data: [1400, 1100, 850, 420, 280, 240, 190, 140, 180] },
      privateForest: { managedForestArea: 3600, data: [1100, 750, 580, 340, 240, 180, 130, 120, 160] },
      totalForest:   { managedForestArea: 8400, data: [2500, 1850, 1430, 760, 520, 420, 320, 260, 340] },
    },
    '0000': {
      stateForest:   { managedForestArea: 6200, data: [1900, 1450, 1050, 480, 420, 310, 240, 160, 190] },
      privateForest: { managedForestArea: 10500, data: [3200, 2400, 1700, 850, 680, 520, 410, 370, 370] },
      totalForest:   { managedForestArea: 16700, data: [5100, 3850, 2750, 1330, 1100, 830, 650, 530, 560] },
    }
  },
  '2018': {
    '0000': {
      stateForest:   { managedForestArea: 6400, data: [2000, 1500, 1080, 460, 440, 320, 230, 170, 200] },
      privateForest: { managedForestArea: 10800, data: [3300, 2500, 1750, 820, 700, 540, 420, 380, 390] },
      totalForest:   { managedForestArea: 17200, data: [5300, 4000, 2830, 1280, 1140, 860, 650, 550, 590] },
    }
  }
}
const mockDeforestData = {
  '2015': {
    '0000': {
      deforestation: { totalForest: 98500.0, stateForest: 52000.0, privateForest: 34000.0, otherForest: 12500.0 },
      reforestation: { totalForest: 8200.0 }
    },
    '0037': {
      deforestation: { totalForest: 7200.0, stateForest: 3100.0, privateForest: 3400.0, otherForest: 700.0 },
      reforestation: { totalForest: 620.0 }
    }
  },
  '2016': {
    '0000': {
      deforestation: { totalForest: 105300.0, stateForest: 55800.0, privateForest: 36200.0, otherForest: 13300.0 },
      reforestation: { totalForest: 9100.0 }
    },
    '0037': {
      deforestation: { totalForest: 8400.0, stateForest: 3600.0, privateForest: 4000.0, otherForest: 800.0 },
      reforestation: { totalForest: 710.0 }
    }
  },
  '2017': {
    '0000': {
      deforestation: { totalForest: 112800.0, stateForest: 58400.0, privateForest: 40100.0, otherForest: 14300.0 },
      reforestation: { totalForest: 10400.0 }
    },
    '0037': {
      deforestation: { totalForest: 9100.0, stateForest: 3900.0, privateForest: 4300.0, otherForest: 900.0 },
      reforestation: { totalForest: 830.0 }
    }
  },
  '2018': {
    '0000': {
      deforestation: { totalForest: 108600.0, stateForest: 56200.0, privateForest: 38800.0, otherForest: 13600.0 },
      reforestation: { totalForest: 9800.0 }
    },
    '0037': {
      deforestation: { totalForest: 8800.0, stateForest: 3700.0, privateForest: 4200.0, otherForest: 900.0 },
      reforestation: { totalForest: 760.0 }
    }
  }
}

describe(convertLandArea, () => {
    it("Converts managedForestArea from ForestData properly", () => {
        const result0037_2015 = convertLandArea(mockData, 2015, '0037');

        expect(result0037_2015[0].stateForest).toBe(5);
        expect(result0037_2015[0].privateForest).toBe(3);
        expect(result0037_2015[0].totalForest).toBe(8);

        const result0000_2015 = convertLandArea(mockData, 2015, '0000');

        expect(result0000_2015[0].stateForest).toBe(0);
        expect(result0000_2015[0].privateForest).toBe(0);
        expect(result0000_2015[0].totalForest).toBe(0);

        const result0000_2017 = convertLandArea(mockData, 2017, '0000');

        expect(result0000_2017[2].stateForest).toBe(6.2);
        expect(result0000_2017[2].privateForest).toBe(10.5);
        expect(result0000_2017[2].totalForest).toBe(16.7);
    });

    it("Aggregates data in a yearly manner around the passed year parameter", () => {
        const result    = convertLandArea(mockData, 2017, '0037');
        const years     = result.map(r => r.year);

        expect(years).toStrictEqual([2015, 2016, 2017, 2018]);
    });

    it("Does not fail when data is discountinous over a range", () => {
        const result = convertLandArea(mockData, 2017, '0000');

        expect(result[0].stateForest).toBe(0);
        expect(result[1].stateForest).toBe(6);
        expect(result[2].totalForest).toBe(16.7);
        expect(result[3].privateForest).toBe(10.8);
    });
});

describe(convertTreeComposition, () => {
    it("Provides proper array labels based on SPECIES_ORDER constant array", () => {
        const result = convertTreeComposition(mockData, 2015, '0037');
        const species = result.map(r => r.species);

        expect(species).toEqual(['pine', 'spruce', 'birch', 'blk_alder', 'aspen', 'gry_alder', 'ash', 'oak', 'others']);
    });

    it("Provides proper data scoped to passed county and year parameter", () => {
        const result = convertTreeComposition(mockData, 2015, '0037');

        expect(result[0]).toEqual({species : 'pine', stateForest : 18.75, privateForest : 11.25})
        expect(result[3]).toEqual({species : 'blk_alder', stateForest : 5, privateForest : 3.75})
        expect(result[4]).toEqual({species : 'aspen', stateForest : 3.75, privateForest : 2.5})
        expect(result[7]).toEqual({species : 'oak', stateForest : 1.88, privateForest : 1.25})
    });
});

describe(convertDeforestation, () => {
    it("Converts data properly based on passed county and year", () => {
        const result = convertDeforestation(mockDeforestData, 2017, '0037');

        expect(result[0].deforestation).toEqual(7.2);
        expect(result[0].reforestation).toEqual(0.62);
        expect(result[1].deforestation).toEqual(8.4);
        expect(result[1].reforestation).toEqual(0.71);
        expect(result[2].deforestation).toEqual(9.1);
        expect(result[2].reforestation).toEqual(0.83);
        expect(result[3].deforestation).toEqual(8.8);
        expect(result[3].reforestation).toEqual(0.76);
    });
});

describe(clampYear, () => {
    it("Properly clamps year that is less than min of year range", () => {
        expect(clampYear(2015, {min : 2016, max : 2020})).toStrictEqual(2016);
    });
    
    it("Properly clamps year that is more than max of year range", () => {
        expect(clampYear(2026, {min : 2016, max : 2020})).toStrictEqual(2020);
    });

    it("Properly clamps year that is equal to min/max of year range", () => {
        expect(clampYear(2016, {min : 2016, max : 2020})).toStrictEqual(2016);
        expect(clampYear(2020, {min : 2016, max : 2020})).toStrictEqual(2020);
    });

    it("Does not clamp year that falls in min/max year range", () => {
        expect(clampYear(2018, {min : 2016, max : 2020})).toStrictEqual(2018);
    });
});