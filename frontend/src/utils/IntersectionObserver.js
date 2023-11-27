export default function CreateIntersectionObserver(
  querySelector,
  callback,
  config = { rootMargin: "0px", threshold: 0 }
) {
  let options = {
    root: document.querySelector(querySelector),
    config,
  };

  let observer = new IntersectionObserver(callback, options);

  return observer;
}
