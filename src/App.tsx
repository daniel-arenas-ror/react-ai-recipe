import { Routes, Route, Link } from "react-router-dom"
import RecipesSearcher from "./pages/RecipesSearcher"
import Profile from "./pages/Profile"
import Recipe from "./pages/Recipe"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Recetas</Link>
            <Link to="/recipe/salsa">Salsa</Link>
            <Link to="/profile">Perfil</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<RecipesSearcher />}></Route>
        <Route path="/recipe/:slug" element={<Recipe   />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
