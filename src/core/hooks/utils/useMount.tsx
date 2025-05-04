import useEffectOnce from 'core/hooks/utils/useEffectOne';

const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};

export default useMount;
