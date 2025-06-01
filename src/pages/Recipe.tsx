import { useParams } from "react-router-dom";

const Recipe: React.FC = () => {
  const { slug } = useParams<{slug: string}>();

  return (
    <h1>Recipe id: {slug}</h1>
  )
}

export default Recipe;
