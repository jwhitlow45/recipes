import { useContext, useEffect, useState } from 'react';
import './App.css'

import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import Header from './components/Header';
import { PathContext } from './context/contexts';

import HeaderImage from './assets/gerbil-porgy.png';


const headerStyle: React.CSSProperties = {
  display: 'flex',

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  width: 'min(fit-content, 100vw)',

  margin: '2em auto 0 auto',

  color: '#8866B6',
  cursor: 'pointer',
}

const bodyStyle: React.CSSProperties = {
  // note: width is defined in App.tsx using media queries
  display: 'flex',

  flexDirection: 'column',

  margin: '0 auto auto auto',

  textAlign: 'left',
}

function App() {

  const { path } = useContext(PathContext);
  const [showHomePage, setShowHomePage] = useState(path === '/');

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    loadImage(HeaderImage)
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load image', err);
      });
  }, []);

  useEffect(() => {
    setShowHomePage(path === '/');
  }, [path]);

  return (
    <div id="app" style={{ paddingBottom: '6em' }}>
      {loaded && <>
        <Header style={headerStyle} />
        <div id="body" style={bodyStyle}>
          {showHomePage && <RecipeList />}
          {!showHomePage && <Recipe markdown_file_path={"recipes/" + path} />}
        </div>
      </>}
    </div>
  );
}

export default App
