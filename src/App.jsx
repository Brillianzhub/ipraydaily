import About from '../src/components/About';
import Prayers from '../src/components/Prayers';
import './App.css'

const App = () => {
  const categories = ['Salvation', 'Courage', 'Deliverance', 'Blessing', 'Advancement', 'Dominion'];

  return (
    <>
      <Prayers prayerCategories={categories} />
    </>
  )

}

export default App;