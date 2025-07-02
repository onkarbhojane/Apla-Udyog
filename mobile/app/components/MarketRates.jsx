import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import searchIcon from "../../assets/images/search.png";
import { Ionicons } from "@expo/vector-icons";
import { format, addDays, subDays, isToday } from "date-fns";
import { mr } from "date-fns/locale"; // Marathi locale

const bazarSamitis = [
  {
    value: "कृषि उत्पन्न बाजार समिती, पुणे",
    label: " कृषि उत्पन्न बाजार समिती, पुणे",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, नागपुर",
    label: " कृषि उत्पन्न बाजार समिती, नागपुर",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, नाशिक",
    label: " कृषि उत्पन्न बाजार समिती, नाशिक",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, औरंगाबाद",
    label: " कृषि उत्पन्न बाजार समिती, औरंगाबाद",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, कोल्हापूर",
    label: " कृषि उत्पन्न बाजार समिती, कोल्हापूर",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, सोलापूर",
    label: " कृषि उत्पन्न बाजार समिती, सोलापूर",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, अमरावती",
    label: " कृषि उत्पन्न बाजार समिती, अमरावती",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, ठाणे",
    label: " कृषि उत्पन्न बाजार समिती, ठाणे",
  },
  {
    value: "कृषि उत्पन्न बाजार समिती, रायगड",
    label: " कृषि उत्पन्न बाजार समिती, रायगड",
  },
];

export default function MarketRates() {
  const [selectedSamiti, setSelectedSamiti] = useState(bazarSamitis[0].value);
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const fetchMarketData = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        "http://192.168.155.74:5000/MarketRates",
        {
          params: {
            samiti: selectedSamiti,
            date: date.toISOString().split("T")[0],
          },
        }
      );

      const rawData = response.data?.rates || [];
      const formattedData = rawData
        .map((item, index) => {
          const min = item.minPrice?.trim();
          const max = item.maxPrice?.trim();
          if (!min || !max) return null;
          return { ...item, key: index.toString() };
        })
        .filter(Boolean);

      setMarketData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, [selectedSamiti, date]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = marketData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(marketData);
    }
  }, [searchTerm, marketData]);

  const handleDateChange = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const formatDate = (date) => {
    return format(date, "d MMMM yyyy", { locale: mr });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>कृषी बाजार भाव</Text>
      </View>

      {/* Date Selector */}
      <View style={styles.dateContainer}>
        <TouchableOpacity
          onPress={() => handleDateChange(-1)}
          style={styles.dateButton}
        >
          <Ionicons name="chevron-back" size={24} color="#2F80ED" />
        </TouchableOpacity>

        <View style={styles.dateDisplay}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
          {isToday(date) && <Text style={styles.todayBadge}>आजचा</Text>}
        </View>

        <TouchableOpacity
          onPress={() => handleDateChange(1)}
          style={styles.dateButton}
          disabled={date >= new Date()}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={date >= new Date() ? "#BDBDBD" : "#2F80ED"}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="उत्पादन शोधा..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm ? (
          <TouchableOpacity onPress={() => setSearchTerm("")}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Samiti Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSamiti}
          onValueChange={setSelectedSamiti}
          style={styles.picker}
          dropdownIconColor="#555"
        >
          {bazarSamitis.map((s) => (
            <Picker.Item key={s.value} label={s.label} value={s.value} />
          ))}
        </Picker>
      </View>

      {/* Title */}
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedSamiti.split(",")[0]} चे भाव</Text>
      </View> */}

      {/* Market Data */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemImageContainer}>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/51DJ-9xkuQL._UF1000,1000_QL80_.jpg",
                }}
                style={styles.itemImage}
              />
            </View>

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>

              <View style={styles.priceContainer}>
                <View style={[styles.priceBadge, { marginRight: 8 }]}>
                  <Text style={styles.priceLabel}>किमान:</Text>
                  <Text style={styles.minPrice}>{item.minPrice}</Text>
                </View>

                <View style={styles.priceBadge}>
                  <Text style={styles.priceLabel}>कमाल:</Text>
                  <Text style={styles.maxPrice}>{item.maxPrice}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>युनिट: {item.unit}</Text>
                <Text style={styles.infoText}>आवक: {item.totalImports}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#E0E0E0" />
            <Text style={styles.emptyText}>डेटा उपलब्ध नाही</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={fetchMarketData}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#27ae60",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  dateButton: {
    padding: 8,
  },
  dateDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  todayBadge: {
    backgroundColor: "#d9f5dc",
    color: "#27ae60",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#888",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  picker: {
    height: 50,
    color: "#333",
  },
  titleContainer: {
    backgroundColor: "#d9f5dc",
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  itemImageContainer: {
    backgroundColor: "#f1f8e9",
    borderRadius: 12,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "col",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    
  },

  priceBadge: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },

  priceLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 6,
  },
  minPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e74c3c",
  },
  maxPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#27ae60",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#bdc3c7",
    marginTop: 16,
    textAlign: "center",
  },
});
