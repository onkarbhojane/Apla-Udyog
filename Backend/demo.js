import axios from 'axios';
import * as cheerio from 'cheerio';
const url = 'http://www.puneapmc.org/history.aspx?id=Rates4380';

async function parseTable() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const result = [];

  $('table tr').each((i, row) => {
    if (i === 0) return; // Skip header

    const cols = $(row).find('td').map((_, cell) => $(cell).text().trim()).get();

    if (cols.length ===6) {
      const name = cols[1];             // मालाचे नाव
      const unit = cols[2];             // वजन दर (एकक)
      const totalImports = cols[3];     // आवक
      const minPrice = cols[4];         // किमान दर
      const maxPrice = cols[5];         // कमाल दर

      result.push({
        name,
        unit,
        totalImports: parseInt(totalImports.replace(/,/g, '') || 0),
        minPrice,
        maxPrice
      });
    }
  });

  console.log(result);
  return result;
}

parseTable();
