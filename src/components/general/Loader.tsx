interface LoaderProps {
  containerClassName?: string;
  loaderClassName?: string;
}

export const Loader = (props: LoaderProps) => {
  const { containerClassName = "", loaderClassName = "" } = props;
  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <div
        className={`w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin ${loaderClassName}`}
      />
    </div>
  );
};
