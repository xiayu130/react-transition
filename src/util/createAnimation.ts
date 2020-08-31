const createAnimation = (
  ele: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation => {
  const effect = new KeyframeEffect(ele, keyframes, options);
  return effect;
};

export default createAnimation;
