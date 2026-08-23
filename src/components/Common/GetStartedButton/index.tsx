'use client';
import { Trigger } from './styles';
import { useDemoDialog } from '../DemoDialog/context';

/**
 * The site's single primary call to action.
 *
 * DentGrow's marketing site sells a demo, not a sign-up, so this is the only
 * action offered anywhere on the page — there is deliberately no login or
 * account-creation entry point. Every instance opens the same dialog, so there
 * is one form and one submission path however the visitor got there.
 */
const GetStartedButton = ({ padding }: { padding: string }) => {
  const { open } = useDemoDialog();

  return (
    <Trigger type="button" style={{ padding }} onClick={open}>
      Book a Demo
    </Trigger>
  );
};

export default GetStartedButton;
