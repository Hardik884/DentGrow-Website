import { LinkTo } from './styles';

/**
 * The site's single primary call to action. DentGrow's marketing site sells a
 * demo, not a sign-up, so this is the only action offered anywhere on the page —
 * there is deliberately no login or account-creation entry point here.
 */
const GetStartedButton = ({ padding }: { padding: string }) => {
  return (
    <LinkTo
      style={{
        padding: padding,
      }}
      href="/"
    >
      Book a Demo
    </LinkTo>
  );
};

export default GetStartedButton;
