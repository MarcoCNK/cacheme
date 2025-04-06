import { Route, Routes } from "react-router-dom"
import DefaultScreen from "./pages/DefaultScreen"
import { LoginPage, ProfilePage } from "./pages"

export default function App() {

  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<DefaultScreen />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
)
}


