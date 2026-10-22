// Facebook feed placeholders, English. Same shape as nb/socialFeed.js (the shape the
// make.com webhook delivers in production). Real posts are shown in the language
// they are written in.
const post = (n, mediaType, placeholderLabel, placeholderImage) => ({
  id: `placeholder-${n}`,
  platform: "facebook",
  date: null,
  mediaType,
  mediaUrl: null,
  poster: null,
  caption: "[Post text is pulled automatically from the Facebook page]",
  likes: null,
  comments: null,
  permalink: "https://www.facebook.com/GtMaskinas",
  placeholder: true,
  placeholderLabel,
  placeholderImage,
});

export const socialFeed = [
  post(
    1,
    "image",
    "Project car finished, ready for delivery",
    "/images/verksted/verksted-camaro-motorrom",
  ),
  post(2, "image", "New parts in stock", "/images/butikk/butikk-vaesker-disk"),
  post(3, "image", "Car for sale in the reception", "/images/butikk/kundemottak-hyller-bar"),
  post(4, "video", "Snowmobile season is on", "/images/utleie/snoscootere-oppstilt"),
  post(
    5,
    "carousel",
    "Before and after: custom project",
    "/images/verksted/verksted-suburban-ramme",
  ),
  post(6, "image", "Apprentice at work in the shop", "/images/verksted/verksted-corvette-service"),
];
