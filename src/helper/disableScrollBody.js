const disableBodyScroll = (value) => {
  const DISABLE_SCROLL_CLASSNAME = "disable-scroll";
  if (document && document.body) {
    if (value) {
      document.body.classList.add(DISABLE_SCROLL_CLASSNAME);
    } else {
      document.body.classList.remove(DISABLE_SCROLL_CLASSNAME);
    }
  }
};

export default disableBodyScroll;
