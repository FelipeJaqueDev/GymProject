import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        poster?: string;
        "shadow-intensity"?: string | number;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "animation-name"?: string;
        "exposure"?: string | number;
        "ar"?: boolean;
        "ar-modes"?: string;
        "ar-scale"?: string;
        "environment-image"?: string;
        "skybox-image"?: string;
      };
    }
  }
}

export {};