# Apla-Udyog 🚀

Apla-Udyog is a full-stack mobile and backend platform aimed at empowering small businesses and agricultural markets by providing real-time market rate information, news, and user profiles through a clean and responsive UI.

## 🗂️ Project Structure

```
Apla-Udyog/
├── Backend/           # Node.js/Express backend API
├── mobile/            # React Native (Expo) mobile app
```

## 📱 Mobile App

**Tech Stack**:
- React Native (Expo)
- TypeScript
- Tailwind CSS (via NativeWind)
- Reusable components: Home, MarketRates, LatestNews, Profile

### Features:
- Clean and intuitive mobile UI
- Latest agriculture/market news section
- Real-time market rates via API
- Profile screen for user interaction

## 🛠 Backend

**Tech Stack**:
- Node.js
- Express
- MongoDB (Mongoose)
- RESTful APIs

### Endpoints:
- `GET /market-rates` — Fetch market rate data
- MongoDB models for bazaar/samiti rate info
- Controllers & Routes organized cleanly

## 📦 Installation

### Backend:
```bash
cd Backend
npm install
node app.js
```

### Mobile:
```bash
cd mobile
npm install
npx expo start
```

## 🚀 Usage

1. **Start the Backend Server**:
   - Navigate to the Backend directory
   - Run `npm install` to install dependencies
   - Start the server with `node app.js`
   - Backend will be running on default port (usually 3000 or 8000)

2. **Launch the Mobile App**:
   - Navigate to the mobile directory
   - Run `npm install` to install dependencies
   - Start the Expo development server with `npx expo start`
   - Scan the QR code with Expo Go app or run on simulator

## 📸 Screenshots

*Add screenshots of the mobile UI and backend responses here*

## 🌟 Features

- **Market Rates**: Real-time agricultural market rates
- **Latest News**: Stay updated with agriculture and market news
- **User Profiles**: Personalized user experience
- **Responsive Design**: Clean and intuitive mobile interface
- **RESTful API**: Well-structured backend architecture

## 📚 Future Improvements

- [ ] Admin dashboard to manage market rates
- [ ] Firebase authentication for secure login
- [ ] Offline caching for mobile data
- [ ] Push notifications for new updates
- [ ] Multi-language support (Hindi, Marathi)
- [ ] Advanced filtering and search functionality

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Onkar Bhojane**  
📧 onkar.bhojane22@vit.edu  
🔗 [GitHub](https://github.com/onkarbhojane) | [LinkedIn](https://linkedin.com/in/onkar-bhojane)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by the need to digitize agricultural markets
- Built with ❤️ for farmers and small businesses

---

*Ready to empower agricultural markets with technology! 🌾*
