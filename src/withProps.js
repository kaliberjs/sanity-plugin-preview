export function withProps(Component, additionalProps = {}) {
  return props => <Component {...additionalProps} {...props} />
}
