import * as d3 from "d3";
import * as Arrow from "apache-arrow";

// Start and end dates
const end = d3.timeDay.offset(d3.timeHour(new Date()), 1);
const start = d3.timeHour(d3.utcDay.offset(end, -7));
const convertDate = d3.timeFormat("%m%d%Y %H:%M:%S");

const usRegions = `&respondent[0]=CENT&respondent[1]=MIDW&respondent[2]=CAL&respondent[3]=FLA&respondent[4]=NW&respondent[5]=SW&respondent[6]=MIDA&respondent[7]=NA&respondent[8]=CAR&respondent[9]=SE&respondent[10]=NE&respondent[11]=NY&respondent[12]=TEN&respondent[13]=TEX`;

function tidySeries(response, id, name) {
  let series = response[0].data;
  let datetimeFormat = d3.utcParse("%m/%d/%Y %H:%M:%S");
  let dateFormat = d3.utcParse("%m/%d/%Y");
  return series.flatMap((s) => {
    return s.VALUES.DATES.map((d, i) => {
      return {
        id: s[id],
        date: datetimeFormat(d) ? datetimeFormat(d) : dateFormat(d),
        value: s.VALUES.DATA[i],
      };
    });
  });
}

const regionalDemandUrl = `https://www.eia.gov/electricity/930-api/region_data/series_data?type[0]=D&start=${convertDate(
  start
)}&end=${convertDate(
  end
)}&frequency=hourly&timezone=Eastern&limit=10000${usRegions}`;

const demand = await d3.json(regionalDemandUrl).then((response) => {
  // return response
  return tidySeries(response, "RESPONDENT_ID", "RESPONDENT_NAME");
});

const table = Arrow.tableFromArrays({
  id: demand.map((d) => d.id),
  date: demand.map((d) => d.date),
  value: demand.map((d) => d.value),
});

process.stdout.write(Arrow.tableToIPC(table));
