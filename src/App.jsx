import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect } from 'react';
import { useRef } from 'react';


const textContent = [
  {
    text: 'between the gaps, i was swimming laps\ngot close to some epiphany\ni\'ll convince a friend to join deep ends\nhave your toes touch the lack of cement',
    link: 'https://genius.com/Clairo-amoeba-lyrics',
  },
  {
    text: 'i used to float, now i just fall down\ni used to know, but i\'m not sure now\nwhat I was made for\nwhat was I made for?',
    link: 'https://genius.com/Billie-eilish-what-was-i-made-for-lyrics',
  },
  {
    text: 'and two pats on the back, "it just takes time"',
    link: 'https://genius.com/Clairo-just-for-today-lyrics',
  },
  {
    text: 'i can hope tonight goes differently, but i show up to the party just to leave',
    link: 'https://genius.com/Clairo-amoeba-lyrics',
  },
  {
    text: 'i see the fog as a clean slate\nthere\'s room for us',
    link: 'https://genius.com/Clairo-little-changes-lyrics',
  },
  {
    text: 'i cut all the bruises off the peach\nnot as beautiful, but still as sweet',
    link: 'https://genius.com/Ryan-beatty-bruises-off-the-peach-lyrics',
  },
  {
    text: 'driving up the 2 for better views and coastal weather\nand I looked up at you, saw the flowers, I remember',
    link: 'https://genius.com/Ryan-beatty-bright-red-lyrics',
  },
  {
    text: 'maybe i\'m just stoned at the nail salon',
    link: 'https://genius.com/Lorde-stoned-at-the-nail-salon-lyrics',
  },
  {
    text: 'broadcast the boom, boom, boom, boom\nand make \'em all dance to it',
    link: 'https://genius.com/Lorde-the-louvre-lyrics',
  },
  {
    text: 'l-o-v-e-l-e-s-s generation\nall fuckin\' with our lover\'s heads generation',
    link: 'https://genius.com/Lorde-hard-feelings-loveless-lyrics',
  },
  {
    text: 'acid green, aquamarine\nthe girls are dancing in the sand',
    link: 'https://genius.com/Lorde-solar-power-lyrics',
  },
  {
    text: 'if the sky is pink and white\nif the ground is black and yellow\nit\'s the same way you showed me',
    link: 'https://genius.com/Frank-ocean-pink-white-lyrics',
  },
  {
    text: 'good day in my mind, safe to take a step out',
    link: 'https://genius.com/Sza-good-days-lyrics',
  },
  {
    text: '욕심내 더 like a witch\nshow you real me 검붉어지는 빛',
    link: 'https://genius.com/Le-sserafim-impurities-lyrics',
  },
  {
    text: 'keep a gold chain on my neck\nfly as a jet boy better treat me with respect',
    link: 'https://genius.com/Brockhampton-gold-lyrics',
  },
  {
    text: 'seems like street lights, glowing, happen to be\njust like moments passing in front of me\nso i hopped in the cab and i paid my fare\nsee i know my destination, i\'m just not there',
    link: 'https://genius.com/Daniel-caesar-streetcar-lyrics',
  },
  {
    text: 'in southern california, much like arizona\nmy eyes don\'t shed tears, but boy they pour when...',
    link: 'https://genius.com/Frank-ocean-thinkin-bout-you-lyrics',
  },
  {
    text: 'too many days in a daze, better wake up\ni put your face in a place where the space was',
    link: 'https://genius.com/Mac-miller-woods-lyrics',
  },
  {
    text: 'i\'m super shy\nsuper shy\nbut wait a minute til i make you mine',
    link: 'https://genius.com/Newjeans-super-shy-lyrics',
  },
  {
    text: 'you walked all this way to show me signs\nit was a hawkshaw song stuck in my mind',
    link: 'https://genius.com/Ryan-beatty-hawkshaw-lyrics',
  },
  {
    text: 'i\'d lick the grief right off your lips\nyou do your eyes like robert smith',
    link: 'https://genius.com/Arlo-parks-black-dog-lyrics',
  },
  {
    text: 'collapsed in sunbeams, stretched out open to beauty however brief or violent\ni see myself ablaze with joy, sleepy eyed, feeding your cat or slicing artichoke hearts',
    link: 'https://genius.com/Arlo-parks-collapsed-in-sunbeams-annotated',
  },
  {
    text: 'i\'m an angel with a shotgun',
    link: 'https://genius.com/Nightcore-angel-with-a-shotgun-lyrics',
  },
];


function App() {
  const floatTextRefs = useRef([]);

  const handleFloatTextClick = (index) => {
    const link = textContent[index].link;
    window.open(link, '_blank');
  };

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
      const duration = 30;
      return duration + 's';
    };

    const updateRandomY = (element) => {
      element.style.setProperty('--random-y', getRandomY());
    };

    const updateRandomDuration = (element) => {
      element.style.animationDuration = getRandomDuration();
    };

    const checkTextPosition = (element) => {
      const rect = element.getBoundingClientRect();
      const isOffScreen =
        rect.bottom < 0 ||
        rect.top > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth;

      if (isOffScreen) {
        element.classList.remove('hovered');
      }
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
  
  return (
    <div className="container">
      <div className="title">
        <p className="title-text">sounds i hear</p>
      </div>
      {textContent.map((content, index) => (
        <div
          key={index}
          className="float-text-wrapper"
          onClick={() => handleFloatTextClick(index)}
        >
          <div className="float-text-wrapper-inner">
            <p
              ref={(ref) => (floatTextRefs.current[index] = ref)}
              className="float-text"
            >
              {content.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="hovered-text">
            <p className="hovered-text-content">
              {content.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
