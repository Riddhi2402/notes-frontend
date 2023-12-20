export const FILE_TYPES = {
  IMAGE: "image/*",
  VIDEO: "video/*",
  AUDIO: "audio/*",
};

export const mediaButtons = [
  {
    iconPath: "/images/image-icon.svg",
    altText: "image-icon",
    type: FILE_TYPES.IMAGE,
  },
  {
    iconPath: "/images/video-icon.svg",
    altText: "video-icon",
    type: FILE_TYPES.VIDEO,
  },
  {
    iconPath: "/images/audio-icon.svg",
    altText: "audio-icon",
    type: FILE_TYPES.AUDIO,
  },
];

export const API_URL_BASE_PATH = "http://localhost:3001/notes";
