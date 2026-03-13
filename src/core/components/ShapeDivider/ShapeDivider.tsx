// components/ShapeDivider.jsx

const SHAPES = {
  wave1: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'>
      <path d='M0,96L80,128C160,160,320,224,480,245.3C640,267,800,245,960,234.7C1120,224,1280,224,1360,224L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'></path>
    </svg>
  `,

  wave2: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
      <path d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28C289.43,64.87,359.38,6,487,9.51c110.94,2.88,197.32,58.58,284.39,87.14C853.42,145.24,935.16,152,1200,80V0Z'></path>
    </svg>
  `,

  curve: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'>
      <path d='M0,96L1440,0L1440,120L0,120Z'></path>
    </svg>
  `,

  tilt: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'>
      <polygon points='0,0 1440,0 0,120'></polygon>
    </svg>
  `,

  mountains: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 300' preserveAspectRatio='none'>
      <path d='M0 300L80 250C160 200 320 100 480 75C640 50 800 100 960 125C1120 150 1280 150 1360 150L1440 150L1440 300Z'></path>
    </svg>
  `,

  wave3: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'>
      <path d='M0,224L48,192C96,160,192,96,288,80C384,64,480,96,576,133.3C672,171,768,213,864,234.7C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z' />
    </svg>
  `,

  waveSoft: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 150' preserveAspectRatio='none'>
      <path d='M0 120 Q360 0 720 120 T1440 120 V150 H0 Z' />
    </svg>
  `,

  curveDeep: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 150' preserveAspectRatio='none'>
      <path d='M0,0 C300,150 1100,-150 1400,0 L1400,150 L0,150 Z' />
    </svg>
  `,

  zigzag: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'>
      <path d='M0 0 L80 40 L160 0 L240 40 L320 0 L400 40 L480 0 L560 40 L640 0 L720 40 L800 0 L880 40 L960 0 L1040 40 L1120 0 L1200 40 L1280 0 L1360 40 L1440 0 V120 H0 Z' />
    </svg>
  `,

  steps: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 150' preserveAspectRatio='none'>
      <path d='M0 0 H200 V50 H400 V100 H600 V150 H0 Z' />
    </svg>
  `,

  diagonalWave: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 150' preserveAspectRatio='none'>
      <path d='M0 150 L1400 0 L1400 150 Z' />
    </svg>
  `,

  roundedPeaks: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 180' preserveAspectRatio='none'>
      <path d='M0,160 Q90,60 180,160 T360,160 T540,160 T720,160 T900,160 T1080,160 T1260,160 T1440,160 L1440,180 L0,180 Z' />
    </svg>
  `,

  pyramids: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 200' preserveAspectRatio='none'>
      <path d='M0 200 L120 50 L240 200 L360 60 L480 200 L600 70 L720 200 L840 80 L960 200 L1080 90 L1200 200 L1320 100 L1440 200 Z' />
    </svg>
  `,

  valley: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 200' preserveAspectRatio='none'>
      <path d='M0 0 Q360 200 720 0 T1440 0 V200 H0 Z' />
    </svg>
  `,

  bubbles: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 180' preserveAspectRatio='none'>
      <circle cx='100' cy='90' r='90' />
      <circle cx='400' cy='90' r='90' />
      <circle cx='700' cy='90' r='90' />
      <circle cx='1000' cy='90' r='90' />
      <circle cx='1300' cy='90' r='90' />
    </svg>
  `,

 zinkerTop: `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1000 100"
         preserveAspectRatio="none"
         width="1000"
         height="192">
      <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z"></path>
    </svg>
  `,

  zinkerBottom: `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1000 100"
         preserveAspectRatio="none"
         width="1000"
         height="192">
      <g transform="scale(1.3,1)" transform-origin="12.5% 50%">
        <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
      </g>
    </svg>
  `,

    shapeZinkerMaskBoxTop: `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1000 100"
         preserveAspectRatio="none"
         width="1000"
         height="125">
      <g transform="scale(1,-1)" transform-origin="50%">
        <path d="M0 0v100S0 4 500 4s500 96 500 96V0H0Z"></path>
      </g>
    </svg>
  `,
  
  tilt25DegreeLeft: `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 300' preserveAspectRatio='none'>
      <polygon points='510,300 1440,-450 1440,300 0,300'></polygon>
    </svg>
  `,
};

export default function ShapeDivider({
  shape = "wave1",
  color = "#000",   // color del shape
  height = "120px", // altura del SVG
  position = "bottom", // top | bottom
  flipX = false,    // voltear horizontalmente
  flipY = false,    // voltear verticalmente
}) {
  const svg = SHAPES[shape];

  // transformaciones dinámicas (flip)
  const transforms = [];
  if (flipX) transforms.push("scaleX(-1)");
  if (flipY) transforms.push("scaleY(-1)");
  const transform = transforms.length ? `transform='${transforms.join(" ")}'` : "";

  // SVG inline final (color + transform)
  const svgFinal = svg
    .replace("<path ", `<path fill='${color}' ${transform} `)
    .replace("<polygon ", `<polygon fill='${color}' ${transform} `);

  return (
    <div
      className={`
        w-full overflow-hidden
        ${position === "top" ? "absolute top-0 left-0" : "absolute bottom-0 left-0"}
      `}
      style={{
        height,
        lineHeight: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `${flipX ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}`,
          transformOrigin: "center",
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgFinal)}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}

