import { ReactNode, FC } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonWrapperProps extends SkeletonProps {
  children: ReactNode;
  fetchStatus: any;
}

const SkeletonWrapper: FC<SkeletonWrapperProps> = ({
  children,
  fetchStatus,
  ...rest
}) => {
  return (
    <>{fetchStatus === "idle" ? <>{children}</> : <Skeleton {...rest} />}</>
  );
};

export default SkeletonWrapper;
