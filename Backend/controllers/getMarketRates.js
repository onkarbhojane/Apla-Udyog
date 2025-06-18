import BazarSamiti from "../models/BazarSamiti.models.js";
import axios from "axios";
import * as cheerio from "cheerio";
const getMarketRates = async (req, res) => {
  try {
    const { samiti, date } = req.query;
    if (!samiti || !date) {
      return res.status(400).json({ error: "Samiti & date is required" });
    }
    const bazarSamiti = await BazarSamiti.findOne({
      name: samiti,
      date: new Date(date),
    });
    if (!bazarSamiti) {
        console.log("Fetching new data for samiti:", samiti, "on date:", date);
        const url = `http://www.puneapmc.org/history.aspx?id=Rates4381`;
      const result=await parseTable(url);
        const newSamiti = new BazarSamiti({
            name: samiti,
            date: new Date(date),
            items: result,
        });
        await newSamiti.save();
        return res.status(200).json({ samiti, rates: result });
    }
    const marketRates = [...bazarSamiti.items];
    res.status(200).json({ samiti, rates: marketRates });
  } catch (error) {
    console.error("Error fetching market rates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
async function parseTable(url) {
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
        maxPrice,
        minPrice,
        totalImports: parseInt(totalImports.replace(/,/g, '') || 0),
      });
    }
  });
  return result;
}


export { getMarketRates };
