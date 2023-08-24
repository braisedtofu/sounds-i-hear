import './App.css'
import React, { useEffect } from 'react';
import { useRef } from 'react';

// Array containing text content and associated links
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
  // Create a ref to hold references to the floating text elements
  const floatTextRefs = useRef([]);

  // Array of Y positions for the floating texts
  const yPositions = [
    '325px', '175px', '500px', '400px', '275px', '100px', '600px', '225px',
    '50px', '525px', '375px', '875px', '350px', '200px', '125px', '250px',
    '575px', '650px', '300px', '450px', '525px', '475px', '175px', '425px'
  ];
    
  // Function to handle clicking on a floating text
  const handleFloatTextClick = (index) => {
    const link = textContent[index].link;
    window.open(link, '_blank');
  };

    useEffect(() => {
    const updateYPosition = (element, index) => {
      element.style.setProperty('--random-y', yPositions[index]);
    };

    // Function to generate a random animation duration
    const getRandomDuration = () => {
      const duration = 20;
      return duration + 's';
    };

    // Function to update animation duration of a floating text element
    const updateRandomDuration = (element) => {
      element.style.animationDuration = getRandomDuration();
    };

    // Function to check if a floating text element is off-screen
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

      // Function to delay the appearance of a floating text
    const delayTextAppearance = (element, index) => {
      const delay = index * 2500; // Adjust the delay duration as needed
      element.style.animationDelay = delay + 'ms';
      element.style.opacity = 0;
    };

        // Set up the initial animation and interactions

    const setupTimeout = setTimeout(() => {
      floatTextRefs.current.forEach((element, index) => {
        updateYPosition(element, index); // Assign specific Y position
        updateRandomDuration(element);

        // Add animation iteration event listener
        const animationIterationHandler = () => {
          updateYPosition(element, index); // Update Y position on animation iteration
          checkTextPosition(element);
        };

        element.addEventListener('animationiteration', animationIterationHandler);

          // Delay text appearance based on index
        delayTextAppearance(element, floatTextRefs.current.length - 1 - index);

        return () => {
          element.removeEventListener('animationiteration', animationIterationHandler);
        };
      });
    }, 0);

    // Clean up when component is unmounted
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
