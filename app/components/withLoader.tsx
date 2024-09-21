import React from 'react';

interface WithLoaderProps {
  isLoading?: boolean;
}

const withLoader = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithLoader = (props: P & WithLoaderProps) => {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    return <WrappedComponent {...(rest as P)} />;
  };


  ComponentWithLoader.displayName = `WithLoader(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithLoader;
};

export default withLoader;
