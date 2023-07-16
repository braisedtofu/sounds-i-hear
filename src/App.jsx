import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from 'react';
import { useRef } from 'react';


const textContent = [
  'between the gaps, i was swimming laps\ngot close to some epiphany\ni\'ll convince a friend to join deep ends\nhave your toes touch the lack of cement',
  'i used to float, now i just fall down\ni used to know, but i\'m not sure now\nwhat I was made for\nwhat was I made for?',
  'and two pats on the back, "it just takes time"',
  'i can hope tonight goes differently, but i show up to the party just to leave',
  'i see the fog as a clean slate\nthere\'s room for us',
  'i cut all the bruises off the peach\nnot as beautiful, but still as sweet',
  'driving up the 2 for better views and coastal weather\nand I looked up at you, saw the flowers, I remember',
  'maybe i\'m just stoned at the nail salon',
  'broadcast the boom, boom, boom, boom\nand make \'em all dance to it',
  'l-o-v-e-l-e-s-s generation\nall fuckin\' with our lover\'s heads generation',
  'acid green, aquamarine\nthe girls are dancing in the sand',
  'if the sky is pink and white\nif the ground is black and yellow\nit\'s the same way you showed me',
  'good day in my mind, safe to take a step out',
  'keep a gold chain on my neck\nfly as a jet boy better treat me with respect',
  'seems like street lights, glowing, happen to be\njust like moments passing in front of me\nso i hopped in the cab and i paid my fare\nsee i know my destination, i\'m just not there',
  'in southern california, much like arizona\nmy eyes don\'t shed tears, but boy they pour when...',
  'too many days in a daze, better wake up\ni put your face in a place where the space was',
  'you walked all this way to show me signs\nit was a hawkshaw song stuck in my mind',
  'i\'d lick the grief right off your lips\nyou do your eyes like robert smith',
  'collapsed in sunbeams, stretched out open to beauty however brief or violent\ni see myself ablaze with joy, sleepy eyed, feeding your cat or slicing artichoke hearts',
];

function App() {
  const floatTextRefs = useRef([]);
  const [hoveredText, setHoveredText] = useState(null);

  useEffect(() => {
    const getRandomY = () => {
      const viewportHeight = window.innerHeight;
      const elementHeight = floatTextRefs.current[0].offsetHeight;
      const minY = elementHeight; // Minimum y-position to avoid overlapping
      const maxY = viewportHeight - elementHeight; // Maximum y-position to avoid overlapping
    
      let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    
      floatTextRefs.current.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
    
        if (randomY >= elementTop && randomY <= elementBottom) {
          // Random y-position overlaps with another element, adjust it
          randomY = elementBottom + (elementBottom - elementTop) + 1;
        }
      });
    
      return randomY + 'px';
    };
    
    const getRandomDuration = () => {
      const duration = 50;
      return duration + 's';
    };

    const updateRandomY = (element) => {
      element.style.setProperty('--random-y', getRandomY());
    };

    const updateRandomDuration = (element) => {
      element.style.animationDuration = getRandomDuration();
    };

    const restartAnimation = (element) => {
      element.style.animation = 'none';
      void element.offsetWidth; // Trigger reflow to restart the animation
      element.style.animation = null;
      updateRandomY(element);
      updateRandomDuration(element);
    };

    const checkTextPosition = () => {
      const floatTextWrappers = floatTextRefs.current;

      floatTextWrappers.forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const isOffScreen =
          rect.bottom < 0 ||
          rect.top > window.innerHeight ||
          rect.right < 0 ||
          rect.left > window.innerWidth;

        if (isOffScreen) {
          wrapper.classList.remove('hovered');
        }
      });
    };

    const delayTextAppearance = (element, index) => {
      const delay = index * 4000; // Adjust the delay duration as needed
      element.style.animationDelay = delay + 'ms';
      element.style.opacity = 0;
    };

    const randomizeYPosition = (element) => {
      updateRandomY(element);
      updateRandomDuration(element);
    };

    const setupTimeout = setTimeout(() => {
      floatTextRefs.current.forEach((element, index) => {
        updateRandomY(element);
        updateRandomDuration(element);

        element.addEventListener('animationiteration', () => {
          randomizeYPosition(element);
          checkTextPosition(element);
        });

        delayTextAppearance(element, floatTextRefs.current.length - 1 - index);
      });
    }, 100);

    return () => {
      clearTimeout(setupTimeout);
      floatTextRefs.current.forEach((element) =>
        element.removeEventListener('animationiteration', () => {
          checkTextPosition(element);
        })
      );
    };
  }, []);

  const handleTextHover = (index) => {
    const floatTextWrappers = floatTextRefs.current;
    floatTextWrappers.forEach((wrapper, i) => {
      if (i === index) {
        wrapper.classList.add('hovered');
      } else {
        wrapper.classList.remove('hovered');
      }
    });
    setHoveredText(index);
  };

  const handleTextLeave = () => {
    const floatTextWrappers = floatTextRefs.current;
    floatTextWrappers.forEach((wrapper) => {
      wrapper.classList.remove('hovered');
    });
    setHoveredText(null);
  };

  return (
    <div className="container">
      <div className="title">
        <p1 className="title-text">sounds i hear</p1>
      </div>
      {textContent.map((text, index) => (
        <div
          key={index}
          className="float-text-wrapper"
          onMouseEnter={() => handleTextHover(index)}
          onMouseLeave={handleTextLeave}
        >
          <p
            ref={(ref) => (floatTextRefs.current[index] = ref)}
            className={`float-text ${hoveredText === index ? 'hovered' : ''}`}
          >
            {text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          {hoveredText === index && (
            <div className="hovered-text">
              <p className="hovered-text-content">
                {text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
