export interface TrendData {
  code: string;
  name_fr: string;
  name_wol: string;
  unit: string;
  source: string;
  data: { year: number; value: number }[];
}

export const NATIONAL_TRENDS: TrendData[] = [
  {
    code: "POP",
    name_fr: "Population",
    name_wol: "Waay-dekk",
    unit: "millions",
    source: "ANSD/RGPH 2023 + projections",
    data: [
      { year: 2000, value: 9.9 }, { year: 2002, value: 10.4 },
      { year: 2004, value: 11.0 }, { year: 2006, value: 11.6 },
      { year: 2008, value: 12.2 }, { year: 2010, value: 12.9 },
      { year: 2012, value: 13.7 }, { year: 2014, value: 14.5 },
      { year: 2016, value: 15.4 }, { year: 2018, value: 16.3 },
      { year: 2020, value: 17.2 }, { year: 2022, value: 18.0 },
      { year: 2023, value: 18.3 }, { year: 2024, value: 18.7 },
      { year: 2025, value: 19.0 }, { year: 2026, value: 19.2 },
    ],
  },
  {
    code: "GDP_GROWTH",
    name_fr: "Croissance PIB",
    name_wol: "Yokk alal",
    unit: "%",
    source: "FMI/Banque Mondiale",
    data: [
      { year: 2010, value: 4.2 }, { year: 2011, value: 1.8 },
      { year: 2012, value: 4.4 }, { year: 2013, value: 3.5 },
      { year: 2014, value: 6.2 }, { year: 2015, value: 6.4 },
      { year: 2016, value: 6.2 }, { year: 2017, value: 7.4 },
      { year: 2018, value: 6.2 }, { year: 2019, value: 4.6 },
      { year: 2020, value: 1.3 }, { year: 2021, value: 6.5 },
      { year: 2022, value: 4.0 }, { year: 2023, value: 4.3 },
      { year: 2024, value: 6.46 }, { year: 2025, value: 6.68 },
    ],
  },
  {
    code: "INFLATION",
    name_fr: "Inflation",
    name_wol: "Yokku njeg",
    unit: "%",
    source: "ANSD/IPC",
    data: [
      { year: 2015, value: 0.1 }, { year: 2016, value: 0.8 },
      { year: 2017, value: 1.3 }, { year: 2018, value: 0.5 },
      { year: 2019, value: 1.0 }, { year: 2020, value: 2.5 },
      { year: 2021, value: 2.2 }, { year: 2022, value: 9.7 },
      { year: 2023, value: 5.94 }, { year: 2024, value: 0.8 },
      { year: 2025, value: 1.46 },
    ],
  },
  {
    code: "LIFE_EXP",
    name_fr: "Esperance de vie",
    name_wol: "Lu nit miin a dund",
    unit: "ans",
    source: "Banque Mondiale",
    data: [
      { year: 2000, value: 55.2 }, { year: 2003, value: 57.1 },
      { year: 2006, value: 59.8 }, { year: 2009, value: 62.0 },
      { year: 2012, value: 64.2 }, { year: 2015, value: 65.8 },
      { year: 2018, value: 67.1 }, { year: 2020, value: 67.5 },
      { year: 2022, value: 68.2 }, { year: 2023, value: 68.5 },
    ],
  },
  {
    code: "URBAN",
    name_fr: "Urbanisation",
    name_wol: "Dund-dekk",
    unit: "%",
    source: "ANSD",
    data: [
      { year: 2000, value: 40.3 }, { year: 2005, value: 42.1 },
      { year: 2010, value: 43.7 }, { year: 2015, value: 45.9 },
      { year: 2018, value: 47.2 }, { year: 2020, value: 47.9 },
      { year: 2022, value: 48.3 }, { year: 2023, value: 48.5 },
    ],
  },
  {
    code: "INFANT_MORT",
    name_fr: "Mortalite infantile",
    name_wol: "Dee gu ndaw yi",
    unit: "pour 1000",
    source: "EDS",
    data: [
      { year: 2000, value: 77 }, { year: 2005, value: 61 },
      { year: 2008, value: 54 }, { year: 2010, value: 47 },
      { year: 2012, value: 43 }, { year: 2015, value: 39 },
      { year: 2018, value: 36 }, { year: 2020, value: 34 },
      { year: 2022, value: 33 }, { year: 2023, value: 32 },
    ],
  },
];
