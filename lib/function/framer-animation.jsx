const containerMotion = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const bgFadeInFromLeft = {
  hidden: {
    opacity: 0,
    x: -3000,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
    },
  },
};

const fadeInFromLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeInFromRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeInFromBottom = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeInFromTop = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const grow = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export {
  containerMotion,
  fadeInFromLeft,
  fadeInFromRight,
  fadeInFromBottom,
  grow,
  fadeInFromTop,
  bgFadeInFromLeft
};