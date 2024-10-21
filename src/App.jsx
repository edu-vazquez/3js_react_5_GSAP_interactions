import './App.css'
import Scene from './components/Scene/Scene'
import { moveTo } from './components/Scene/Script'

function App() {

  return (
    <>
      <Scene />
      <div style={{ width: '100%'}}>
        <button 
          onClick={() => {moveTo('cube')}}
          style={{ padding: '1rem'}}
        >
          cube 1
        </button>
        <button 
          onClick={() => {moveTo('cube2')}}
          style={{ padding: '1rem'}}
        >
          cube 2
        </button>
        <button 
          onClick={() => {moveTo('cube3')}}
          style={{ padding: '1rem'}}
        >
          cube 3
        </button>
        <button 
          onClick={() => {moveTo('cube4')}}
          style={{ padding: '1rem'}}
        >
          cube 4
        </button>
      </div>
    </>
  )
}

export default App
