const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <>
      {isVisible && (
        <div className="w-screen h-[500vh] bg-gray-700/40 dark:bg-gray-700/20 z-[100000] top-0 left-0 fixed ">
          <div className="z-[100000] flex items-center justify-center w-screen h-screen fixed top-0 left-0">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-accent-dark dark:border-white"></div>
            <h4>SpellCMS</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
