export default function CreateIntersectionObserver(
  querySelector,
  callback,
  config = { rootMargin: "20px", threshold: 0.2 }
) {
  let options = {
    // root: document.querySelector(querySelector),
    root: null,
    config,
  };

  let observer = new IntersectionObserver(callback, options);

  return observer;
}
