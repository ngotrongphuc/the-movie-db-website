import { onMounted, onBeforeUnmount } from 'vue';

export const useInfiniteScroll = ({
  onScroll,
  onScrollToTop,
  onScrollToBottom,
}: any) => {
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    onScroll?.();

    if (scrollY <= 0) {
      onScrollToTop?.();
    }

    if (scrollY + windowHeight * 2 >= documentHeight) {
      onScrollToBottom?.();
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
};
